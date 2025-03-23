import Pocketbase from "pocketbase"

class PBClient {
    instance: PBClient | null = null;

    static pb = new Pocketbase("http://127.0.0.1:8090")

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this;
    }
}


export default PBClient;