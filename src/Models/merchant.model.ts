import mongoose from "mongoose";
import bcrypt from "bcrypt";
import log from "../Logger";

export interface MerchantDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    Bank_Name:string;
    IBAN:string;
    Account_Number:string;
    createdAt: Date;
    updatedAt: Date;
    validatePassword(inputPassword: string): Promise<boolean>;
}

const MerchantSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        Bank_Name: { type: String, required: true },
        IBAN: { type: String, required: true },
        Account_Number: { type: String, required: true },
    },
    { timestamps: true }
);

MerchantSchema.pre("save", async function (next: Function) {
    let merchant = this as MerchantDocument;

    // only hash the password if it has been modified (or is new)
    if (merchant.isModified("password")) {
        merchant.password = await bcrypt.hashSync(merchant.password, 10);
    }


    next();
});

MerchantSchema.methods.toJSON = function () {
    let merchant = this.toObject()
    delete merchant.password
    delete merchant.__v
    return merchant
}

// Used for logging in
MerchantSchema.methods.validatePassword = async function (
    inputPassword: string
) {
    let merchant = this as MerchantDocument;
    return bcrypt.compare(inputPassword, merchant.password).catch((e) => false);
};

export const Merchant = mongoose.model<MerchantDocument>("Merchant", MerchantSchema);


