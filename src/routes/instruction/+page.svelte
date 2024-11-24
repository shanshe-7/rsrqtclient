<script lang="js">
  import { publicApi } from "$lib/api";

  let isDownloading = false;

  async function handleDownload(event) {
    event.preventDefault();

    try {
      isDownloading = true;

      const response = await publicApi.get(
        "http://localhost:8080/api/public/download/example",
        {
          isFile: true,
        }
      );

      const url = window.URL.createObjectURL(response);

      const link = document.createElement("a");
      link.href = url;

      const filename = "მაგალითი.docx";

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error", error);
    } finally {
      isDownloading = false;
    }
  }
</script>

<div
  class="flex relative justify-center items-center flex-col gap-8 p-5 border-l-indigo-500 w-full"
>
  ინსტრუქცია

  <button on:click={handleDownload} disabled={isDownloading}>
    {#if isDownloading}
      გადმოწერა...
    {:else}
      გადმოწერა
    {/if}
  </button>
</div>
