import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Endpoint Not Found' })
};

