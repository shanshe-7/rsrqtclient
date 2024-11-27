<script lang="js">
  import Link from "../../../common/link.svelte";
  import DeleteIcon from "$lib/components/delete/Delete.svelte";
  import Dialog from "$lib/components/dialog/Dialog.svelte";
  import { Button } from "$lib/components/ui/button";
  import { getAuthState } from "$lib/auth";
  import { api } from "$lib/api";
  import Toast, { addToast } from "$lib/components/toast/Toast.svelte";
  import { goto, invalidate } from "$app/navigation";

  const { user } = getAuthState();

  export let tournament;
  let open = false;
  let isSubmitting = false;

  function handleToggleDialog() {
    open = !open;
  }
  async function handleDelete(event) {
    event.preventDefault();
    try {
      isSubmitting = true;

      await api.delete(
        `http://localhost:8080/api/protected/tournament/${tournament?.id}`
      );

      await goto("/", { invalidateAll: true });
      addToast("ტურნირი წაიშალა", "success");
    } catch (error) {
      handleToggleDialog();
      addToast(error?.error, "error");
    } finally {
      isSubmitting = false;
    }
  }
</script>

<Toast />

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
          <Button disabled={isSubmitting} on:click={handleToggleDialog}
            >არა</Button
          >
          <Button disabled={isSubmitting} on:click={handleDelete}
            >{#if isSubmitting}
              წაშლა...
            {:else}
              დიახ
            {/if}</Button
          >
        </div>
      </div>
    </Dialog>
  {/if}
</div>
