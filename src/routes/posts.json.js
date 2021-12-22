import client from "$lib/db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {
	const all = query.has('all') && !!query.get('all');
	if(all) {
		return {body:(await client.db('abc').collection('blogposts').find())};
	}
	
	if(!query.has('slug'))return;
	const slug = query.get('slug');
	return {body:(await client.db('abc').collection('blogposts').findOne({ slug }))};
}