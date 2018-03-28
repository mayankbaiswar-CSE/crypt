import { currencyBaseUrl } from "../BaseUrl"
import { GET } from "../../libapi/rest/request/methods/Get";
import GETRequest from "../../libapi/rest/request/GETRequest";
import UrlBuilder from "../../libapi/rest/request/UrlBuilder";

class GetCurrencies extends GETRequest {
    getUrl(props) {
        let urlBuilder = new UrlBuilder(currencyBaseUrl)
            .addPath("v1")
            .addPath("ticker")
        urlBuilder.addQueryParam("convert", "INR");
        urlBuilder.addQueryParam("start", props.start);
        urlBuilder.addQueryParam("limit", props.limit);
        return urlBuilder.build();
    }
}

// handle network issue and api fail issue 

export default GetCurrencies;