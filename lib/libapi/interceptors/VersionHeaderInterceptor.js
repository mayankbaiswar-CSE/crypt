import RequestInterceptor from "./RequestInterceptor";

/**
 * This is responsible for adding the version header for the API.
 */
export default class VersionHeaderInterceptor extends RequestInterceptor {

    intercept(request) {
        request.headers.append("accept-version", "1.0.0");
        return request;
    }
}