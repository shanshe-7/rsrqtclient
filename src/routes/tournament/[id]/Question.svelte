<script lang="js">
  export let question;
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

    <p><b>პასუხი:</b> {question?.answer}</p>
  </div>
  <div class="flex flex-col gap-1">
    <p><b>კომენტარი:</b> {question?.comment}</p>
    <p class="overflow-hidden"><b>წყარო:</b> {question?.source}</p>
    <p>
      <b>ავტორი:</b>
      {#each question?.authors as author, index (author)}
        {author}{#if index < question?.authors.length - 1},
        {/if}
      {/each}
    </p>
  </div>
</div>
