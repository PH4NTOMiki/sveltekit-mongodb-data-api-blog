<script context="module">
	import { browser } from '$app/env';
	import _ from '$lib/cachestore';
	
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		if(browser && _.posts.length){
			return {props: {data: [..._.posts], cache: true}};
		}
		const data = await fetch('/posts.json?all=1');
		const {ok} = data;
		if (!ok) {
			throw new Error('Failed to load posts');
		}
		const posts = await data.json();
		//if(browser)_.posts = [...posts];
		return {
			props: {
				data: posts,
			},
		};
	}
</script>
<script>
import { onMount } from 'svelte';
	export let data;
	export let cache = false;

	onMount(async()=>{
		window.addEventListener('sveltekit:navigation-start', () => {
			_.posts = [...data];
		}, {once: true});
		if(cache){
			data = await (await fetch('/posts.json?all=1')).json();
		}
	});
</script>
{#each data as post}
	<a href={`/${post.slug}`}>{post.title}</a><br>
{/each}