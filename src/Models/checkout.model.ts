import mongoose from "mongoose";
import { AppDocument } from "./app.model";
import { MerchantDocument } from "./merchant.model";

export interface CheckoutDocument extends mongoose.Document {
    merchant: MerchantDocument["_id"];
    app:AppDocument["_id"];
    amount: number;
    validTill: Date;
    paid: boolean;
    meta?: {};
}

const CheckoutSchema = new mongoose.Schema(
    {
        merchant: { type: mongoose.Schema.Types.ObjectId, ref: "Merchant", required: true, index: true },
        app: { type: mongoose.Schema.Types.ObjectId, ref: "App", required: true},
        amount: { type: Number, required: true },
        validTill: { type: Date, default: () => Date.now() + 15 * 60 * 1000 }, // valid for 15 minutes
        paid: { type: Boolean, default: false },
        meta: {}
    }
);



CheckoutSchema.methods.toJSON = function () {
    let checkout = this.toObject()
    delete checkout.merchant
    delete checkout.__v
    return checkout
}

export const Checkout = mongoose.model<CheckoutDocument>("Checkout", CheckoutSchema);


