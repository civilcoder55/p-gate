import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { Merchant, MerchantDocument } from "../Models/merchant.model";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace('Bearer ', '')
        const decoded: any = jwt.verify(token as string, process.env.SECRET_KEY as string)

        const merchant = await Merchant.findOne({ _id: decoded._id })

        // @ts-ignore
        req.merchant = merchant as MerchantDocument

        next()
    } catch (e) {
        res.status(401).json({ message: 'Please authenticate first.' })
    }
};

