import { LocalStorage } from "node-localstorage";
import log from "../Logger";
import axios from "axios";

const localStorage = new LocalStorage('./.ls');

export async function getAcessToken() {
    const tokenString = localStorage.getItem('token');

    if (!tokenString) {
        return await getNewAcessToken()
    }

    const accessToken = JSON.parse(tokenString)

    if (+accessToken.validTill < Date.now()) {
        return await getNewAcessToken()
    } else {
        return accessToken.token
    }
}



async function getNewAcessToken(): Promise<string> {
    try {
        const apiClientID = process.env.API_CLIENT_ID as string
        const password = process.env.API_CLIENT_PASS as string
        const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL as string
        const res = await axios.post(AUTH_SERVICE_URL, JSON.stringify({ apiClientID, password }), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }) as {data:any};


        localStorage.setItem('token', JSON.stringify({
            token: res.data.token,
            validTill: Date.now() + 2 * 60 * 60 * 1000  // valid for 2 hours
        }));
        return res.data.token
    } catch (e: any) {
        log.error(e)
        throw new Error()
    }
}