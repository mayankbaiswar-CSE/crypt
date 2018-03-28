/**
 * Serialize the form data body.
 * @param object the request body .
 * @returns the serialized body
 */
export const serializeFormData = (object) => {
    let formData = new FormData();

    if (object) {
        Object.entries(object).forEach(
            ([key, value]) => {
                formData.append(`${key}`, `${value}`);
            }
        );
    }

    return formData;
};