import axios from "axios"
import ToastifyMessage from "../components/toast/ToastifyMessage";

export const fetchApiData = async(fetch_api_url) => {
    let responseData = null;
    try {
        const response = await axios.get(fetch_api_url,
            {
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            ToastifyMessage({ type: "success", message: response.data.message });
        }
        responseData = response.data.data;

    } catch(e) {
        if (e.response) {
            responseData = e.response.data.data;
            ToastifyMessage({ type: "error", message: e.response.data.message });
        } else {
            responseData = [];
            ToastifyMessage({ type: "error", message: "Something went wrong!" });
        }
    }
    return responseData
}
