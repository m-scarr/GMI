import Battlefield from "./Battlefield";
import Cache from "./Cache";
import Character from "./Character/index.js";
import Group from "./Group";
import Locale from "./Locale"
import NativeItem from "./NativeItem";
import Event from "./Event";
import API from "../API";
import { nameInputInstance } from "../components/NameInput";

export default class Game {
    category = "games"
    id = null;
    app = null;
    online = false;
    name = "New Game";
    overworldLocale = null;
    heroes = [];
    npcs = [];
    enemies = [];
    groups = [];
    groupMembers = [];
    battlefields = [];
    combatants = [];
    nativeItems = [];
    inventoryItems = [];
    locales = [];
    logs = [];
    stats = [];
    caches = [];
    events = [];
    testImage = new Image();

    idObject;

    constructor(app, online) {
        this.idObject = {
            characters: 0,
            groups: 0,
            groupMembers: 0,
            battlefields: 0,
            combatants: 0,
            nativeItems: 0,
            inventoryItems: 0,
            locales: 0,
            logs: 0,
            stats: 0,
            caches: 0,
            events: 0
        };
        this.online = online;
        this.app = app;
        if (!online) {
            Locale.create(this, (locale) => {
                locale.fields.name = "Overworld Locale";
                locale.set("mapSrc", "./assets/defaultMap.jpeg");
                this.overworldLocale = locale;
                this.app.set("currentGame", this);
                this.app.set("currentLocale", locale);
            })
        } else {
            this.app.set("currentGame", this);
            this.app.set("currentLocale", this.overworldLocale);
        }
    }

    set(field, value) {
        if (this.online) {
            API.updateEntity(this, field, value, (result) => {
                if (result) {
                    this[field] = value;
                }
            })
        } else {
            this[field] = value;
        }
    }

    getId(category) {
        this.idObject[category === "heroes" || category === "npcs" || category === "enemies" ? "characters" : category] += 1;
        return this.idObject[category === "heroes" || category === "npcs" || category === "enemies" ? "characters" : category];
    }

    removeEntity(entity) {
        this[entity.category].removeById(entity.id);
    }

    addEntity(entity) {
        this[entity.category].push(entity);
    }

    save() {
        var data = {
            name: this.name,
            overworldId: this.overworldLocale.id,
            characters: [],
            groups: [],
            battlefields: [],
            nativeItems: [],
            locales: [],
            caches: [],
            events: [],
            idObject: this.idObject
        };
        [...this.heroes, ...this.npcs, ...this.enemies].forEach((character) => {
            data.characters[data.characters.length] = character.save();
        })
        this.groups.forEach((group) => {
            data.groups[data.groups.length] = group.save();
        })
        this.battlefields.forEach((battlefield) => {
            data.battlefields[data.battlefields.length] = battlefield.save();
        })
        this.nativeItems.forEach((nativeItem) => {
            data.nativeItems[data.nativeItems.length] = nativeItem.save();
        })
        this.locales.forEach((locale) => {
            data.locales[data.locales.length] = locale.save();
        })
        this.caches.forEach((cache) => {
            data.caches[data.caches.length] = cache.save();
        })
        this.events.forEach((event) => {
            data.events[data.events.length] = event.save();
        })

        return data;
    }

    load(game, cb) {
        this.id = game.id
        this.heroes = [];
        this.npcs = [];
        this.enemies = [];

        game.characters.forEach((character) => { new Character({ ...character, game: this }); });

        this.groups = [];
        game.groups.forEach((group) => { new Group({ ...group, game: this }); });

        this.battlefields = [];
        game.battlefields.forEach((battlefield) => { new Battlefield({ ...battlefield, game: this }); });

        this.nativeItems = [];
        game.nativeItems.forEach((nativeItem) => { new NativeItem({ ...nativeItem, game: this }); });

        this.locales = [];
        game.locales.forEach((locale) => { new Locale({ ...locale, game: this }); });

        this.caches = [];
        game.caches.forEach((cache) => { new Cache({ ...cache, game: this }); });

        this.events = [];
        game.events.forEach((event) => { new Event({ ...event, game: this }) });

        this.idObject = game.idObject;
        this.name = game.name;

        this.overworldLocale = this.locales.findById(game.overworldId);

        [...this.heroes, ...this.npcs, ...this.enemies, ...this.groups, ...this.nativeItems, ...this.caches, ...this.locales, ...this.battlefields, ...this.events].forEach((entity) => {
            entity.setUp()
        });

        this.app.set("currentLocale", this.overworldLocale, () => {
            this.app.getMarkerEntities(cb);
        });
    }

    refresh(cb) {
        API.readGame(this.id, (game) => {
            var characters = [...this.heroes, ...this.npcs, ...this.enemies];
            var foundEntity;
            var currentEntityId = this.app.state.currentEntity === null ? null : this.app.state.currentEntity.id;
            this.app.setState({ currentEntity: null }, () => {
                game.characters.forEach((character) => {
                    foundEntity = characters.findById(character.id);
                    if (foundEntity === null) {
                        new Character({ ...character, game: this });
                    } else {
                        foundEntity.refresh(character);
                    }
                });

                game.groups.forEach((group) => {
                    foundEntity = this.groups.findById(group.id);
                    if (foundEntity === null) {
                        new Group({ ...group, game: this });
                    } else {
                        foundEntity.refresh(group);
                    }
                });

                game.nativeItems.forEach((nativeItem) => {
                    foundEntity = this.nativeItems.findById(nativeItem.id);
                    if (foundEntity === null) {
                        new NativeItem({ ...nativeItem, game: this });
                    } else {
                        foundEntity.refresh(nativeItem);
                    }
                });

                game.caches.forEach((cache) => {
                    foundEntity = this.caches.findById(cache.id);
                    if (foundEntity === null) {
                        new Cache({ ...cache, game: this });
                    } else {
                        foundEntity.refresh(cache);
                    }
                });

                game.battlefields.forEach((battlefield) => {
                    foundEntity = this.battlefields.findById(battlefield.id);
                    if (foundEntity === null) {
                        new Battlefield({ ...battlefield, game: this });
                    } else {
                        foundEntity.refresh(battlefield);
                    }
                });

                game.locales.forEach((locale) => {
                    foundEntity = this.locales.findById(locale.id);
                    if (foundEntity === null) {
                        new Locale({ ...locale, game: this });
                    } else {
                        foundEntity.refresh(locale);
                    }
                });

                game.events.forEach((event) => {
                    foundEntity = this.events.findById(event.id);
                    if (foundEntity === null) {
                        new Event({ ...event, game: this });
                    } else {
                        foundEntity.refresh(event);
                    }
                });

                /*-------------------------------------------------------------------------*/

                [...this.heroes, ...this.npcs, ...this.enemies].forEach((character) => {
                    if (game.characters.findById(character.id) === null) {
                        character.forceDelete();
                    } else {
                        character.setUp();
                    }
                });

                this.groups.forEach((group) => {
                    if (game.groups.findById(group.id) === null) {
                        group.forceDelete();
                    } else {
                        group.setUp();
                    }
                });

                this.nativeItems.forEach((nativeItem) => {
                    if (game.nativeItems.findById(nativeItem.id) === null) {
                        nativeItem.forceDelete();
                    } else {
                        nativeItem.setUp();
                    }
                });

                this.caches.forEach((cache) => {
                    if (game.caches.findById(cache.id) === null) {
                        cache.forceDelete();
                    } else {
                        cache.setUp();
                    }
                });

                this.battlefields.forEach((battlefield) => {
                    if (game.battlefields.findById(battlefield.id) === null) {
                        battlefield.forceDelete();
                    } else {
                        battlefield.setUp();
                    }
                });

                this.locales.forEach((locale) => {
                    if (game.locales.findById(locale.id) === null) {
                        locale.forceDelete();
                    } else {
                        locale.setUp();
                    }
                });

                this.events.forEach((event) => {
                    if (game.events.findById(event.id) === null) {
                        event.forceDelete();
                    } else {
                        event.setUp();
                    }
                });
                if (typeof nameInputInstance !== "undefined") {
                    nameInputInstance.update();
                }
                this.app.setState({ currentEntity: currentEntityId === null ? null : this[this.app.state.currentView].findById(currentEntityId) }, () => {
                    this.app.getMarkerEntities(cb);
                })
            })
        })
    }
}