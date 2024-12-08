<script lang="js">
  import { goto } from "$app/navigation";

  import { publicApi } from "$lib/api";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";

  import { z } from "zod";
  import Toast, { addToast } from "$lib/components/toast/Toast.svelte";
  import { PUBLIC_BASE_URL } from "$env/static/public";

  const formSchema = z.object({
    name: z.string().min(2, "სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან"),
    email: z.string().email("არასწორი მეილ მისამართი"),
    password: z
      .string()
      .min(6, "პასვორდი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან"),
  });

  export let data = {};

  const form = superForm(data);

  export let errors = {};
  let isSubmitting = false;

  const { form: formData, errors: formErrors } = form;

  async function handleSubmit(event) {
    event.preventDefault();

    const validationResult = formSchema.safeParse($formData);

    if (!validationResult.success) {
      errors = validationResult.error.formErrors.fieldErrors;
    } else {
      try {
        errors = {};
        isSubmitting = true;
        const data = await publicApi.post(
          PUBLIC_BASE_URL + "/public/register",
          $formData
        );
        localStorage.setItem("token", data.token);
        loginHelper(data.user);
        goto("/");
      } catch (error) {
        addToast(error?.error, "error");
        console.error("error", error);
      } finally {
        isSubmitting = false;
      }
    }
  }
</script>

<Toast />

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
      <Input
        type="password"
        required
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

  <Form.Button class="mt-6" type="submit" disabled={isSubmitting}>
    {#if isSubmitting}
      რეგისტრაცია...
    {:else}
      რეგისტრაცია
    {/if}</Form.Button
  >
</form>
