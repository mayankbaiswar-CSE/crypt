import APIRequest from "./APIRequest";
import { HTTPMethod } from "./HTTPMethod";

/**
 * Subclass this to provide the implementation of DELETE requests.
 */
class DELETERequest extends APIRequest {
    getHTTPMethod() {
        return HTTPMethod.DELETE;
    }
}

export default DELETERequest;