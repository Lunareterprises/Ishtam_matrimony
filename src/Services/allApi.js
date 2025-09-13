import { BASE_URL } from './baseUrl'
import { commonApi } from './commonApi'

export const RegistrationApi = async (reqBody) => {
    console.log("Registration data in Api function:::", reqBody);
    return await commonApi("post", `${BASE_URL}/register`, reqBody, "")
}

export const verifyOtpApi = async (reqBody) => {
    console.log("Otp verifying in Api function:::", reqBody);
    return await commonApi("POST", `${BASE_URL}/verify_otp`, reqBody, "")
}

export const loginWithOtpApi = async (reqBody) => {
    console.log("Login with OTP Data check", reqBody);
    return await commonApi("POST", `${BASE_URL}/send_otp`, reqBody, "")
}

//For otp generation to reset password
export const resetPasswordApi = async (reqBody) => {
    console.log("Reset password OTP check", reqBody);
    return await commonApi("POST", `${BASE_URL}/forgotpassword`, reqBody, "")
}


//for reset password updation
export const resetCredentialsApi = async (reqBody)=> {
    console.log("Inside reset credentials data check",reqBody);
    return await commonApi("POST", `${BASE_URL}/resetpassword`,reqBody,"")
}