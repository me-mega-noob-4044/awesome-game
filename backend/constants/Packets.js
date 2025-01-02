const Packets = {
    CLIENT_TO_SERVER: {
        JOIN_GAME: "JG",
        MOVE: "MV",
        SEND_CHAT: "SC",
        SEND_HIT: "SH",
        SEND_AIM: "SA",
        PING: "PG",
        SEND_UPGRADE: "SU",
        SEND_ATTACK: "SA2"
    },
    SERVER_TO_CLIENT: {
        SET_UP_GAME: "SG",
        ADD_PLAYER: "AP",
        UPDATE_PLAYERS: "UP",
        UPDATE_HEALTH: "UH",
        REMOVE_PLAYER: "RP",
        LOAD_GAME_OBJECT: "LG",
        SHOW_TEXT: "ST",
        KILL_PLAYER: "KP",
        HIT_ANIMATION: "HA",
        GET_CHAT: "GC",
        PING_RESPONSE: "PR",
        UPDATE_XP: "UX",
        UPDATE_AGE: "UA",
        LOAD_AI: "LA",
        UPDATE_LEADERBOARD: "UL",
        UPDATE_UPGRADES: "UU",
        UPDATE_ITEMS: "UI",
        UPDATE_EFFECTS: "UE",
        UPDATE_RELOAD: "UR"
    }
};

export default Packets;