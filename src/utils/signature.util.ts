import crypto from "crypto"



export function createSignaturedData(data:string,app_secret: string): string {
    return crypto.createHmac('sha256', app_secret).update(data).digest('hex');
}


