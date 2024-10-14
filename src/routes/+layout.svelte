<script>
  import "../app.css";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="max-w-5xl mx-auto">
  <div class="flex justify-between pl-5 pr-5 border-b border-surface-50">
    <Button variant="link">Bookmarks</Button>
    <Button variant="link">Full Urls</Button>
  </div>
  <slot></slot>
</div>
