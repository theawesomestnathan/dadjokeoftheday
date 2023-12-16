<script lang="ts">  
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let joke: any;

  onMount(async () => {
    if (browser) {
      joke = await fetch(window.location.href + "api")
        .then(response => response.json());
      console.log(joke);
    }
  })
</script>

<div class="bg-black h-screen text-white pt-60 text-center">
  <h1 class="text-6xl font-light"> Dad Joke of the Day </h1>
  <div class="pt-7 w-[30rem] mx-auto"> 
    {#if joke} 
      <p> {joke.joke.joke} </p>
    {:else}
      <p> I'm thinking... </p>
    {/if} 
  </div>
</div>