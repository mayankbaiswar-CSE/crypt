
import { makeRequest } from "../RawRequest"

/**
 * @deprecated Will be deleted Soon. Use GETRequest instead.
 */
export const GET = (url, headers) => {
    return makeRequest('GET', url, { ...headers, "accept-version": "1.0.0" }, undefined);
};