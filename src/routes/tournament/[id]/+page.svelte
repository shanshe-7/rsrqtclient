<script lang="js">
  import Pagination from "$lib/components/pagination/pagination.svelte";
  import Question from "./Question.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  let showAnswer = false;

  export let data;
  $: ({ questions, tournament } = data);

  function toggleShowAnswer(value) {
    showAnswer = value;
  }
</script>

<div class="flex flex-col gap-8 pl-10 pr-10 mt-8 mb-8 text-justify">
  <h1 class="text-2xl align-middle text-center text-black mt-3 font-bold">
    {tournament?.name}
  </h1>

  {#if tournament?.authors}
    <div class="flex gap-2 justify-center">
      <span class="font-bold">ავტორები:</span>
      {#each tournament?.authors as author, index (author)}
        <span
          >{author}{#if index < tournament?.authors.length - 1},
          {/if}</span
        >
      {/each}
    </div>
  {/if}

  {#if tournament?.date}
    <div class="flex gap-1 justify-center">
      <span class="font-bold">ჩატარების თარიღი: </span>
      {new Date(tournament?.date).toISOString().split("T")[0]}
    </div>
  {/if}

  <div class="flex items-center space-x-2">
    <Checkbox
      onCheckedChange={toggleShowAnswer}
      id="terms"
      checked={showAnswer}
      aria-labelledby="terms-label"
    />
    <Label
      id="terms-label"
      for="terms"
      class="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
    >
      პასუხების ჩვენება
    </Label>
  </div>

  {#each questions as question (question.id)}
    <Question {question} isHidden={!showAnswer} />
  {/each}

  <Pagination count={tournament?.total_count} perPage={50} />
</div>
