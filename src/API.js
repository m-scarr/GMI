import axios from "axios"
import { appInstance } from "./App";

export default class API {

    static init(host) {
        axios.defaults.baseURL = host;
        axios.defaults.withCredentials = true;
    }

    static auth = {
        isLoggedIn: (cb) => {
            axios.get("/User?func=isLoggedIn").then((res) => {
                if (typeof cb === "function") {
                    cb(res.data);
                }
            })
        },
        register: (data, cb) => {
            appInstance.setState({ loading: true }, () => {
                axios.post("/User?func=register", data).then((res) => {
                    appInstance.setState({ loading: false }, () => {
                        cb(res.data);
                    })
                }).catch((err) => {
                    appInstance.setState({ loading: false }, () => {
                        console.log(err);
                        cb(false);
                    })
                })
            })
        },
        logIn: (data, cb) => {
            appInstance.setState({ loading: true }, () => {
                axios.post("/User?func=logIn", data).then((res) => {
                    appInstance.setState({ loading: false }, () => {
                        cb(res.data);
                    })
                }).catch((err) => {
                    appInstance.setState({ loading: false }, () => {
                        console.log(err);
                        cb(false);
                    })
                })
            })
        },
        logOut: () => {
            appInstance.setState({ loading: true }, () => {
                axios.post("/auth/User?func=logOut").then((res) => {
                    window.location.href = "/"
                }).catch((err) => {
                    window.location.href = "/"
                })
            })
        }
    }

    static create = (category, data, cb) => {
        var switchCase = {
            "game": "Game",
            "heroes": "Character",
            "npcs": "Character",
            "enemies": "Character",
            "groups": "Group",
            "groupMembers": "GroupMember",
            "nativeItems": "NativeItem",
            "inventoryItems": "InventoryItem",
            "caches": "Cache",
            "battlefields": "Battlefield",
            "combatants": "Combatant",
            "locales": "Locale",
            "events": "Event",
            "logs": "Log",
            "stats": "Stat",
            "games": "Game",
        }
        appInstance.setState({ loading: true }, () => {
            axios.post("/auth/" + switchCase[category] + "?func=create", data).then((res) => {
                appInstance.setState({ loading: false }, () => {
                    if (typeof cb === "function") {
                        cb(res.data);
                    }
                })
            }).catch((err) => {
                appInstance.setState({ loading: false }, () => {
                    console.log(err);
                    if (typeof cb === "function") {
                        cb(false);
                    }
                })
            })
        })
    }

    //USE: readGame((games)=>{ console.log(games) }) OR readGame(id,(game)=>{ console.log(game) })
    static readGame = (id, cb) => {
        appInstance.setState({ loading: true }, () => {
            axios.get("/auth/Game?func=read" + ((typeof id === "function") ? "All" : ("&id=" + id))).then((res) => {
                appInstance.setState({ loading: false }, () => {
                    if (typeof id === "function") {
                        id(res.data);
                    } else if (typeof cb === "function") {
                        cb(res.data);
                    }
                })
            }).catch((err) => {
                console.log(err);
                appInstance.setState({ loading: false }, () => {
                    if (typeof id === "function") {
                        id(false);
                    } else if (typeof cb === "function") {
                        cb(false);
                    }
                })
            })
        })
    }

    static updateEntity(entity, field, value, cb) {
        var data = { id: entity.id };

        var switchCase = {
            "heroes": "Character",
            "npcs": "Character",
            "enemies": "Character",
            "groups": "Group",
            "groupMembers": "GroupMember",
            "nativeItems": "NativeItem",
            "inventoryItems": "InventoryItem",
            "caches": "Cache",
            "battlefields": "Battlefield",
            "combatants": "Combatant",
            "locales": "Locale",
            "events": "Event",
            "logs": "Log",
            "stats": "Stat",
            "games": "Game",
        }
        if (field.slice(-3) === "Src") {
            var testImage = new Image();
            testImage.src = value;
            testImage.onload = () => {
                data[field] = testImage.src;
                appInstance.setState({ loading: true }, () => {
                    axios.post("/auth/" + switchCase[entity.category] + "?func=update", data).then((res) => {
                        appInstance.setState({ loading: false }, () => {
                            if (typeof cb === "function") {
                                cb(res.data, value)
                            }
                        })
                    })
                })
            }
            testImage.onerror = () => {
                testImage.src = "./assets/noimage.png";
            }
        } else {
            if (field === "location") {
                if (entity.category !== "combatants") {
                    data.localeId = value.locale.id;
                }
                data.x = value.x;
                data.y = value.y;
            } else {
                data[field] = value;
            }
            appInstance.setState({ loading: true }, () => {
                axios.post("/auth/" + switchCase[entity.category] + "?func=update", data).then((res) => {
                    appInstance.setState({ loading: false }, () => {
                        if (typeof cb === "function") {
                            cb(res.data, value)
                        }
                    })
                })
            })
        }
    }

    static deleteEntity(entity, cb) {
        var switchCase = {
            "heroes": "Character",
            "npcs": "Character",
            "enemies": "Character",
            "groups": "Group",
            "groupMembers": "GroupMember",
            "nativeItems": "NativeItem",
            "inventoryItems": "InventoryItem",
            "caches": "Cache",
            "battlefields": "Battlefield",
            "combatants": "Combatant",
            "locales": "Locale",
            "events": "Event",
            "logs": "Log",
            "stats": "Stat"
        }
        appInstance.setState({ loading: true }, () => {
            axios.delete("/auth/" + switchCase[entity.category] + "?func=delete&id=" + entity.id).then((res) => {
                appInstance.setState({ loading: false }, () => {
                    if (typeof cb === "function") {
                        cb(res.data)
                    }
                })
            })
        })
    }
}