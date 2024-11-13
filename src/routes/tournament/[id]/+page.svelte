<script lang="js">
  import Pagination from "$lib/components/pagination/pagination.svelte";

  export let data;
  $: ({ questions, tournament } = data);
</script>

<div class="flex flex-col gap-8 pl-10 pr-10 mt-8 mb-8 text-justify">
  <h1 class="text-2xl align-middle text-center text-black mt-3 font-bold">
    {tournament?.name}
  </h1>

  {#if tournament?.authors}
    <div class="flex gap-2 justify-center">
      <span class="font-bold">ავტორები:</span>
      {#each tournament.authors as author (author)}
        <span>
          {author},
        </span>
      {/each}
    </div>
  {/if}

  {#if tournament?.date}
    <div class="flex gap-1 justify-center">
      <span class="font-bold">ჩატარების თარიღი: </span>
      {new Date(tournament?.date).toISOString().split("T")[0]}
    </div>
  {/if}

  {#each questions as question (question.id)}
    <div cl>{question.body}</div>
  {/each}
  <Pagination count={tournament?.total_count} perPage={12} />
</div>
