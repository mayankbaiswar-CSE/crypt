/**
 * Subclass this to provide an implementation of RequestInterceptor.
 *
 * Further your would be required to register it during the API call to the respective Subclass of APIRequest.
 */
class RequestInterceptor {

    /**
     * Override this method to intercept the request payload.
     * @param request the actual javascript Request class object.
     * @returns return the modified Request object that would be required to make an API call.
     */
    intercept(request) {
        return request;
    }
}

export default RequestInterceptor;