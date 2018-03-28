import APIRequest from "./APIRequest";
import { HTTPMethod } from "./HTTPMethod";

/**
 * Subclass this to provide the implementation of Get request
 */
class GETRequest extends APIRequest {
    getHTTPMethod() {
        return HTTPMethod.GET;
    }
}

export default GETRequest;