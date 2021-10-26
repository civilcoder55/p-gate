import { Request, Response } from "express";
import log from "../Logger";
import { AuthService } from "../Services/auth.service";


const service = new AuthService();

export class AuthController {

    async login(req: Request, res: Response) {
        try {
            const merchant = await service.validateCredentials(req.body.email, req.body.password);
            const token = await service.generateAuthToken(merchant)
            return res.status(200).json({ data: { merchant: { _id: merchant._id, name: merchant.name, email: merchant.email }, token } });
        } catch (e: any) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
}