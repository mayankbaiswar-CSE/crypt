import ResponseInterceptor from "./ResponseInterceptor";

/**
 * This is responsible to extract the data part of the success response.
 * If no such data key is found in the response it raises an error.
 */
export default class SuccessResponseInterceptor extends ResponseInterceptor {

    intercept(response) {
        return response.then((payload) => {
            if (payload) {
                return payload;
            } else {
                let error = new Error("Error occured. Please debug.");
                error.response = response;
                throw error;
            }
        });
    }

}