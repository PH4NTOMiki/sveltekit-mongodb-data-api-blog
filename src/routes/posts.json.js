import client from "$lib/db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {
    return {app_id:typeof(VITE_MONGODB_APP_ID)!=='undefined' ? VITE_MONGODB_APP_ID : null, api_key:typeof(VITE_MONGODB_API_KEY)!=='undefined' ? VITE_MONGODB_API_KEY : null};
    const all = query.has('all') && !!query.get('all');
    if(all) {
        return (await client.db('abc').collection('blogposts').find());
    }
    
    if(!query.has('slug'))return;
    const slug = query.get('slug');
    return (await client.db('abc').collection('blogposts').findOne({ slug }));
}