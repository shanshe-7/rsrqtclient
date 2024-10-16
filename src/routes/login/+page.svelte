<script lang="js">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { z } from "zod";

  const schema = z.object({
    name: z.string().default("Hello world!"),
    email: z.string().email(),
  });

  export let data;

  const form = superForm(data, {
    validators: zodClient(schema),
  });

  const { form: formData, enhance } = form;
</script>

<div
  class="flex justify-center items-center flex-col gap-8 p-5 border-l-indigo-500 w-full"
>
  <div class="flex justify-center">
    <div class="flex justify-center gap-2 p-2">
      <h6 class="flex cursor-pointer pr-2 border-r-2 border-stone-900">
        შესვლა
      </h6>
      <h6 class="flex cursor-pointer">რეგისტრაცია</h6>
    </div>
  </div>

  <form class="w-full md:w-2/4" method="POST" use:enhance>
    <Form.Field {form} name="username">
      <Form.Control let:attrs>
        <Form.Label>სახელი:</Form.Label>
        <Input {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.Control let:attrs>
        <Form.Label>მეილი:</Form.Label>
        <Input {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.Control let:attrs>
        <Form.Label>პასვორდი:</Form.Label>
        <Input {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled>გაგხავნა</Form.Button>
  </form>
</div>
