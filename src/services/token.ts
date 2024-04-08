import { TokenModel } from "../models/token";
import moment from "moment";

export const createToken = async (token: string) => {
    try {
        const expiresAt = moment().add('1m').toDate();
        const newToken = new TokenModel({
            token,
            expiresAt
        })
        return newToken.save()
    } catch (error) {
        console.log('Error saving token: ' + error)
        return;
    }
}

export const getToken = (token: string) => {
    try {
        return TokenModel.findOne({ token: token });
    } catch (error) {
        console.log('Error getting token: ' + error)
        return;
    }
}
