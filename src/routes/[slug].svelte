<script context="module">
    import { browser } from '$app/env';
    import a from '$lib/cachestore';
    let { cacheStore } = a;
    
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ page, fetch }) {
        if(browser && Array.isArray(cacheStore)){
            const found = cacheStore.find(item => item.slug === page.params.slug);
            if(found){
                return { props: {data: found} };
            }
        }
        const data = await fetch(`/posts.json?slug=${page.params.slug}`);
        const {ok} = data;
        if (!ok) {
            throw new Error('Failed to load posts');
        }

        return {
            props: {
                data: await data.json(),
            },
        };
    }
</script>
<script>
    export let data;
</script>
<h1>{data.title}</h1>
<p>{data.txt}</p>
<a href="/">Back</a>