import ErrorInterceptor from "./ErrorInterceptor";
import APIRequest from "../../libapi/rest/request/APIRequest";
import VersionHeaderInterceptor from "./VersionHeaderInterceptor";
import SuccessResponseInterceptor from './SuccessResponseInterceptor';

export default function makeInterceptedRequest(requestObj, props) {
    if (!(requestObj instanceof APIRequest)) {
        throw new Error("The requestObj should be instance of the class APIRequest");
    }
    addBasicInterceptors(requestObj);
    return requestObj.makeRequest(props);
};

/**
 * @function - This method is used to add necessary interceptors to make api service working. It adds VersionHeaderInterceptor, ErrorInterceptor and SuccessResponseInterceptor.
 * @param {APIRequest} request - The service call object which have addRequestInterceptor method.
 */
export function addBasicInterceptors(request) {
    // adds the version header to the request
    request.addRequestInterceptor(new VersionHeaderInterceptor());
    // delivers the API errors to the reducers via the Error objects.
    request.addResponseInterceptor(new ErrorInterceptor());
    // delivers the data part of the Success response as that is only required.
    request.addResponseInterceptor(new SuccessResponseInterceptor());
}
