<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  export let open = false;
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger><slot name="trigger" /></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <slot name="header" />
    </Dialog.Header>

    <slot />

    <Dialog.Footer>
      <slot name="footer" />
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
