import jwt from 'jsonwebtoken'
import log from '../Logger';
import { Merchant, MerchantDocument } from "../Models/merchant.model";
export class AuthService {

    async validateCredentials(email: string, password: string): Promise<MerchantDocument> {
        const merchant = await Merchant.findOne({ email })

        if (!merchant) {
            throw new Error('Invalid Credentials')
        }

        const isMatch = await merchant.validatePassword(password)

        if (!isMatch) {
            throw new Error('Invalid Credentials')
        }

        return merchant
    }


    async generateAuthToken(merchant: MerchantDocument): Promise<string> {
        const token = jwt.sign({ _id: merchant._id.toString() }, process.env.SECRET_KEY as string,{expiresIn:'2h'})

        return token
    }
}