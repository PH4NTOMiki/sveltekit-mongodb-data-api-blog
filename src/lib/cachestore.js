let cacheStore = null;
const a = {
    get cacheStore() {
        return cacheStore;
    },
    set cacheStore(value) {
        cacheStore = value;
    }
}
export default a;