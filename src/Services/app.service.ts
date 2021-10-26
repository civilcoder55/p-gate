import { App, AppDocument } from '../Models/app.model';
import { MerchantDocument } from "../Models/merchant.model";
import { v4 as uuidv4 } from 'uuid';
import { FilterQuery, UpdateQuery } from "mongoose"
export class AppService {

    private generateSecretCode() {
        return "secret_" + uuidv4().replace(/-/g, '');
    }

    async getMerchantApp(merchant: MerchantDocument, appId: string): Promise<AppDocument | null> {

        return await App.findOne({ _id: appId, merchant: merchant._id })
    }
    async getMerchantAllApps(merchant: MerchantDocument): Promise<AppDocument[] | null > {

        return await App.find({ merchant: merchant._id })
    }

    async createMerchantApp(merchant: MerchantDocument, name: string, redirectUrl: string): Promise < AppDocument > {


    const secret = this.generateSecretCode()

        const app = await App.create({
        merchant: merchant._id,
        secret,
        name,
        redirectUrl
    })

        return app
}

    async updateMerchantApp(merchant: MerchantDocument, appId: string, name: string, redirectUrl: string): Promise < AppDocument | null > {


    const app = await App.findOne({ _id: appId, merchant: merchant._id })

        if(!app) {
        return null;
    }
        app.name = name
        app.redirectUrl = redirectUrl

        app.save()

        return app
}


    async deleteMerchantApp(merchant: MerchantDocument, appId: string): Promise < true | null > {
    const app = await App.findOne({ _id: appId, merchant: merchant._id })

        if(!app) {
        return null;
    }
        app.remove()

        return true
}
    async regenerateMerchantApp(merchant: MerchantDocument, appId: string): Promise < AppDocument | null > {

    const app = await App.findOne({ _id: appId, merchant: merchant._id })

        if(!app) {
        return null;
    }

        const secret = this.generateSecretCode()
        app.secret = secret

        app.save()

        return app

}
}