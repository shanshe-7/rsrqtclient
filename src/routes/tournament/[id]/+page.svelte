<script lang="js">
  import Pagination from "$lib/components/pagination/pagination.svelte";

  export let data;
</script>

<div>
  turniriii
  <Pagination count={data?.tournaments?.total_count} perPage={12} />
</div>
