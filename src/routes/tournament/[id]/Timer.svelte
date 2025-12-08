<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { linear as easing } from "svelte/easing";
  import { fly } from "svelte/transition";

  let countdown = 60;

  let audio;

  let isPaused = false;

  let now = Date.now();
  let end = now + countdown * 1000;

  $: count = Math.round((end - now) / 1000);
  $: h = Math.floor(count / 3600);
  $: m = Math.floor((count - h * 3600) / 60);

  $: s = count - h * 3600 - m * 60;

  function updateTimer() {
    now = Date.now();
  }

  const duration = 1000;

  let interval = null;
  $: if (count === 0) {
    clearInterval(interval);
  }

  let offset = tweened(1, { duration, easing });
  let rotation = tweened(360, { duration, easing });

  $: offset.set(Math.max(count - 0.1, 0) / countdown);
  $: rotation.set((Math.max(count - 0.1, 0) / countdown) * 360);

  function handleStart() {
    now = Date.now();
    end = now + count * 1000;
    interval = setInterval(updateTimer, 0);
    offset.set(Math.max(count - 0.1, 0) / countdown);
    rotation.set((Math.max(count - 0.1, 0) / countdown) * 360);
    isPaused = false;
  }

  function handlePause() {
    offset.set(count / countdown);
    rotation.set((count / countdown) * 360);
    clearInterval(interval);
    isPaused = true;
  }

  function handleReset() {
    clearInterval(interval);
    isPaused = false;

    Promise.all([offset.set(1), rotation.set(360)]).then(() => {
      now = Date.now();
      end = now + countdown * 1000;
    });
  }
</script>

<div class="flex flex-col items-center justify-center w-fit h-fit">
  <audio bind:this={audio}></audio>
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

  <div in:fly={{ y: -10, delay: 120 }}>
    {#if isPaused || !s}
      <button
        class=" bg-blue-700 p-4 rounded-[50%] cursor-pointer"
        on:click={handleStart}
      >
        <svg viewBox="-50 -50 100 100" width="30" height="30">
          <g
            fill="none"
            stroke="white"
            stroke-width="20"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M -25 -40 l 60 40 -60 40z" />
          </g>
        </svg>
      </button>
    {:else}
      <button
        class="bg-red bg-blue-700 p-4 rounded-[50%] cursor-pointer"
        on:click={handlePause}
      >
        <svg viewBox="-50 -50 100 100" width="30" height="30">
          <g
            fill="none"
            stroke="white"
            stroke-width="20"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M -25 -30 v 60 m 50 0 v -60" />
          </g>
        </svg>
      </button>
    {/if}

    <button
      on:click={handleReset}
      class="bg-red bg-blue-700 p-4 rounded-[50%] cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        role="img"
        aria-labelledby="title-reset4"
      >
        <title id="title-reset4">Reset / Refresh</title>
        <path
          fill="white"
          d="M12 5V2L8 6l4 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"
        />
      </svg>
    </button>
  </div>
</div>
