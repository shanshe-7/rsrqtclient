<script>
  export let size = 24;
  export let color = "blue";
  export let cursorState = "default";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  aria-label="Delete"
  style={`cursor: ${cursorState}`}
>
  <!-- Trash can body -->
  <path
    d="M6 7v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6z"
    fill="none"
    stroke={color}
    stroke-width="2"
  />

  <path d="M4 5h16" stroke={color} stroke-width="2" stroke-linecap="round" />
  <path d="M10 3h4" stroke={color} stroke-width="2" stroke-linecap="round" />
  <path
    d="M10 11v6M14 11v6"
    stroke={color}
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>
