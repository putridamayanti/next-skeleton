import axios from "axios";
import Api from "utils/api";
import AppStorage from "utils/storage";

const Login = (params) => {
    return Api.Instance.post('/login', params)
        .then(res => {
            AppStorage.setItem('x-token', res.data?.data?.token);
            return res
        });
};

const Register = (params) => {
    return Api.Instance.post('/register', params)
        .then(res => {
            AppStorage.setItem('x-token', res.data?.data?.token);
            return res
        });
};


const AuthService = {
    Login,
    Register
}

export default AuthService;