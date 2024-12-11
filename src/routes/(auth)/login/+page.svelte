<script lang="js">
  import { authStore } from "$lib/auth";
  import Login from "./Login.svelte";
  import Register from "./Register.svelte";
  import Link from "../../../common/link.svelte";

  let state = "login";

  function handleLoginClick() {
    if (state === "login") return;
    state = "login";
  }

  function handleRegisterClick() {
    if (state === "register") return;
    state = "register";
  }

  $: isRegister = state === "register";
  $: isLogin = state === "login";
</script>

<div
  class="flex relative justify-center items-center flex-col gap-8 p-5 border-l-indigo-500 w-full"
>
  <div class="flex justify-center items-center flex-col gap-5">
    <div class="flex justify-center gap-2 p-2">
      <button
        on:click={handleLoginClick}
        class={`flex cursor-pointer pr-2 border-r-2 border-stone-900   ${!isLogin ? "text-gray-950" : "cursor-auto text-green-700"}`}
      >
        შესვლა
      </button>
      <button
        on:click={handleRegisterClick}
        class={`flex cursor-pointer  ${!isRegister ? "text-gray-950" : "cursor-auto text-green-700"}`}
        >რეგისტრაცია</button
      >
    </div>

    <div class="relative sm:absolute sm:right-6 text-xs">
      <Link href="/forgot-password">დაგავიწყდა პაროლი?</Link>
    </div>
  </div>
  {#if isLogin}
    <Login />
  {/if}

  {#if isRegister}
    <Register />
  {/if}
</div>
