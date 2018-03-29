import { serializeBody } from "../serializers/serializeBody";
import { ContentType } from "./ContentTypes";
import { HTTPMethod } from "./HTTPMethod";
import RequestInterceptor from "../../interceptors/RequestInterceptor";
import ResponseInterceptor from "../../interceptors/ResponseInterceptor";
import { iterateInterceptor } from "../../interceptors/InterceptorChain";

/**
 * Represents the network api requests, with which you can associate the respective success, error and in progress
 * actions that could be delivered to the respective reducers.
 *
 * Furthermore, it provides a way to associate interceptors for both request and response.
 *
 * This also provides a way to make network requests with payload of some extra parameters.
 */
class APIRequest {

    /**
     * This schema should be build with either the help of class APIActionsBuilder.
     *
     * @param actionSchema the action schema comprising of success, inprogress and error.
     */
    constructor(actionSchema) {
        this.actionSchema = actionSchema;
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }

    /**
     * This function makes the api call and dispatches the inprogress action.
     */
    makeRequest(props) {
        return (dispatch) => {
            if (this.shouldDispatch()) {
                this.dispatchInProgress(dispatch);
            }
            this.requestData(dispatch, props)
        };
    }

    /**
     * Dispatch only if action schema is properly defined.
     * @returns true if requests has action schema, false otherwise.
     */
    shouldDispatch() {
        return (!!this.actionSchema)
            && this.actionSchema.hasOwnProperty("success")
            && this.actionSchema.hasOwnProperty("error")
            && this.actionSchema.hasOwnProperty("inprogress");
    }

    /**
     * Dispatch the success payload from the API request.
     * @param dispatch the Redux dispatch.
     * @param payload the response payload.
     */
    dispatchSuccess(dispatch, payload) {
        const success = this.actionSchema.success;
        const action = {
            ...success,
            payload
        };

        if (action.type) {
            dispatch(action);
        }
    }

    /**
     * Dispatch the failure payload from the API request.
     * @param dispatch the Redux dispatch.
     * @param payload the response payload.
     */
    dispatchFailure(dispatch, payload) {
        const failure = this.actionSchema.error;
        const action = {
            ...failure,
            payload
        };

        if (action.type) {
            dispatch(action)
        }
    }

    /**
     * Dispatch the in progress payload from the API request.
     * @param dispatch he Redux dispatch.
     */
    dispatchInProgress(dispatch) {
        const inprogress = this.actionSchema.inprogress;
        const action = {
            ...inprogress
        };

        if (action.type) {
            dispatch(action)
        }
    }

    /**
     * Add the request interceptor, these interceptors would be invoked in order.
     * @param requestInterceptor an instance of RequestInterceptor
     */
    addRequestInterceptor = (requestInterceptor) => {
        if (requestInterceptor instanceof RequestInterceptor) {
            this.requestInterceptors.push(requestInterceptor);
        } else {
            throw new Error("Request interceptor should be instance of class RequestInterceptor");
        }
    };

    /**
     * Adds the response interceptors, these interceptors would be invoked in order,
     * @param responseInterceptor an instance of ResponseInterceptor
     */
    addResponseInterceptor = (responseInterceptor) => {
        if (responseInterceptor instanceof ResponseInterceptor) {
            this.responseInterceptors.push(responseInterceptor);
        } else {
            throw new Error("Response interceptor should be instance of class ResponseInterceptor");
        }
    };

    /**
     * Override this method to provide the url, you can use URLBuilder class for this.
     * @param props these props are passed by the respective component or layer.
     */
    getUrl(props) {
        throw new Error("Please override this method and provide the url");
    }

    /**
     * Override this method to provide the header.
     * @param props these props are passed by the respective component or layer.
     */
    getHeaders(props) {
        return {
            "Content-Type": this.getContentType()
        };
    }

    /**
     * Override this method to provide the body.
     * @param props these props are passed by the respective component or layer.
     */
    getBody(props) {
        return undefined;
    }

    /**
     * Override this method to provide the HTTP method, you can use HTTPMethod class for this.
     */
    getHTTPMethod() {
        throw new Error("Please provide the HTTP method to execute");
    }

    /**
     * Override this method to provide the content type. Note that this API request is intelligent enough
     * to serialze the request body as per the selected content type.
     * @returns the content type of the request.
     */
    getContentType() {
        return ContentType.json;
    }

    /**
     * Gets the data from the API and dispatches the required action.
     * @param dispatch
     * @param props
     */
    requestData(dispatch, props) {
        let body = undefined;

        if (!(this.getHTTPMethod() === HTTPMethod.GET)) {
            body = serializeBody(this.getBody(props), this.getContentType());
        }

        try {
            this.execute(this.getHTTPMethod(), this.getUrl(props), this.getHeaders(props), body)
                .then((response) => {
                    if (this.shouldDispatch()) {
                        this.dispatchSuccess(dispatch, response)
                    }
                })
                .catch(error => {
                    if (this.shouldDispatch()) {
                        this.dispatchFailure(dispatch, error);
                    }
                });
        } catch (err) {
            if (this.shouldDispatch()) {
                this.dispatchFailure(dispatch, err);
            }
        }
    }

    /**
     * The actual implementation of the request happens here.
     * @param method the HTTP method.
     * @param url the request url
     * @param headers the headers
     * @param body the body
     * @returns {Promise.<Response>}
     */
    execute = (method, url, headers, body) => {

        const requestParams = {
            method,
            headers,
            body,
        };

        let request = new Request(url, requestParams);

        console.log(request);
        return iterateInterceptor(request, this.requestInterceptors)
            .then(request => fetch(request))
            .then(response => iterateInterceptor(response, this.responseInterceptors))
    };

}

export default APIRequest;

