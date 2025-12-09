<script>
  import { tweened } from "svelte/motion";
  import { linear as easing } from "svelte/easing";
  import { fly } from "svelte/transition";

  let countdown = 60;
  let audio;
  let isPaused = false;
  let muted = false;

  let now = Date.now();
  let end = now + countdown * 1000;
  let intervalId;

  const duration = 1000;
  let offset = tweened(1, { duration, easing });
  let rotation = tweened(360, { duration, easing });

  $: count = Math.max(Math.ceil((end - now) / 1000), 0);
  $: h = Math.floor(count / 3600);
  $: m = Math.floor((count - h * 3600) / 60);
  $: s = count - h * 3600 - m * 60;
  $: offset.set(count / countdown);
  $: rotation.set((count / countdown) * 360);

  function tick() {
    now = Date.now();

    if (count <= 0 && !isPaused) {
      if (audio && !muted) {
        audio.play();
      }

      const delay = muted ? 1000 : 2900;
      setTimeout(handleReset, delay);
    }
  }

  function handleStart() {
    now = Date.now();
    end = now + count * 1000;
    isPaused = false;

    clearInterval(intervalId);
    intervalId = setInterval(tick, 0);
  }

  function handlePause() {
    isPaused = true;
    clearInterval(intervalId);
  }

  function handleReset() {
    isPaused = false;
    muted = false;
    clearInterval(intervalId);

    offset.set(1);
    rotation.set(360);
    now = Date.now();
    end = now + countdown * 1000;
  }

  function toggleMute() {
    muted = !muted;
  }
</script>

<div class="flex flex-col items-center justify-center w-fit h-fit">
  <audio src="/alarm.mp3" bind:this={audio}></audio>

  <svg in:fly={{ y: -5 }} viewBox="-50 -50 100 100" width="250" height="250">
    <g fill="none" stroke-width="3">
      <circle stroke="hsl(208, 100%, 50%)" r="46" />
      <path
        stroke="#4C0402"
        d="M 0 -46 a 46 46 0 0 0 0 92 46 46 0 0 0 0 -92"
        pathLength="1"
        stroke-dasharray="1"
        stroke-dashoffset={$offset}
      />
    </g>

    <g fill="#4C0402" stroke="none">
      <g transform="rotate({$rotation})">
        <g transform="translate(0 -46)">
          <circle r="4" />
        </g>
      </g>
    </g>

    <g text-anchor="middle" dominant-baseline="baseline" font-size="13">
      <text x="-3" y="6.5">
        {s || countdown}
      </text>
    </g>
  </svg>

  <div in:fly={{ y: -10, delay: 120 }} class="flex gap-3 mt-3">
    {#if isPaused || !s}
      <!-- Start -->
      <button
        class="bg-blue-700 p-4 rounded-full cursor-pointer"
        on:click={handleStart}
      >
        <svg viewBox="-50 -50 100 100" width="30" height="30">
          <path
            d="M -25 -40 l 60 40 -60 40z"
            fill="none"
            stroke="white"
            stroke-width="20"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {:else}
      <!-- Pause -->
      <button
        class="bg-blue-700 p-4 rounded-full cursor-pointer"
        on:click={handlePause}
      >
        <svg viewBox="-50 -50 100 100" width="30" height="30">
          <path
            d="M -25 -30 v 60 m 50 0 v -60"
            fill="none"
            stroke="white"
            stroke-width="20"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {/if}

    <!-- Reset -->
    <button
      on:click={handleReset}
      class="bg-blue-700 p-4 rounded-full cursor-pointer"
    >
      <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
        <path d="M12 5V2L8 6l4 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" />
      </svg>
    </button>

    <button class="bg-blue-700 p-3 rounded-full" on:click={toggleMute}>
      {#if muted}
        <!-- Muted icon -->
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
          <path
            d="M16 7.41L14.59 6 12 8.59 9.41 6 8 7.41 10.59 10 8 12.59 9.41 14 12 11.41 14.59 14 16 12.59 13.41 10z"
          />
          <path d="M5 9v6h4l5 5V4l-5 5H5z" />
        </svg>
      {:else}
        <!-- Unmuted / volume icon -->
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
          <path d="M3 9v6h4l5 5V4L7 9H3z" />
          <path
            d="M14.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"
          />
        </svg>
      {/if}
    </button>
  </div>
</div>
