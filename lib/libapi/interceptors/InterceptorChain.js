/**
 * Iterates over the interceptor chains, these interceptor chains are processed in the order
 * they are inserted.
 *
 * This is a utility method that could be used with any kind of request and response interceptors.
 *
 * @param payload the payload that would be passed in chains to the next interceptor.
 * @param interceptor the array interceptors that would be chained to receive the payload one after the other.
 * @returns {Promise} the promise would resolve to failure if any of the interceptors throws the errors
 *          and evaluates to success if all the interceptors goes well.
 */
export function iterateInterceptor(payload, interceptor) {

    return new Promise(function (resolve, reject) {

        try {
            if (Array.isArray(interceptor)) {
                for (let index = 0; index < interceptor.length; index++) {
                    let interceptorAtIndex = interceptor[index];
                    payload = interceptorAtIndex.intercept(payload);
                }
            }
            resolve(payload);
        } catch (error) {
            reject(error);
        }
    });
};