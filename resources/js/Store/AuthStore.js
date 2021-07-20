import { observable, action, makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";
import CryptoJS from "crypto-js";

class AuthStore {
    appState = null;

    constructor() {
        makeAutoObservable(this, {
            appState: observable,
            saveToken: action,
            getToken: action,
        });
    }

    saveToken = (appState) => {
        try {
            localStorage.setItem(
                "appState",
                CryptoJS.AES.encrypt(
                    sign(appState, "secret"),
                    "laravel-react-crm"
                ).toString()
            );
            this.getToken();
        } catch (error) {
            console.log(error);
        }
    };

    getToken = () => {
        try {
            const appStateData = localStorage.getItem("appState");
            if (appStateData) {
                var bytes = CryptoJS.AES.decrypt(
                    appStateData,
                    "laravel-react-crm"
                );
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                this.appState = jwt_decode(originalText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    removeToken = () => {
        localStorage.removeItem("appState")
        this.appState = null;
    };
}

export default new AuthStore();
