<script lang="js">
  import { page } from "$app/stores";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { superValidate } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import Link from "../../common/link.svelte";

  import { z } from "zod";

  const formSchema = z.object({
    password: z
      .string()
      .min(6, "პასვორდი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან"),
    repeat: z.string().min(6, "პასვორდი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან"),
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
      const token = $page.url.searchParams.get("token");

      if ($formData.password !== $formData.repeat) {
        errors["repeat"] = "პასვორდი არ ემთხვევა";
        return;
      }

      try {
        errors = {};

        fetch("http://localhost:8080/api/public/reset-password", {
          method: "POST",
          ["Content-type"]: "application/json",
          body: JSON.stringify({
            password: $formData.password,
            token,
          }),
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
</script>

<div class="flex justify-center items-center flex-col gap-8 p-5 w-full">
  <form on:submit={handleSubmit} class="w-full md:w-2/4">
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>პასვორდი</Form.Label>
        <Input
          required
          type="password"
          {...attrs}
          bind:value={$formData.password}
        />
      </Form.Control>
      <Form.FieldErrors
        ><p class="p-0 h-5">
          {errors.hasOwnProperty("password") ? errors["password"] : ""}
        </p></Form.FieldErrors
      >
    </Form.Field>

    <Form.Field {form} name="repeat">
      <Form.Control let:attrs>
        <Form.Label>გაიმეორეთ პასვორდი</Form.Label>
        <Input
          type="password"
          required
          {...attrs}
          bind:value={$formData.repeat}
        />
      </Form.Control>
      <Form.FieldErrors
        ><p class="p-0 h-5">
          {errors.hasOwnProperty("repeat") ? errors["repeat"] : ""}
        </p></Form.FieldErrors
      >
    </Form.Field>

    <Form.Button class="mt-6" type="submit">გაგზავნა</Form.Button>
  </form>
</div>
