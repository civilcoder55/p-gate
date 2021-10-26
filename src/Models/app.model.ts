import mongoose from "mongoose";
import { MerchantDocument } from "./merchant.model";

export interface AppDocument extends mongoose.Document {
    merchant: MerchantDocument["_id"];
    secret: string;
    name: string;
    redirectUrl: string;
}

const AppSchema = new mongoose.Schema(
    {
        merchant: { type: mongoose.Schema.Types.ObjectId, ref: "Merchant", required: true, index: true },
        secret: { type: String, required: true },
        name: { type: String, required: true },
        redirectUrl: { type: String, required: true },
    }
);


AppSchema.methods.toJSON = function () {
    let app = this.toObject()
    delete app.merchant
    delete app.__v
    app.id = app._id;
    delete app._id;
    return app
}

export const App = mongoose.model<AppDocument>("App", AppSchema);


