import { Request, Response } from "express";
import { QuoteService } from "../services/quote/quote.service";

export class QuoteController {
  /**
   * GET /api/quotes/daily
   * Retorna a citação do dia
   */
  static async getDailyQuote(req: Request, res: Response) {
    try {
      const quote = await QuoteService.getDailyQuote();
      res.json(quote);
    } catch (error) {
      console.error("Erro ao buscar citação do dia:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Não foi possível buscar a citação do dia",
      });
    }
  }

  /**
   * GET /api/quotes/date/:date
   * Retorna citação de uma data específica
   */
  static async getQuoteByDate(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const targetDate = new Date(date);

      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({
          error: "Data inválida",
          message: "Formato de data inválido. Use YYYY-MM-DD",
        });
      }

      const quote = await QuoteService.getQuoteByDate(targetDate);

      if (!quote) {
        return res.status(404).json({
          error: "Citação não encontrada",
          message: "Não há citação para esta data",
        });
      }

      res.json(quote);
    } catch (error) {
      console.error("Erro ao buscar citação por data:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Não foi possível buscar a citação",
      });
    }
  }

  /**
   * GET /api/quotes/all
   * Retorna todas as citações armazenadas
   */
  static async getAllQuotes(req: Request, res: Response) {
    try {
      const quotes = await QuoteService.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Erro ao buscar todas as citações:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Não foi possível buscar as citações",
      });
    }
  }

  /**
   * POST /api/quotes/force-update
   * Força a atualização da citação do dia (apenas para admins)
   */
  static async forceUpdateDailyQuote(req: Request, res: Response) {
    try {
      // TODO: Adicionar middleware de autenticação para admin
      const quote = await QuoteService.forceUpdateDailyQuote();
      res.json({
        message: "Citação do dia atualizada com sucesso",
        quote,
      });
    } catch (error) {
      console.error("Erro ao forçar atualização da citação:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Não foi possível atualizar a citação do dia",
      });
    }
  }
}

