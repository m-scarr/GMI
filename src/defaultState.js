const state = {
    user: null,
    mode: null,

    currentModal: "selectOnline",
    currentGame: null,
    currentView: "options",
    currentEntity: null,
    currentLocale: null,

    modals: {
        logIn: {
            logInName: "",
            password: "",
        },
        register: {
            logInName: "",
            password: "",
            verifyPassword: "",
        },
        games: [],
        iconSelector: {
            accessory: { name: "Accessories", sources: [] },
            armor: { name: "Armor", sources: [] },
            boot: { name: "Boots", sources: [] },
            drops: { name: "Drops", sources: [] },
            food: { name: "Food", sources: [] },
            glove: { name: "Gloves", sources: [] },
            helmet: { name: "Helms", sources: [] },
            material: { name: "Materials", sources: [] },
            potion: { name: "Potions", sources: [] },
            quest: { name: "Various", sources: [] },
            ring: { name: "Rings", sources: [] },
            weapon: { name: "Weapons", sources: [] },
            shield: { name: "Shields", sources: [] }
        },
        item: null,
        battlefield: {},
    },

    settings: {},
    markerEntities: [],
    droppingMarker: null,
    goToMarker: null,
    goToCombatant: null,

    showMenu: true,

    loading: false,

    testImage: new Image()
}

export default state;