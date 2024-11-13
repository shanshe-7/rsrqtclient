<script lang="js">
  import Link from "../common/link.svelte";
  import Pagination from "$lib/components/pagination/pagination.svelte";
  export let data;
</script>

{#if !data?.tournaments?.tournaments?.length}
  <div class="flex justify-center align-middle mt-10 p-5 text-center">
    <p>
      სამწუხაროდ ტურნირები არ მოიძებნა. ტურნირის ატვირთვა.
      <Link textColor="text-blue-400" href="/upload">ატვირთვა</Link>
    </p>
  </div>
{:else}
  <div class="flex justify-center align-middle mt-10 p-5 text-center text-xl">
    <p>ტურნირები</p>
  </div>

  <div class="flex flex-col justify-between gap-5">
    <div class="flex align-middle mt-10 p-5">
      <div class="flex flex-col gap-4">
        {#each data.tournaments.tournaments as tournament}
          <Link
            visited="visited:text-purple-400"
            textColor="text-blue-700"
            href="/upload">{tournament.name}</Link
          >
        {/each}
      </div>
    </div>

    <Pagination count={data?.tournaments?.totalCount} perPage={10} />
  </div>
{/if}
