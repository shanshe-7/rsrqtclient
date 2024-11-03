<script lang="js">
  import { goto } from "$app/navigation"; // Use 'goto' instead of 'navigate' for client-side routing

  import { publicApi } from "./../../lib/api/index.js";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { superValidate } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";

  import { z } from "zod";

  const formSchema = z.object({
    name: z.string().min(2, "სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან"), // Required string
    email: z.string().email("არასწორი მეილ მისამართი"), // Required valid email
    password: z
      .string()
      .min(6, "პასვორდი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან"),
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
        await publicApi.post(
          "http://localhost:8080/api/public/register",
          $formData
        );
        goto("/");
      } catch (error) {
        console.log("error", error);
      }
    }
    console.log(errors);
  }
</script>

<form on:submit={handleSubmit} class="w-full md:w-2/4">
  <Form.Field {form} name="name">
    <Form.Control let:attrs>
      <Form.Label>სახელი</Form.Label>
      <Input required {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors
      ><p class="p-0 h-5">
        {errors.hasOwnProperty("name") ? errors["name"] : ""}
      </p></Form.FieldErrors
    >
  </Form.Field>

  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>მეილი</Form.Label>
      <Input required type="email" {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.FieldErrors
      ><p class="p-0 h-5">
        {errors.hasOwnProperty("email") ? errors["email"] : ""}
      </p></Form.FieldErrors
    >
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>პასვორდი</Form.Label>
      <Input required {...attrs} bind:value={$formData.password} />
    </Form.Control>
    <Form.FieldErrors
      ><p class="p-0 h-5">
        {errors.hasOwnProperty("password") ? errors["password"] : ""}
      </p></Form.FieldErrors
    >
  </Form.Field>

  <Form.Button class="mt-6" type="submit">რეგისტრაცია</Form.Button>
</form>
