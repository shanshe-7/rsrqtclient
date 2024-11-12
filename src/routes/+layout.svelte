<script>
  import Link from "./../common/link.svelte";
  import { getAuthState, authStore } from "$lib/auth";
  import "../app.css";

  import { onNavigate } from "$app/navigation";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="max-w-5xl mx-auto">
  <div
    class="flex justify-between pl-5 pr-5 border-b border-surface-50 pt-4 pb-3 mb-2 text-lg"
  >
    <Link visited="" href="/">ტურნირები</Link>

    {#if $authStore.isAuthenticated}
      <div class="flex align-middle gap-4 text-md">
        <Link visited="" href="/upload">ატვირთვა</Link>
        <button on:click={authStore.logout}>გამოსვლა</button>
      </div>
    {:else}
      <Link visited="" href="/login">შესვლა</Link>
    {/if}
  </div>

  <slot />
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(20px);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-20px);
    }
  }

  :root::view-transition-old(root) {
    animation:
      90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation:
      210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
</style>
