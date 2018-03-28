import { serializeFormData } from "../serializers/serializeFormData";
import { serializeJson } from "../serializers/serializeJson";
import { ContentType } from "../request/ContentTypes";
import { serializeFormUrlEncoded } from "./serializeFormUrlEncoded";

/**
 * Serialize the body as per the selected content type.
 * @param body the request body.
 * @param contentType the content type of the request.
 * @returns the serialized body.
 */
export const serializeBody = (body, contentType) => {

    if (body) {
        switch (contentType) {
            case ContentType.json:
                body = serializeJson(body);
                break;
            case ContentType.formData:
                body = serializeFormData(body);
                break;
            case ContentType.formUrlEncoded:
                body = serializeFormUrlEncoded(body);
                break;
        }
    }

    return body;
};