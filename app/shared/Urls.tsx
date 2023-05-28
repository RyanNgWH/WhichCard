import Config from "react-native-config";

const { API_SERVER_BASE_URL } = Config;

const URLs = {
    API_SERVER: {
        USER: {
            BASE: API_SERVER_BASE_URL + "/users",
            LOGIN: API_SERVER_BASE_URL + "/users" + "/login"
        }
    }
}

export default URLs;