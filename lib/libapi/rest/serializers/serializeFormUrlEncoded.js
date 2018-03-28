/**
 * Serialize the form url encoded body.
 * @param object object the request body.
 * @returns the serialized body
 */
export const serializeFormUrlEncoded = (object) => {
    let formBody = [];

    if (object) {
        Object.entries(object).forEach(
            ([key, value]) => {
                key = encodeURIComponent(key);
                value = encodeURIComponent(value);
                formBody.push(`${key}=${value}`);
            }
        );
    }

    formBody = formBody.join("&");

    return formBody;
};