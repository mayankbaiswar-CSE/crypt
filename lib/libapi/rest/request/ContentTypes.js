
const definedTypes = {
    json: "application/json",
    xml: "application/xml",
    textXML: "text/xml",
    html: "text/html",
    javaScript: "application/javascript",
    text: "",
    textPlain: "text/plain",
    formData: "multipart/form-data",
    formUrlEncoded: "application/x-www-form-urlencoded"
};

/**
 * Usage
 *
 *     <li>json: when content type is json</li>
 *     <li>formData: when body is form data,</li>
 *     <li>formUrlEncoded: when body is form url encoded</li>
 *
 *     etc.
 */
export const ContentType = Object.freeze(definedTypes);