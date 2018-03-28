import APIRequest from "./APIRequest";
import { HTTPMethod } from "./HTTPMethod";

/**
 * Subclass this to provide the implementation of the PUT request
 */
class PUTRequest extends APIRequest {
    getHTTPMethod() {
        return HTTPMethod.PUT;
    }
}

export default PUTRequest;