import { BASE_URL } from './baseUrl'
import { commonApi } from './commonApi'


export const fetchHomeBannersApi = async () => {
    console.log("inside fetch banners api :::");

    return await commonApi("GET", `${BASE_URL}/banner`, "", "")
}

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

//for fetching subscription plans 
export const fetchSubscriptionPlanApi = async (reqHeader) => {
return await commonApi("GET",`${BASE_URL}/plan/list`, "", reqHeader)
}

//update profile 
export const updateProfileApi = async (reqBody, reqHeader) => {
    console.log("inside profile update api");
    console.log("reqbody of update profle::", reqBody);
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
    return await commonApi("POST", `${BASE_URL}/partner/profile`, reqBody, reqHeader);
}

//for fetching current plan 
export const getCurrentPlanApi = async (reqHeader) => {
    console.log("Inside get current plan api ");
    return await commonApi("GET", `${BASE_URL}/myplan`, "", reqHeader)
}

//for fetching my matches 
export const getMyMatchesApi = async (reqHeader, reqBody) => {
    console.log("Inside my matches apii", reqBody);
    return await commonApi("POST", `${BASE_URL}/matches`, reqBody, reqHeader)
}

//for fetching todays match
export const getTodaysMatchApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/partner/list`, reqBody, reqHeader)
}

export const getMoreMatcheshApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/morematches`, reqBody, reqHeader)
}

//for listing visited history
export const listVisitedHistoryApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/profile/visited`, reqBody, reqHeader)
}

//for sending send interest
export const sendInterestApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/interest/send`, reqBody, reqHeader)
}

//for listing interest
export const listInterestApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/interest/list`, reqBody, reqHeader)
}

export const getContactDataApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/contact/send`, reqHeader, reqBody)
}

//get shortlisted profiles
export const getWishlistedProfilesApi = async (reqHeader) => {
    console.log("inside wishlisted user api :::");
    return await commonApi("GET", `${BASE_URL}/wishlist/list`, "", reqHeader)
}

//add and remove profiles to wishlist 
export const addRemoveWishlistApi = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${BASE_URL}/wishlist/add`, reqBody, reqHeader)
}

//for update status for inbox :: accept request, sent request etc...
export const UpdateStatusApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/interest/updatestatus`, reqBody, reqHeader)
}

export const addSuccesstoryApi = async (reqBody) => {
    console.log("Inside success stories api:::");
    console.log("success stories :::", reqBody);
    for (let [key, value] of reqBody.entries()) {
        console.log(`${key}:`, value);
    }
    return await commonApi("POST", `${BASE_URL}/success_story/add`, reqBody, "")
}

//for fetching contact history
export const listContactHistoryApi = async (reqHeader, reqBody) => {
    console.log("inside contact history api :::");
    console.log("reqbody for contact history :::", reqBody);
    return await commonApi("POST", `${BASE_URL}/contact/list`, reqBody, reqHeader)
}


//for deleting profile picture
export const deleteGalleryImagesApi = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${BASE_URL}/image/delete`, reqBody, reqHeader)
}


//admin side API


//for listing users
export const listAllUsersApi = async (reqHeader, reqBody) => {
    console.log(reqBody);

    return await commonApi("POST", `${BASE_URL}/admin/users/list`, reqBody, reqHeader)
}

//for upadating active-inactive status of user
export const updateUserStatusApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/admin/users/update`, reqBody, reqHeader)
}

//for fetching subscription plan
export const fetchSubscriptionPlansApi = async (reqHeader) => {
    return await commonApi("GET", `${BASE_URL}/admin/plan/list`, "", reqHeader)
}

//for assigning plan to user
export const assignSubscriptionPlanApi = async (reqHeader, reqBody) => {
    console.log("Plan data", reqBody);
    return await commonApi("POST", `${BASE_URL}/admin/plan/assign`, reqBody, reqHeader)
}

//for listing enquiries
export const getEnquiriesApi = async (reqHeader) => {
    console.log("Get enquiries");
    return await commonApi("GET", `${BASE_URL}/admin/enquiries`, "", reqHeader)
}

//for listing success stories
export const listSuccessStoriesApi = async (reqHeader) => {
    return await commonApi("GET", `${BASE_URL}/admin/success_story/list`, "", reqHeader)
}

//update success stories
export const updateStoryStatus = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/admin/success_story/update`, reqBody, reqHeader)
}

//approve success stories
export const HandleSuccessStoriesApi = async (reqHeader, reqBody) => {
    console.log(reqBody, reqHeader);
    return await commonApi("POST", `${BASE_URL}/admin/success_story/update`, reqBody, reqHeader);
}

//for deleting success stories 
export const deleteSuccessStoriesApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/admin/success_story/delete`, reqBody, reqHeader)
}

//for inserting banner 
export const insertBannerApi = async (reqHeader, reqBody) => {
    console.log("req body :::", reqBody);
    return await commonApi("POST", `${BASE_URL}/admin/banner/add`, reqBody, reqHeader);
}

//for listing banner images for landing page & admin side preview and also for landing page
export const listBannersApi = async () => {
    return await commonApi("GET", `${BASE_URL}/banner`, "", "")
}

//for listing uploaded banners in admin side for manage banners
export const listAdminBannerApi = async (reqHeader) => {

    return await commonApi("GET", `${BASE_URL}/admin/banner/list`, "", reqHeader)
}

//for updating banner status
export const updateBannerStatusApi = async (reqHeader, reqBody) => {
    console.log("inside banner status", reqBody);
    return await commonApi("POST", `${BASE_URL}/admin/banner/update`, reqBody, reqHeader)
}

//for deleting banner
export const deleteBannerApi = async (reqHeader, reqBody) => {
    console.log(reqHeader);
    return await commonApi("POST", `${BASE_URL}/admin/banner/delete`, reqBody, reqHeader)
}

//for dashboard data
export const getDashboardDataApi = async (reqHeader) => {
    console.log("Inside get dashboard datataaaaaa")
    return await commonApi("GET", `${BASE_URL}/admin/dashboard`, "", reqHeader)
}


//for view user profile 
export const getUserProfileDataApi = async (reqHeader, reqBody) => {
    console.log("Inside get userprofile");
    console.log("user id ::: ", reqBody);

    return await commonApi("POST", `${BASE_URL}/admin/users/profile`, reqBody, reqHeader)
}

//add new subscription plan
export const addNewSubscriptionPlanApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/admin/plan/add`, reqBody, reqHeader)
}

//get subscription plan
export const getSubscriptionPlanApi = async (reqHeader) => {
    return await commonApi("GET", `${BASE_URL}/admin/plan/list`, "", reqHeader)
}

//edit subscription plan 
export const editSubscriptionPlanApi = async (reqHeader, reqBody) => {
    return await commonApi("POST", `${BASE_URL}/admin/plan/update`, reqBody, reqHeader)
}

//delete subscription plan 
export const deleteSubscriptionPlanApi = async (reqHeader, reqBody) => {
    console.log("inside deletesub", reqBody);
    return await commonApi("POST", `${BASE_URL}/admin/plan/delete`, reqBody, reqHeader)
}

