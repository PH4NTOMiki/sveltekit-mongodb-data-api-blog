import client from "$lib/db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {
    const all = !!query.get('all');
    if(all) {
        return (await client.db('abc').collection('blogposts').find());
    }
    
    const slug = query.get('slug');
    if(!slug)return;
    return (await client.db('abc').collection('blogposts').findOne({ slug }));
}