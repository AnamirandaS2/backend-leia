import { Request, Response, NextFunction } from "express"

export class AppError extends Error {
    public readonly status: number

    constructor(_status: number = 400, _message: string) {
        super(_message)
        this.status = _status
    }
}

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof AppError) {
        return res.status(err.status).json({ message: err.message });
    }

    if (err.name === "SyntaxError") {
        res.status(400).json({ message: "Please send a proper JSON object" })
        return;
      }
    
    res.status(500).json({ message: "Internal server error." })
}