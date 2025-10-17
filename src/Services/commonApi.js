import axios from "axios";

export const commonApi = async (httpRequest, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url: url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    };
    
    // Automatically omit Content-Type for FormData to let browser set it with boundary
    if (reqBody instanceof FormData) {
        delete reqConfig.headers["Content-Type"];
    }
    
    return await axios(reqConfig).then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}