/**
 * @deprecated Will be deleted Soon. Use APIRequest instead.
 */
export const makeRequest = (method, url, headers, body) => {

    const requestParams = {
        method,
        headers,
        body,
    };

    return fetch(url, requestParams);
};

