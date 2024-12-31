export default class ClientSideUTILS {
    static playerIdMap = new Map();
    static playerSidMap = new Map();
    static aiSidMap = new Map();

    static findAiBySid(id) {
        return this.aiSidMap.get(id);
    }

    static setAiBySid(id, player) {
        this.aiSidMap.set(id, player);
    }

    static removeAiBySid(id) {
        this.aiSidMap.delete(id);
    }

    static findPlayerById(id) {
        return this.playerIdMap.get(id);
    }

    static setPlayerById(id, player) {
        this.playerIdMap.set(id, player);
    }

    static removePlayerById(id) {
        this.playerIdMap.delete(id);
    }

    static findPlayerBySid(id) {
        return this.playerSidMap.get(id);
    }

    static setPlayerBySid(id, player) {
        this.playerSidMap.set(id, player);
    }

    static removePlayerBySid(id) {
        this.playerSidMap.delete(id);
    }
}