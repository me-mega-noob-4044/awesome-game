export default class ClientSideUTILS {
    static playerIdMap = new Map();
    static playerSidMap = new Map();

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