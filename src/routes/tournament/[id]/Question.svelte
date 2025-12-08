<script lang="js">
  export let question;
  export let isHidden = false;
  $: localHidden = isHidden;

  const toggleAnswer = () => {
    localHidden = !localHidden;
  };

  function isLink(linkstr) {
    if (typeof linkstr !== "string") return false;

    const trimmed = linkstr.trim();

    if (trimmed.startsWith("https://") || trimmed.startsWith("http://"))
      return true;

    return false;
  }
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
                class="w-full md:w-1/2 mt-2"
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

    <div class="flex flex-col gap-2">
      {#if localHidden}
        <button class="w-fit" on:click={toggleAnswer}> ... </button>
      {/if}
      <p class="flex gap-1 flex-wrap align-middle">
        {#if !localHidden}
          <b>პასუხი:</b>

          {#each question?.answer?.split("\\n") as line, index (line)}
            {#if index === 0}
              {#if line?.includes("ჩათვლა:")}
                {#each line?.split("ჩათვლა:") as item, idx (item)}
                  {#if idx === 0}
                    {item}
                    <button class="cursor-pointer" on:click={toggleAnswer}>
                      <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 15.4l7.7-7.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.4.4-1 .4-1.4 0l-8-8c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l6.9 7.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  {:else}
                    <div class="flex w-full gap-1">
                      <b>ჩათვლა:</b>
                      <p>{item}</p>
                    </div>
                  {/if}
                {/each}
              {:else}
                {line}

                <button class="cursor-pointer" on:click={toggleAnswer}>
                  <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style="cursor: pointer;"
                  >
                    <path
                      d="M12 15.4l7.7-7.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.4.4-1 .4-1.4 0l-8-8c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l6.9 7.3z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              {/if}
            {:else}
              <p class="mt-0">
                {line}
              </p>
            {/if}
          {/each}
        {/if}
      </p>
    </div>
  </div>
  {#if !localHidden}
    <div class="flex flex-col gap-1">
      {#if question?.comment}
        <p><b>კომენტარი:</b> {question.comment}</p>
      {/if}
      {#if question?.source}
        <p>
          <b>წყარო:</b>
          {#each question.source?.split("\\n") as line, idx (line)}
            {++idx}.
            {#if isLink(line)}
              <a
                class="text-blue-700 underline pr-1"
                target="_blank"
                rel="noreferrer nofollow"
                href={line}>ბმული</a
              >
            {:else}
              {line}
            {/if}
          {/each}
        </p>
      {/if}
      {#if question?.authors?.[0] !== "" && question?.authors?.length}
        <p>
          <b>ავტორი:</b>
          {#each question?.authors as author, index (author)}
            {author}{#if index < question?.authors.length - 1},
            {/if}
          {/each}
        </p>
      {/if}
    </div>
  {/if}
</div>
