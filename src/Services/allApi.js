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
export const resetCredentialsApi = async (reqBody) => {
    console.log("Inside reset credentials data check", reqBody);
    return await commonApi("POST", `${BASE_URL}/resetpassword`, reqBody, "")
}

//Login user
export const userLoginApi = async (reqBody) => {
    return await commonApi("POST", `${BASE_URL}/login_mobile_email`, reqBody, "")
}

//update profile 
export const updateProfileApi = async (reqBody, reqHeader) => {
    console.log("inside profile update api");
    for (let [key, value] of reqBody.entries()) {
        console.log(`${key}:`, value);
    }
    return await commonApi("POST", `${BASE_URL}/profile/update`, reqBody, reqHeader);
};

//for updating partner preference
export const updatePartnerPreferenceApi = async (reqBody, reqHeader) => {
    console.log("inside profile update api");
    return await commonApi("POST", `${BASE_URL}/partner_preference/update`, reqBody, reqHeader)
}

//for fetching partner preference data
export const fetchPartnerPreferenceApi = async (reqHeader) => {
    return await commonApi("GET", `${BASE_URL}/partner_preference/data`, "", reqHeader)
}

//for fetching profile data
export const fetchProfileDataApi = async (reqHeader) => {
    return await commonApi("GET", `${BASE_URL}/profile/data`, "", reqHeader)
}

//for sending contact request
export const sendEnquiryRequestApi = async (reqBody) => {
    console.log("Inside send send enquiry request::: api", reqBody);
    return await commonApi("POST", `${BASE_URL}/contactus`, reqBody, "")
}

// change password in dashboard
export const changePasswordApi = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${BASE_URL}/changepassword`, reqBody, reqHeader)
}

/* export const fetchPlans = async (reqBody, reqHeder) => {
return await commonApi("POST",`${BASE_URL}/`)
} */


//for fetching sucess stories
export const listAllStoriesApi = async (reqBody, reqHeader) => {
    return await commonApi("GET", `${BASE_URL}/success_story/list`, reqBody, reqHeader)
}


//for fetching partner profile
export const getPartnerProfileApi = async (reqBody, reqHeader) => {
    console.log("consoling reqHeader", reqHeader);
    console.log("consoling reqBody",reqBody);
    return await commonApi("POST", `${BASE_URL}/partner/profile`, reqBody, reqHeader);
}


//for fetching current plan 
export const getCurrentPlanApi = async (reqHeader) => {
    console.log("Inside get current plan api ");
    return await commonApi("GET", `${BASE_URL}/myplan`, "", reqHeader)
}


//for fetching my matches 
export const getMyMatchesApi = async (reqHeader) => {
    return await commonApi("POST", `${BASE_URL}/matches`, "", reqHeader)
}

//for fetching todays match
export const getTodaysMatchApi = async (reqHeader, reqBody) => {
    console.log("Inside Todays match api");
    return await commonApi("POST", `${BASE_URL}/partner/list`, reqBody, reqHeader)
}

//for listing visited history
export const listVisitedHistoryApi = async (reqHeader, reqBody) => {
    console.log("Inside list visited history");
    return await commonApi("POST", `${BASE_URL}/profile/visited`, reqBody, reqHeader)
}