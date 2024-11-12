<script lang="js">
  import * as Pagination from "$lib/components/ui/pagination";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let prevText = "წინა";
  export let nextText = "შემდეგი";
  export let count = 100;
  export let perPage = 20;
  let currentPage = Number($page.url.searchParams.get("page")) || 1;

  function handlePageClick(page) {
    const url = new URL(window.location.href);
    if (page === 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", page);
    }
    currentPage = page;
    goto(url.pathname + url.search);
  }
</script>

<Pagination.Root
  {count}
  {perPage}
  {currentPage}
  onPageChange={handlePageClick}
  let:pages
>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton>{prevText}</Pagination.PrevButton>
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item isVisible={currentPage == page.value}>
          <Pagination.Link {page} isActive={currentPage == page.value}>
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton>{nextText}</Pagination.NextButton>
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
