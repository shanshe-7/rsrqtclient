<script lang="js">
  import Pagination from "$lib/components/pagination/pagination.svelte";
  import Question from "./Question.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Timer from "./Timer.svelte";

  let showAnswer = false;
  let showTimer = true;

  export let data;
  $: ({ questions, tournament } = data);

  function toggleShowAnswer(value) {
    showAnswer = value;
  }

  function toggleTimer(value) {
    showTimer = value;
  }
</script>

<div class="flex gap-4 align-top justify-start">
  <div class="flex flex-col gap-8 pl-10 pr-10 mt-8 mb-8 text-justify">
    <h1 class="text-2xl align-middle text-center text-black mt-3 font-bold">
      {tournament?.name}
    </h1>

    {#if tournament?.authors}
      <div class="flex flex-col items-center gap-2 md:flex-row justify-center">
        <span class="font-bold">ავტორები:</span>
        <div class="flex align-middle text-center gap-2 justify-center">
          {#each tournament?.authors as author, index (author)}
            {author}{#if index < tournament?.authors.length - 1}, {" "}
            {/if}
          {/each}
        </div>
      </div>
    {/if}

    {#if tournament?.date}
      <div class="flex gap-1 justify-center">
        <span class="font-bold">ჩატარების თარიღი: </span>
        {new Date(tournament?.date).toISOString().split("T")[0]}
      </div>
    {/if}

    <div class="flex items-center space-x-2 md:pl-[297px]">
      <Checkbox
        onCheckedChange={toggleShowAnswer}
        id="terms"
        checked={showAnswer}
        aria-labelledby="terms-label"
      />
      <Label
        id="terms-label"
        for="terms"
        class="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black cursor-pointer"
      >
        პასუხების ჩვენება
      </Label>
    </div>

    <div class="flex gap-8">
      <div
        class="flex flex-col gap-8 hidden md:flex sticky top-4 h-fit p-2 rounded-[8px] bg-slate-100"
      >
        <div class="flex pt-2 pb-2 pl-1 gap-2 w-[250px]">
          <Label id="timer">თაიმერი</Label>
          <Checkbox
            onCheckedChange={toggleTimer}
            checked={showTimer}
            aria-labelledby="timer"
          />
        </div>

        {#if showTimer}
          <Timer />
        {/if}
      </div>

      <div class="flex flex-col gap-12">
        {#each questions as question (question.id)}
          <Question {question} isHidden={!showAnswer} />
        {/each}
      </div>
    </div>

    <Pagination count={tournament?.total_count} perPage={50} />
  </div>
</div>
