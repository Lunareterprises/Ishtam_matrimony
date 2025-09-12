import { BASE_URL } from './baseUrl'
import { commonApi } from './commonApi'

export const RegistrationApi = async (reqBody) => {
    console.log("Registration data in Api function:::", reqBody);
    return await commonApi("post", `${BASE_URL}/register`, reqBody, "")
}

export const verifyOtpApi = async (reqBody) => {
    console.log("Otp verifying in Api function:::", reqBody);
    return await commonApi("POST", `${BASE_URL}/verify_otp`,reqBody,"")
}