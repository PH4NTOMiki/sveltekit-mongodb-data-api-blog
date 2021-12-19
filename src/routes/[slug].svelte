<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ page, fetch }) {
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