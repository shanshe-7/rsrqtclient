<script lang="js">
  export let question;
  export let isHidden = false;
  $: localHidden = isHidden;

  const toggleAnswer = () => {
    localHidden = !localHidden;
  };
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-4">
    <p>
      {question?.question_number}.

      {#each question?.body.split("\\n") as line, index (line)}
        {#if index === 0}
          <span>{line}</span>
          {#if question?.files?.length > 0}
            {#each question?.files as file (file)}
              <img
                class="w-1/2 mt-2"
                src={file?.url}
                alt={"დასარიგებელი მასალა"}
              />
            {/each}
          {/if}
        {:else}
          <p class="mt-2">
            {line}
          </p>
        {/if}
      {/each}
    </p>

    <div class="flex items-center gap-2">
      <p>
        {#if localHidden}
          <button on:click={toggleAnswer}> ... </button>
        {:else}
          <b>პასუხი:</b>
          {question?.answer}
        {/if}
      </p>
    </div>
  </div>
  {#if !localHidden}
    <div class="flex flex-col gap-1">
      <p><b>კომენტარი:</b> {question?.comment}</p>
      <p>
        <b>წყარო:</b>
        {#each question?.source?.split("\\n") as line, idx (line)}
          {++idx}.
          {#if line?.includes("src_link:")}
            <a
              class="text-blue-700 underline pr-1"
              target="_blank"
              rel="noreferrer nofollow"
              href={line?.split("src_link:")?.[1]}>ბმული</a
            >
          {:else}
            {line}
          {/if}
        {/each}
      </p>
      <p>
        <b>ავტორი:</b>
        {#each question?.authors as author, index (author)}
          {author}{#if index < question?.authors.length - 1},
          {/if}
        {/each}
      </p>
    </div>
  {/if}
</div>
