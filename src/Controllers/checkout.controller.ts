import { Request, Response } from "express";
import log from "../Logger";
import { CheckoutService } from "../Services/checkout.service";



const service = new CheckoutService()

export class CheckoutController {

    async create(req: Request, res: Response) {

        try {
            const checkoutDetails = await service.validateCheckoutRequest(req.body.app_id as string, req.body.data as string, req.body.signature as string)
            const isValidDetails = service.validateCheckoutDetails(checkoutDetails)

            if (!isValidDetails) {
                return res.status(400).json({ message: 'Please Enter Valid Amount' });
            }

            const checkout = await service.createCheckout(checkoutDetails)
            return res.status(201).json({ data: checkout });
        } catch (e: any) {
            log.error(e)
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const checkout = await service.getCheckout(req.params.id as string)
            if (!checkout) {
                return res.status(404).json({ message: 'Checkout Not found' });
            }

            return res.status(200).json({ data: { checkout } });
        } catch (e: any) {
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }
    }

    async pay(req: Request, res: Response) {
        try {
            const checkout = await service.getPopulatedCheckout(req.params.id as string)
            if (!checkout) {
                return res.status(404).json({ message: 'Checkout Not found' });
            }

            const isValid = service.validateCheckout(checkout)

            if (!isValid) {
                return res.status(400).json({ message: 'Invalid Checkout or Timeout' });
            }

            const { isPaid, reason } = await service.payCheckout(checkout, req.body)

            if (!isPaid) {
                return res.status(400).json({ message: 'Failed Payment', reason, redirectUrl: checkout.app.redirectUrl });
            }


            return res.status(200).json({ message: "Payment Success", redirectUrl: checkout.app.redirectUrl })

        } catch (e: any) {
            return res.status(400).json({ message: "Bad Request , Please check input data" });
        }

    }

}