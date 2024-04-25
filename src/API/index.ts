import axios from "axios";
import { Category } from "../state/types";

export default class API {
    static init() {
        axios.defaults.baseURL = "http://localhost:8080";
        //axios.defaults.withCredentials = true;
    }
    static async create(category: Category, data: any) {
        try {
            const result = await axios.post(`/auth/${typeof category === "string" ? category : Category[category]}/create`, data);
            return result.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    static async update(category: Category, id: number, data: any) {
        try {
            console.log(`/auth/${Category[category]}/update?id=${id}`);
            const result = await axios.put(`/auth/${Category[category]}/update?id=${id}`, data);
            return result.data
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    static async delete(category: Category, id: number) {
        try {
            const result = await axios.delete(`/auth/${Category[category]}/delete?id=${id}`);
            return result.data
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    static user = {
        isLoggedIn: async () => {

        },
        register: async (logInName: string, displayName: string, email: string, password: string) => {
            const result = await axios.post("/User/register", {
                logInName,
                displayName,
                password,
                email,
            })
            console.log(result.data);
        },
        logIn: async (logInName: string, password: string) => {
            const result = await axios.post("/User/login", {
                logInName,
                password,
            })
            console.log(result.data);
        }
    }
}