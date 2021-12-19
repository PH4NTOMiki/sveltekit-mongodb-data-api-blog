import createMongoClient from "@ph4ntomiki/mongodb-data-api-client";
const client = createMongoClient(process.env['VITE_MONGODB_APP_ID'] || import.meta.env.VITE_MONGODB_APP_ID, process.env['VITE_MONGODB_API_KEY'] || import.meta.env.VITE_MONGODB_API_KEY, null, {'fetch': fetch.bind(self)});

export default client;