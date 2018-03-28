import { currencyBaseUrl } from "../BaseUrl"
import { GET } from "../../libapi/rest/request/methods/Get";
import GETRequest from "../../libapi/rest/request/GETRequest";
import UrlBuilder from "../../libapi/rest/request/UrlBuilder";

class GetCurrencyById extends GETRequest {
    getUrl(props) {
        let urlBuilder = new UrlBuilder(currencyBaseUrl)
            .addPath(props.id)
            .addPath(props.start)
            .addPath(props.end)
        return urlBuilder.build();
    }
}

// handle network issue and api fail issue 

export default GetCurrencyById;