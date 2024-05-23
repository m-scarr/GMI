import axios from "axios";
import { Category } from "../state/types";
import AppState from "../state/AppState";
import Game from "../state/Game";


const getRouteCategory = (category: string) => {
    if (category === "Hero" || category === "NPC" || category === "Enemy") {
        return "Character"
    }
    return category;
}

export default class API {
    static async init() {
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + (window.location.port === "" ? "" : ":8080");
        axios.defaults.withCredentials = true;
        return await API.user.isLoggedIn();
    }

    static async create(category: Category, data: any) {
        try {
            if (typeof category === "string") {
                data.category = category;
            } else {
                if (category == Category.Hero) {
                    data.category = "Hero";
                } else if (category == Category.NPC) {
                    data.category = "NPC";
                } else if (category == Category.Enemy) {
                    data.category = "Enemy";
                }
            }
            data.gameMasterMode = AppState.instance.gameMasterMode;
            data.gameId = Game.instance?.id;
            const result = await axios.post(`/auth/${getRouteCategory(typeof category === "string" ? category : Category[category])}/create`, data);
            return result.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async readByUser(category: Category.Game | Category.Hero) {
        try {
            const result = await axios.get(`/auth/${category === Category.Game ? 'Game' : 'Character'}/readByUser`)
            return result.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async read(category: Category.Game | Category.Hero, id: number) {
        try {
            const result = await axios.get(`/auth/${category === Category.Game ? 'Game' : 'Character'}/read?id=${id}`)
            return result.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }


    static async update(category: Category, id: number, data: any) {
        try {
            data.id = id;
            data.gameMasterMode = AppState.instance.gameMasterMode;
            const result = await axios.put(`/auth/${getRouteCategory(typeof category === "string" ? category : Category[category])}/update`, data);
            return result.data
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async delete(category: Category, id: number) {
        try {
            const result = await axios.delete(`/auth/${getRouteCategory(typeof category === "string" ? category : Category[category])}/delete?id=${id}&gameMasterMode=${AppState.instance.gameMasterMode}`);
            return result.data
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static user = {
        isLoggedIn: async () => {
            try {
                const result = await axios.get(`/User/isLoggedIn`);
                if (typeof result.data.success !== "undefined" && result.data.success === true) {
                    return { user: result.data.user, serverAccess: true };
                } else {
                    return { user: null, serverAccess: true };
                }
            } catch (err) {
                console.error(err);
                return { user: null, serverAccess: false }
            }
        },
        register: async (logInName: string, password: string) => {
            const result = await axios.post("/User/register", {
                logInName,
                password,
            })
            return result.data !== false
        },
        logIn: async (logInName: string, password: string) => {
            try {
                const result = await axios.post("/User/login", {
                    logInName,
                    password,
                });
                if (typeof result.data.success !== "undefined" && result.data.success === true) {
                    return result.data.user;
                } else {
                    return null;
                }
            } catch (err) {
                console.error(err);
                return null
            }
        },
        logOut: async () => {
            await axios.post("auth/User/logOut");
            window.location.href = "/";
        }
    }
}