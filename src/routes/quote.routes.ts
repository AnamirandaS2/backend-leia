import { Router } from "express";
import { QuoteController } from "../controllers/quote.controller";

const quoteRouter = Router();

// GET /api/quotes/daily - Citação do dia
quoteRouter.get("/daily", QuoteController.getDailyQuote);

// GET /api/quotes/date/:date - Citação de uma data específica
quoteRouter.get("/date/:date", QuoteController.getQuoteByDate);

// GET /api/quotes/all - Todas as citações
quoteRouter.get("/all", QuoteController.getAllQuotes);

// POST /api/quotes/force-update - Força atualização da citação do dia (admin)
quoteRouter.post("/force-update", QuoteController.forceUpdateDailyQuote);

export default quoteRouter;

