<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch }) {
        const data = await fetch('/posts.json?all=1');
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
{#each data as post}
    <a href={`/${post.slug}`} sveltekit:prefetch>{post.title}</a><br>
{/each}