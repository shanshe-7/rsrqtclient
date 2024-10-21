<script lang="js">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { superValidate } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import Link from "../../common/link.svelte";

  import { z } from "zod";

  const formSchema = z.object({
    email: z.string().email("მეილის არასწორი მისამართი"), // Required valid email
  });

  export let data = {};

  const form = superForm(data);

  export let errors = {};

  const { form: formData, errors: formErrors } = form;

  async function handleSubmit(event) {
    event.preventDefault();

    const validationResult = formSchema.safeParse($formData);

    if (!validationResult.success) {
      errors = validationResult.error.formErrors.fieldErrors;
    } else {
      errors = {};
      try {
        fetch("http://localhost:8080/api/public/forget-password", {
          method: "POST",
          ["Content-type"]: "application/json",
          body: JSON.stringify($formData),
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
</script>

<div class="flex justify-center items-center flex-col gap-8 p-5 w-full">
  <form on:submit={handleSubmit} class="w-full md:w-2/4">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>მოქმედი მეილი</Form.Label>
        <Input required type="email" {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors
        ><p class="p-0 h-5">
          {errors.hasOwnProperty("email") ? errors["email"] : ""}
        </p></Form.FieldErrors
      >
    </Form.Field>

    <Form.Button class="mt-6" type="submit">გაგზავნა</Form.Button>
  </form>
</div>
