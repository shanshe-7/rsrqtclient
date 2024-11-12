<script lang="js">
  import Link from "../common/link.svelte";
  import Pagination from "$lib/components/pagination/pagination.svelte";
  export let data;
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
  <div class="flex justify-center align-middle mt-10 p-5 text-center text-xl">
    <p>ტურნირები</p>
  </div>

  <div class="flex flex-col justify-between gap-5">
    <div class="flex align-middle mt-10 p-5">
      <div class="flex flex-col gap-4">
        {#each data.tournaments as tournament}
          <Link
            visited="visited:text-purple-400"
            textColor="text-blue-700"
            href="/questions">{tournament.name}</Link
          >
        {/each}
        {#each data.tournaments as tournament}
          <Link
            visited="visited:text-purple-400"
            textColor="text-blue-700"
            href="/questions">{tournament.name}</Link
          >
        {/each}
        {#each data.tournaments as tournament}
          <Link
            visited="visited:text-purple-400"
            textColor="text-blue-700"
            href="/questions">{tournament.name}</Link
          >
        {/each}
        {#each data.tournaments as tournament}
          <Link
            visited="visited:text-purple-400"
            textColor="text-blue-700"
            href="/questions">{tournament.name}</Link
          >
        {/each}
      </div>
    </div>

    <Pagination count={data?.tournaments?.length} size={10} />
  </div>
{/if}
