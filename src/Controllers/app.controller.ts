import { Request, Response } from "express";
import log from "../Logger";
import { AppService } from "../Services/app.service";


const service = new AppService();

export class AppController {

    async get(req: Request, res: Response) {
        try {
            // @ts-ignore
            const merchant = req.merchant
            const app = await service.getMerchantApp(merchant, req.params.id as string)
            if (!app) {
                return res.status(400).json({ message: 'App Not Found' })
            }
            return res.status(200).json({ data: { app } })
        } catch (e) {
            return res.status(400).json({ message: 'Bad Request , Please check input data' })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            // @ts-ignore
            const merchant = req.merchant
            const apps = await service.getMerchantAllApps(merchant)
            return res.status(200).json({ data: { apps } })
        } catch (e) {
            return res.status(400).json({ message: 'Bad Request , Please check input data' })
        }
    }

    async create(req: Request, res: Response) {
        try {
            // @ts-ignore
            const merchant = req.merchant
            const app = await service.createMerchantApp(merchant, req.body.name, req.body.redirectUrl)
            return res.status(200).json({ data: { app } })
        } catch (e) {
            log.error(e)
            return res.status(400).json({ message: 'Bad Request , Please check input data' })
        }
    }


    async update(req: Request, res: Response) {
        try {
            // @ts-ignore
            const merchant = req.merchant
            const app = await service.updateMerchantApp(merchant, req.params.id, req.body.name, req.body.redirectUrl)
            if (!app) {
                return res.status(400).json({ message: 'App Not Found' })
            }
            return res.status(200).json({ data: { app } })
        } catch (e) {
            return res.status(400).json({ message: 'Bad Request , Please check input data' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            // @ts-ignore
            const merchant = req.merchant
            const app = await service.deleteMerchantApp(merchant, req.params.id)
            if (!app) {
                return res.status(400).json({ message: 'App Not Found' })
            }
            return res.status(204).send()
        } catch (e) {
            return res.status(400).json({ message: 'Bad Request , Please check input data' })
        }
    }

    async regenerate(req: Request, res: Response) {
        try {
            // @ts-ignore
            const merchant = req.merchant
            const app = await service.regenerateMerchantApp(merchant, req.params.id)
            if (!app) {
                return res.status(400).json({ message: 'App Not Found' })
            }
            return res.status(200).json({ data: { app } })
        } catch (e) {
            return res.status(400).json({ message: 'Bad Request , Please check input data' })
        }
    }
}