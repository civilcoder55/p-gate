
import { object, string, number } from "yup";


export const requestCheckoutSchema = object({
    body: object({
        signature: string().required("signature is required"),
        data: string().required("data is required"),
        app_id: string().required("app_id is required")
    }),
});



export const CheckoutPaySchema = object({
    body: object({
        expYear: string().min(4).max(4).required("expYear is required"),
        expMonth: string().min(2).max(2).required("expMonth is required"),
        cvc: string().min(3).max(4).required("cvc is required"),
        CardNumber: string().max(16).required("CardNumber is required"),
        CardHolderName: string().required("CardHolderName is required")
    }),
});

