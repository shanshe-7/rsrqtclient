<script lang="js">
  import Link from "../common/link.svelte";

  export let data = [];
</script>

{#if !data?.tournaments?.length}
  <div class="flex justify-center align-middle mt-10 p-5 text-center">
    <p>
      სამწუხაროდ ტურნირები არ მოიძებნა. თუ გსურთ ტურნირის ატვირთვა გთხოვთ
      დალოგინდეთ.
      <Link textColor="text-blue-400" href="/login">შესვლა</Link>
    </p>
  </div>
{/if}

{#if data?.tournaments?.length}
  <div class="flex justify-center align-middle mt-10 p-5 text-center">
    <p>ტურნირები</p>
  </div>

  <div class="flex justify-center align-middle mt-10 p-5 text-center">
    <div class="flex flex-col gap-4">
      {#each data.tournaments as tournament}
        <Link href="/tournaments/{tournament.id}">{tournament.name}</Link>
      {/each}
    </div>
  </div>
{/if}
