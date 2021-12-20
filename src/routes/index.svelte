<script context="module">
    import { browser } from '$app/env';
    import { setCacheStore } from '$lib/cachestore';
    
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch }) {
        const data = await fetch('/posts.json?all=1');
        const {ok} = data;
        if (!ok) {
            throw new Error('Failed to load posts');
        }
        const posts = await data.json();
        if(browser)setCacheStore(posts.slice());
        return {
            props: {
                data: posts,
            },
        };
    }
</script>
<script>
    export let data;
</script>
{#each data as post}
    <a href={`/${post.slug}`}>{post.title}</a><br>
{/each}