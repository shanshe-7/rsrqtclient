<script>
  import { goto } from "$app/navigation"; // Use 'goto' instead of 'navigate' for client-side routing

  export let href = "/";
  export let textColor = "text-primary";
  export let visited = "visited:text-purple-500"; // Default visited color
</script>

<a
  class={`${textColor} underline-offset-4 hover:underline ${visited}`}
  variant="link"
  {href}
  data-sveltekit-preload-data="off"
  data-sveltekit-noscroll
  on:click|preventDefault={() => goto(href)}
>
  <slot />
</a>
