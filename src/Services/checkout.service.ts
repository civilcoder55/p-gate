import { App, AppDocument } from '../Models/app.model';
import { MerchantDocument } from "../Models/merchant.model";
import { Checkout, CheckoutDocument } from '../Models/checkout.model';
import { createSignaturedData } from "../utils/signature.util"
import log from '../Logger';
import { getAcessToken } from '../utils/serviceToken.util';
import axios from "axios"


export class CheckoutService {

    async validateCheckoutRequest(app_id: string, bodyData: string, signature: string): Promise<{ merchant_id: string, app_id: string, amount: unknown }> {
        const app = await App.findOne({ _id: app_id })

        if (!app) {
            throw new Error('Invalid Request')
        }

        let details: { merchant_id: string, app_id: string, amount: unknown }


        const signaturedData = createSignaturedData(bodyData, app.secret)
        if (signaturedData != signature) {
            throw new Error('Invalid Signature')
        }
        details = JSON.parse(bodyData)


        details.merchant_id = app.merchant._id
        details.app_id = app_id
        return details
    }

    validateCheckoutDetails(details: { amount: unknown }): boolean {
        const amount = parseInt(details.amount as string) || undefined
        if (!amount || amount / 100 < 1) {
            return false
        }

        return true
    }


    async createCheckout(details: { merchant_id: string, app_id: string, amount: unknown }) {
        const { merchant_id, app_id, amount, ...meta } = details
        const checkout = await Checkout.create({
            merchant: merchant_id,
            app: app_id,
            amount,
            meta
        })

        return { ...checkout.toObject(), url: process.env.CHECKOUT_URL + checkout._id }
    }


    async getCheckout(checkout_id: string): Promise<CheckoutDocument | null> {
        return await Checkout.findOne({
            _id: checkout_id
        }).populate('app', 'name').exec()
    }

    async getPopulatedCheckout(checkout_id: string): Promise<CheckoutDocument | null> {
        return await Checkout.findOne({
            _id: checkout_id
        }).populate('merchant').populate('app').exec()
    }

    validateCheckout(checkout: CheckoutDocument): boolean {
        if (+checkout.validTill < Date.now() || checkout.paid) {
            return false
        }

        return true
    }


    async payCheckout(checkout: CheckoutDocument, data: { [key: string]: any }): Promise<{ isPaid: boolean, reason: string }> {
        try {
            const accessToken = await getAcessToken()
            const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL as string
            const body = JSON.stringify({
                "Transaction": {
                    "Card": {
                        "cardHolderName": data.CardHolderName,
                        "cardNumber": data.CardNumber,
                        "expiryDate": data.expMonth + data.expYear.slice(-2),
                        "cvc": data.cvc
                    },
                    "Merchant": {
                        "merchantId": checkout.merchant._id,
                        "merchantName": checkout.merchant.name,
                        "bankName": checkout.merchant.Bank_Name,
                        "bankAddress": " 306 cornach el maadi",
                        "accountNumber": checkout.merchant.Account_Number,
                        "iban": checkout.merchant.IBAN

                    },
                    "App": {
                        "id": checkout.app._id,
                        "name": checkout.app.name
                    },
                    "amount": checkout.amount,
                    "narrative": " Payment "
                }
            })
            const res = await axios.post(PAYMENT_SERVICE_URL, body, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                }
            }) as { data: any };


            log.info(res.data)

            if (res.data.status == 'Fail') {
                return { isPaid: false, reason: res.data.reason }
            }
            checkout.paid = true
            checkout.save()

            return { isPaid: true, reason: "" }

        } catch (e) {
            log.error(e)
            throw new Error("Error Occurred")
        }
    }

}