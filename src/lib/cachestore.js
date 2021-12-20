let cacheStore = null;
function getCacheStore() {
    return cacheStore;
}
function setCacheStore(store) {
    cacheStore = store;
}
export { getCacheStore, setCacheStore };