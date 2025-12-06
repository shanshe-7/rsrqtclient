<script lang="js">
  import { authStore } from "$lib/auth";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import Link from "../../common/link.svelte";
  import { page } from "$app/stores";
  import { PUBLIC_BASE_URL } from "$env/static/public";

  import { z } from "zod";
  import { api } from "$lib/api";
  import Toast, { addToast } from "$lib/components/toast/Toast.svelte";
  import { goto } from "$app/navigation";

  const MB = (size) => {
    return size * 1024 * 1024;
  };

  const formSchema = z.object({
    file: z
      .custom()
      .refine((file) => file instanceof File, {
        message: "Must be a valid file",
      })
      .refine((file) => file.size <= MB(10), {
        message: "File must be less than 10MB",
      })
      .refine(
        (file) =>
          [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type),
        {
          message: "File must be a valid Word document",
        }
      ),
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

        const fd = new FormData();
        fd.append("file", $formData.file);

        await api.postNonJson(PUBLIC_BASE_URL + "/protected/file", fd);
        addToast("ტურნირი წარმატებით აიტვირთა", "success", 800);

        setTimeout(() => {
          goto("/");
        }, 800);
      } catch (error) {
        addToast(error?.error || error?.statusText, "error");
        console.error("error", error);
      } finally {
        errors = {};
        isSubmitting = false;
      }
    }
  }
</script>

<Toast />

<div
  class="flex relative justify-center items-center flex-col gap-8 p-5 border-l-indigo-500 w-full"
>
  <div class="flex justify-center align-middle mt-8 p-5 text-center text-xl">
    <p>ტურნირის შექმნა</p>
  </div>

  <p class="text-lg w-full md:w-2/3 align-middle text-center">
    <strong
      >ფაილის ასატვირთად საჭიროა ფაილს ჰქონდეს სპეციალური ფორმატი. ამიტომ
      ატვირთვამდე გთხოვთ გაეცნოთ</strong
    >
    <Link href="/instruction" textColor="text-blue-700">ინსტრუქციას</Link>
  </p>

  <form on:submit={handleSubmit} class="w-full md:w-2/4">
    <Form.Field {form} name="file">
      <Form.Control class="cursor-pointer" let:attrs>
        <Form.Label class="cursor-pointer">ატვირთეთ ფაილი</Form.Label>
        <Input
          on:change={(event) => {
            const file = event.target.files[0];
            $formData.file = file;
          }}
          required
          id="file"
          name="file"
          type="file"
          class="cursor-pointer"
          style={!$formData.file && "font-size: 0px"}
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          {...attrs}
        />
      </Form.Control>
      <Form.FieldErrors
        ><p class="p-0 h-5">
          {errors.hasOwnProperty("file") ? errors["file"] : ""}
        </p></Form.FieldErrors
      >
    </Form.Field>

    <Form.Button class="mt-6" type="submit" disabled={isSubmitting}>
      {#if isSubmitting}
        გაგზავნა...
      {:else}
        გაგზავნა
      {/if}</Form.Button
    >
  </form>
</div>
