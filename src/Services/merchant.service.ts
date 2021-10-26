import { Document, FilterQuery } from "mongoose";
import log from "../Logger";
import { Merchant, MerchantDocument } from "../Models/merchant.model";
import { getAcessToken } from "../utils/serviceToken.util";
import axios from "axios";


export class MerchantService {

    async createMerchant(merchantData: Document<MerchantDocument>) {
        return await Merchant.create(merchantData);
    }

    async getMerchantTransactions(merchant: Document<MerchantDocument>) {
        try {
            const accessToken = await getAcessToken()
            const TRANSACTIONS_SERVICE_URL = process.env.TRANSACTIONS_SERVICE_URL as string
            const res = await axios.get(TRANSACTIONS_SERVICE_URL + merchant._id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                }
            }) as { data: any };

            return res.data
        } catch (e) {
            log.error(e)
            throw new Error("Error Occurred")
        }
    }
}