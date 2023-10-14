import API from "./API"
import { Component } from "react";
import defaultState from "./defaultState";
import { Menu } from "./Menu";
import { Map } from "./map";

import Battlefield from "./entities/Battlefield";
import Cache from "./entities/Cache";
import Character from "./entities/Character";
import Event from "./entities/Event";
import Group from "./entities/Group";
import Locale from "./entities/Locale";
import NativeItem from "./entities/NativeItem";
import Modals from "./modals";

export let appInstance;

export class App extends Component {
  refObj = {
    options: { color: "dimgray", name: "Options", defaultMarkerSrc: "./assets/options.png" },
    heroes: { color: "green", name: "Heroes", defaultMarkerSrc: "./assets/hero.png", defaultName: "New Hero", create: (cb) => { Character.create(this.state.currentGame, "heroes", cb) } },
    npcs: { color: "blue", name: "NPCs", defaultMarkerSrc: "./assets/npc.png", defaultName: "New NPC", create: (cb) => { Character.create(this.state.currentGame, "npcs", cb) } },
    enemies: { color: "red", name: "Enemies", defaultMarkerSrc: "./assets/enemy.png", defaultName: "New Enemy", create: (cb) => { Character.create(this.state.currentGame, "enemies", cb) } },
    groups: { color: "darkorange", name: "Groups", defaultMarkerSrc: "./assets/group.png", defaultName: "New Group", create: (cb) => { Group.create(this.state.currentGame, cb) } },
    nativeItems: { color: "gold", name: "Loot", defaultMarkerSrc: "./assets/loot.png", defaultName: "New Item", create: (cb) => { NativeItem.create(this.state.currentGame, cb) } },
    caches: { color: "saddlebrown", name: "Caches", defaultMarkerSrc: "./assets/cache.png", defaultName: "New Cache", create: (cb) => { Cache.create(this.state.currentGame, cb) } },
    battlefields: { color: "maroon", name: "Battlefields", defaultMarkerSrc: "./assets/battlefield.png", defaultName: "New Battlefield", create: (cb) => { Battlefield.create(this.state.currentGame, cb) } },
    locales: { color: "darkviolet", name: "Locales", defaultMarkerSrc: "./assets/locale.png", defaultName: "New Locale", create: (cb) => { Locale.create(this.state.currentGame, cb) } },
    events: { color: "hotpink", name: "Events", defaultMarkerSrc: "./assets/event.png", defaultName: "New Event", create: (cb) => { Event.create(this.state.currentGame, cb) } },
  };

  state = {};

  constructor(props) {
    super(props);
    appInstance = this;
  }

  componentDidMount() {
    this.setState({ ...defaultState }, () => {
      API.init("http://localhost:8080/");
      API.auth.isLoggedIn((response) => {
        if (response.success) {
          this.setState({ user: response.user }, () => {
            this.setIconSources();
          })
        } else {
          this.setIconSources();
        }
      })
    })
  }

  register(cb) {
    API.auth.register(this.state.modals.register, (response) => {
      if (typeof cb === "function") {
        cb(response)
      }
    })
  }

  logIn(cb) {
    API.auth.logIn(this.state.modals.logIn, (response) => {
      if (response.success) {
        this.setState({ currentModal: "selectMode", user: response.user }, () => {
          if (typeof cb === "function") {
            cb(response)
          }
        })
      } else {
        alert("Incorrect username or password!");
        if (typeof cb === "function") {
          cb(response)
        }
      }
    })
  }

  logOut() {
    API.auth.logOut();
  }

  createGame(cb) {
    API.create("game", {}, (result) => {
      this.setState({ modals: { ...this.state.modals, games: [...this.state.modals.games, { ...result }] } }, () => {
        if (typeof cb === "function") {
          cb(result);
        }
      })
    })
  }

  getGames(cb) {
    API.readGame((games) => {
      this.setState({ modals: { ...this.state.modals, games } }, () => {
        if (typeof cb === "function") {
          cb(games);
        }
      })
    })
  }

  refresh(cb) {
    API.readGame(this.state.currentGame.id, (game) => {
      this.state.currentGame.refresh(game, () => {
        this.getMarkerEntities(cb)
      });
    })
  }

  openGame(gameId, cb) {
    API.readGame(gameId, (game) => {
      this.state.currentGame.load(game, cb)
    })
  }

  getMarkerEntities(cb) {
    if (this.state.currentGame !== null) {
      var markerEntities = [];
      [...this.state.currentGame.heroes, ...this.state.currentGame.npcs, ...this.state.currentGame.enemies, ...this.state.currentGame.groups,
      ...this.state.currentGame.caches, ...this.state.currentGame.locales, ...this.state.currentGame.events, ...this.state.currentGame.battlefields].forEach((entity) => {
        if (this.state.currentLocale !== null && typeof entity.fields.location !== "undefined" && typeof entity.fields.location.locale !== "undefined" &&
          entity.fields.location.locale !== null && this.state.currentLocale.id === entity.fields.location.locale.id &&
          (((entity.category === "heroes" || entity.category === "npcs" || entity.category === "enemies") && entity.fields.unique && entity.fields.visible && entity.groupMembers.length === 0) ||
            ((entity.category !== "heroes" && entity.category !== "npcs" && entity.category !== "enemies") && entity.fields.visible))) {
          markerEntities.push(entity);
        }
      });
      this.setState({ markerEntities }, () => {
        if (typeof cb === "function") {
          cb();
        }
      })
    }
  }

  set(field, value, cb) {
    this.setState({ [field]: value }, cb);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentEntity !== this.state.currentEntity && this.state.currentEntity !== null) {
      this.setState({ currentView: this.state.currentEntity.category })
    }
    if (prevState.currentModal !== this.state.currentModal) {
      if (this.state.currentModal === "logIn" && this.state.user !== null) {
        this.setState({ currentModal: "selectMode" })
      }
      if (this.state.currentModal === "selectGame") {
        this.getGames();
      }
    }
  }

  setModal(modal, value, cb) {
    this.setState({ modals: { ...this.state.modals, [modal]: value } }, cb);
  }

  setModalValue(modal, field, value, cb) {
    this.setState({ modals: { ...this.state.modals, [modal]: { ...this.state.modals[modal], [field]: value } } }, cb)
  }

  setIconSources(cb) {
    var modals = { ...this.state.modals }
    var i;
    var weaponRefObj = [
      { name: "arrow", count: 20 },
      { name: "axe", count: 30 },
      { name: "bow", count: 30 },
      { name: "claw", count: 30 },
      { name: "dagger", count: 36 },
      { name: "katar", count: 20 },
      { name: "mace", count: 36 },
      { name: "spear", count: 20 },
      { name: "staff", count: 30 },
      { name: "star", count: 20 },
      { name: "sword", count: 36 },
      { name: "wand", count: 30 },
    ]
    for (i = 1; i <= 56; i++) {
      modals.iconSelector.accessory.sources[modals.iconSelector.accessory.sources.length] = "./assets/icons/accessory/accessory_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 108; i++) {
      modals.iconSelector.armor.sources[modals.iconSelector.armor.sources.length] = "./assets/icons/armor/armor_" + ((i < 10) ? "0" : "") + ((i < 100) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 29; i++) {
      modals.iconSelector.boot.sources[modals.iconSelector.boot.sources.length] = "./assets/icons/boot/boot_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 64; i++) {
      modals.iconSelector.drops.sources[modals.iconSelector.drops.sources.length] = "./assets/icons/drops/drops_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 72; i++) {
      modals.iconSelector.food.sources[modals.iconSelector.food.sources.length] = "./assets/icons/food/food_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 41; i++) {
      modals.iconSelector.glove.sources[modals.iconSelector.glove.sources.length] = "./assets/icons/glove/glove_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 72; i++) {
      modals.iconSelector.helmet.sources[modals.iconSelector.helmet.sources.length] = "./assets/icons/helmet/helmet_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 100; i++) {
      modals.iconSelector.material.sources[modals.iconSelector.material.sources.length] = "./assets/icons/material/material_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 224; i++) {
      modals.iconSelector.potion.sources[modals.iconSelector.potion.sources.length] = "./assets/icons/potion/potion_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 216; i++) {
      modals.iconSelector.quest.sources[modals.iconSelector.quest.sources.length] = "./assets/icons/quest/quest_" + ((i < 10) ? "0" : "") + ((i < 100) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 106; i++) {
      modals.iconSelector.ring.sources[modals.iconSelector.ring.sources.length] = "./assets/icons/ring/ring_" + ((i < 10) ? "0" : "") + ((i < 100) ? "0" : "") + i + ".png"
    }
    for (i = 1; i <= 43; i++) {
      modals.iconSelector.shield.sources[modals.iconSelector.shield.sources.length] = "./assets/icons/shield/shield_" + ((i < 10) ? "0" : "") + i + ".png"
    }
    var j;
    for (i = 0; i < weaponRefObj.length; i++) {
      for (j = 1; j < weaponRefObj[i].count; j++) {
        modals.iconSelector.weapon.sources[modals.iconSelector.weapon.sources.length] = "./assets/icons/weapon/weapon_" + weaponRefObj[i].name + "_" + (((j < 10) ? "0" : "") + j) + ".png"
      }
    }
    this.setState({ modals }, cb)
  }

  render() {
    return (Object.keys(this.state).length === 0 ? null :
      <div className="App" style={{ display: "flex", flexDirection: "row" }}>
        {this.state.user !== null && this.state.currentGame !== null && this.state.currentGame.online && this.state.currentModal === null ?
          <img alt="Log Out" src="./assets/logout.png" className="hoverable log-out" onClick={() => {
            this.logOut()
          }} /> : null}
        <Modals app={this} />
        {this.state.hideMenu ? null : <Menu app={this} />}
        <img className="hoverable toggle-menu" alt="Hide Memu" src="./assets/back.png" style={{ left: this.state.hideMenu ? 2 : 325, transform: this.state.hideMenu ? "rotate(180deg)" : "rotate(0deg)", borderTopLeftRadius: this.state.hideMenu ? 8 : 0, borderBottomRightRadius: this.state.hideMenu ? 0 : 8 }} onClick={() => { this.setState({ hideMenu: !this.state.hideMenu }) }} />
        <Map app={this} />
        {this.state.loading ? <div className="loading-overlay" /> : null}
      </div>
    )
  }
}