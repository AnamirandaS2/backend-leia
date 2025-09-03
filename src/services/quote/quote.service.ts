const API_BASE_URL = "http://189.90.44.226:2000";

export interface QuoteData {
  quote: string;
  author: string;
  source: string;
  curiosity?: string;
}

export class QuoteService {
  /**
   * Busca ou cria a citação do dia
   * Versão temporária sem banco de dados
   */
  static async getDailyQuote(): Promise<QuoteData> {
    try {
      console.log("Buscando citação da API externa...");

      // Busca da API externa
      const externalQuote = await this.fetchExternalQuote();
      return externalQuote;
    } catch (error) {
      console.error("Erro ao buscar citação do dia:", error);

      // Fallback para citação padrão
      return {
        quote: "A leitura é uma viagem para lugares que você nunca visitou.",
        author: "Anônimo",
        source: "Sabedoria Popular",
      };
    }
  }

  /**
   * Busca citação da API externa
   */
  private static async fetchExternalQuote(): Promise<QuoteData> {
    try {
      console.log("Tentando buscar citação de hoje...");

      // Primeiro tenta buscar a citação de hoje
      const todayResponse = await fetch(`${API_BASE_URL}/daily-quote/today`);

      if (todayResponse.ok) {
        const todayQuote = await todayResponse.json();
        console.log("Citação de hoje encontrada:", todayQuote);
        return {
          quote: todayQuote.quote,
          author: todayQuote.author,
          source: todayQuote.source || "API Externa",
          curiosity: todayQuote.curiosity,
        };
      }

      console.log("Citação de hoje não encontrada, gerando nova...");

      // Se não houver citação de hoje, gera uma nova
      const generateResponse = await fetch(
        `${API_BASE_URL}/daily-quote?service=gemini`
      );

      if (generateResponse.ok) {
        const generatedQuote = await generateResponse.json();
        console.log("Nova citação gerada:", generatedQuote);
        return {
          quote: generatedQuote.quote,
          author: generatedQuote.author,
          source: generatedQuote.source || "API Externa",
          curiosity: generatedQuote.curiosity,
        };
      }

      throw new Error("Falha ao buscar citação da API externa");
    } catch (error) {
      console.error("Erro ao buscar citação externa:", error);
      throw error;
    }
  }

  /**
   * Busca citação de uma data específica
   */
  static async getQuoteByDate(date: Date): Promise<QuoteData | null> {
    try {
      const dateString = date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
      const response = await fetch(
        `${API_BASE_URL}/daily-quote/date/${dateString}`
      );

      if (response.status === 404) {
        return null; // Não há citação para esta data
      }

      if (!response.ok) {
        throw new Error("Falha ao buscar citação por data");
      }

      const quote = await response.json();
      return quote;
    } catch (error) {
      console.error("Erro ao buscar citação por data:", error);
      return null;
    }
  }

  /**
   * Busca todas as citações armazenadas
   */
  static async getAllQuotes(): Promise<QuoteData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`);

      if (!response.ok) {
        throw new Error("Falha ao buscar todas as citações");
      }

      const quotes = await response.json();
      return quotes;
    } catch (error) {
      console.error("Erro ao buscar todas as citações:", error);
      return [];
    }
  }

  /**
   * Força a atualização da citação do dia (apenas para admins)
   */
  static async forceUpdateDailyQuote(): Promise<QuoteData> {
    try {
      // Remove citação existente do dia se houver
      // (não implementado sem banco de dados)

      // Busca nova citação da API
      const externalQuote = await this.fetchExternalQuote();

      return externalQuote;
    } catch (error) {
      console.error("Erro ao forçar atualização da citação:", error);
      throw error;
    }
  }
}
