import { Request, Response, NextFunction } from "express";

export default async (error:Error,req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: 'Internal server error' })
};

