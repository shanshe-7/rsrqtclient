<script lang="js">
  import Link from "../common/link.svelte";

  export let data = [];

  console.log(data.tournament, "data");
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

<div></div>
