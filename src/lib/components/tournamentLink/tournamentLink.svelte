<script lang="js">
  import Link from "../../../common/link.svelte";
  import DeleteIcon from "$lib/components/delete/Delete.svelte";
  import Dialog from "$lib/components/dialog/Dialog.svelte";
  import { Button } from "$lib/components/ui/button";

  import { getAuthState } from "$lib/auth";

  const { user } = getAuthState();

  export let tournament;
  let open = false;

  function handleToggleDialog() {
    open = !open;
  }
</script>

<div class="flex justify-between w-full gap-8">
  <Link
    visited="visited:text-purple-400"
    textColor="text-blue-700"
    href={`/tournament/${tournament.id}`}>{tournament.name}</Link
  >
  {#if user?.id === Number(tournament?.uploader_id)}
    <Dialog {open}>
      <button on:click={handleToggleDialog} slot="trigger">
        <DeleteIcon size={20} cursorState={"pointer"} />
      </button>
      <p>
        დარწმუნებული ხართ რომ გსურთ წაშალოთ ტურნირი: <strong
          >{tournament?.name}</strong
        >
      </p>
      <div slot="footer">
        <div class="flex gap-2">
          <Button on:click={handleToggleDialog}>არა</Button>
          <Button>დიახ</Button>
        </div>
      </div>
    </Dialog>
  {/if}
</div>
