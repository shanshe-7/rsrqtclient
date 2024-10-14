<script>
  import "../app.css";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="max-w-5xl mx-auto">
  <div
    class="flex justify-between pl-5 pr-5 border-b border-surface-50 pt-4 pb-3 mb-2"
  >
    <a
      class="text-primary underline-offset-4 hover:underline visited:text-purple-600"
      variant="link"
      href="/">ტურნირები</a
    >

    <a
      class="text-primary underline-offset-4 hover:underline"
      variant="link"
      href="/questions">შესვლა</a
    >
  </div>
  <slot />
</div>
