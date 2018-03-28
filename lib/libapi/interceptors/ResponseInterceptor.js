/**
 * Subclass this to provide the implementation of the Response Interceptor.
 *
 * Further your would be required to register it during the API call to the respective Subclass of APIRequest.
 */
class ResponseInterceptor {

    /**
     * Override this method to intercept the response payload.
     * @param response a promise object that would be essentially a network response payload, which you can modify.
     * @returns this function should return the (modified) response payload.
     */
    intercept(response) {
        return response;
    }
}

export default ResponseInterceptor;