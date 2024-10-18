<script lang="js">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { superValidate } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";

  import { z } from "zod";

  const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(5).email("Invalid email address"),
    password: z.string().min(6),
  });

  export let data = {
    name: "",
    email: "",
    password: "",
  };

  const form = superForm(data);

  export let errors = {};

  const { form: formData } = form;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Convert the FormData to a plain object
    const data = Object.fromEntries(formData.entries());

    // Validate the data using Zod (on client-side)
    const validationResult = formSchema.safeParse(data);

    if (!validationResult.success) {
      // Set errors if validation fails

      console.log(validationResult.error.formErrors.fieldErrors);
      errors = validationResult.error.formErrors.fieldErrors;
    }
  }
</script>

<form on:submit={handleSubmit} class="w-full md:w-2/4">
  <Form.Field {form} name="name">
    <Form.Control let:attrs>
      <Form.Label>სახელი</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors
      >{errors.hasOwnProperty("name") ? errors["name"] : ""}</Form.FieldErrors
    >
  </Form.Field>

  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>მეილი</Form.Label>
      <Input type="email" {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.FieldErrors
      >{errors.hasOwnProperty("email") ? errors["email"] : ""}</Form.FieldErrors
    >
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>პასვორდი</Form.Label>
      <Input {...attrs} bind:value={$formData.password} />
    </Form.Control>
    <Form.FieldErrors
      >{errors.hasOwnProperty("password")
        ? errors["password"]
        : ""}</Form.FieldErrors
    >
  </Form.Field>

  <Form.Button type="submit">გაგზავნა</Form.Button>
</form>
