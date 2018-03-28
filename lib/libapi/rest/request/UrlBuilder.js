/**
 * Use this class to build the url of any request.
 */
class UrlBuilder {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.path = "";
        this.query = "";
    }

    /**
     * Adds the path to the request url. The path would be encoded so no need to encode the path.
     * @param path the URL path
     * @returns {UrlBuilder} for adding further parameters.
     */
    addPath = (path) => {

        path = encodeURIComponent(path);

        if (this.path) {
            this.path += "/";
        }

        this.path += path;

        return this;
    };

    /**
     * Adds the query parameters to the request url.
     * @param key the key for the request param, no need to encode as this method would do it for you.
     * @param value the key for the request param, no need to encode as this method would do it for you.
     * @returns {UrlBuilder} for adding further parameters.
     */
    addQueryParam = (key, value) => {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);

        if (this.query) {
            this.query += "&";
        }

        this.query += `${key}=${value}` ;

        return this;
    };

    /**
     * Builds and return the url of the request.
     * @returns the constructed url.
     */
    build = () => {

        let url = this.baseUrl;

        if (!url.endsWith("/")) {
            url += "/";
        }

        if (this.path) {
            url += `${this.path}`;
        }

        if (this.query) {
            url += `?${this.query}`;
        }

        return url;
    }

}

export default UrlBuilder;