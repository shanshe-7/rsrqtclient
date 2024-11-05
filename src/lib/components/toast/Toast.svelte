<script context="module">
  import { writable } from "svelte/store";

  const toasts = writable([]);

  export function addToast(message, type = "success", duration = 3000) {
    const id = Date.now();
    toasts.update((all) => [...all, { id, message, type }]);

    if (duration) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  }

  export function dismissToast(id) {
    toasts.update((all) => all.filter((t) => t.id !== id));
  }
</script>

<script>
  import { fade, fly } from "svelte/transition";
</script>

<!-- Toast container -->
<div class="toast-container fixed top-4 right-4 z-50 flex flex-col gap-2">
  {#each $toasts as toast (toast.id)}
    <div
      in:fly={{ x: 200, duration: 300 }}
      out:fade
      class="toast-item p-4 rounded-lg shadow-lg min-w-[300px] {toast.type ===
      'success'
        ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
        : 'bg-red-100 border-l-4 border-red-500 text-red-700'}"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          {#if toast.type === "success"}
            <!-- Success Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          {:else}
            <!-- Error Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {/if}
          <p class="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          class="ml-4 text-sm hover:opacity-75"
          on:click={() => dismissToast(toast.id)}
        >
          ✕
        </button>
      </div>
    </div>
  {/each}
</div>
