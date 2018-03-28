import APIRequest from "./APIRequest";
import { HTTPMethod } from "./HTTPMethod";

/**
 * Subclass this to provide the implementation of POST request.
 */
class POSTRequest extends APIRequest {
    getHTTPMethod() {
        return HTTPMethod.POST;
    }
}

export default POSTRequest;