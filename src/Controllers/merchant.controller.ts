import { Request, Response } from "express";
import log from "../Logger";
import { MerchantDocument } from "../Models/merchant.model";
import { MerchantService } from "../Services/merchant.service";


const service = new MerchantService();

export class MerchantController {

    async create(req: Request, res: Response) {
        try {
            const merchant = await service.createMerchant(req.body);
            return res.status(201).json({ data: { merchant } });
        } catch (e: any) {
            log.error(e)
            if (e.code === 11000) {
                return res.status(409).json({ message: 'Merchant Email already exists' });
            }
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }
    }

    async details(req: Request, res: Response) {
        try {
            //@ts-ignore
            const merchant = req.merchant as MerchantDocument

            return res.status(200).json({ data: { merchant: { _id: merchant._id, name: merchant.name, email: merchant.email } } });
        } catch (e: any) {
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            //@ts-ignore
            const merchant = req.merchant as MerchantDocument

            return res.status(200).json({ data: { merchant } });
        } catch (e: any) {
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }
    }


    async transactions(req: Request, res: Response) {
        try {
            //@ts-ignore
            const merchant = req.merchant as MerchantDocument
            const transactions = await service.getMerchantTransactions(merchant);
            return res.status(200).json({ data: { transactions } });
        } catch (e: any) {
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }
    }





}