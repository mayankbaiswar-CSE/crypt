import ResponseInterceptor from "../../libapi/interceptors/ResponseInterceptor";
import APIError from "./APIError";


/**
 * This is the first interceptor and is responsible for intercepting the response and
 * based on the status code checks if the response is the error or success
 * and returns the respective success or error objects.
 */
export default class ErrorInterceptor extends ResponseInterceptor {

    intercept(response) {
        return response.json()
            .then(payload => {
                let status = response.status;
                if (status === 200) {
                    return payload;
                } else {
                    let error = new APIError("Error making API call");
                    error.statusCode = status;
                    error.response = payload;
                    error.code = payload.code;
                    error.message = payload.detail;
                    throw error;
                }
            });
    }

}