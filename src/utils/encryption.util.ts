import crypto from "crypto"



export function getSecretKey(app_secret: string): string {
    return crypto.createHash('sha256').update(String(app_secret)).digest('hex');
}


export function decryptData(data: string, encryptionKey: string): string {
    let textParts = data.split('_');
    let iv = Buffer.from(textParts.shift() as string, 'hex');
    let encryptedText = Buffer.from(textParts.join('_'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export function encryptData(data: string, encryptionKey: string): string {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + '_' + encrypted.toString('hex');
}