<script context="module">
	import { browser } from '$app/env';
	import _ from '$lib/cachestore';
	
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		if(browser && _.posts.length){
			const found = _.posts.find(item => item.slug === page.params.slug);
			if(found){
				return { props: {data: found, cache: true} };
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
import { onMount } from 'svelte';
import { page } from '$app/stores';
	export let data;
	export let cache = false;

	onMount(async()=>{
		if(cache){
			data = await (await fetch(`/posts.json?slug=${$page.params.slug}`)).json()
			const _index = _.posts.findIndex(item => item.slug === $page.params.slug);
			if(_index>-1)_.posts[_index] = {...data};
		}
		if(!_.posts.length){
			_.posts = [...await (await fetch('/posts.json?all=1')).json()];
		}
	});
</script>
<h1>{data.title}</h1>
<p>{data.txt}</p>
<a href="/">Back</a>
