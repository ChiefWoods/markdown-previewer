<script lang="ts">
  import { contents } from "./stores.js";

  export let editor;
</script>

<textarea
  id="editor"
  class="text-container"
  placeholder="Type something here..."
  bind:value={$contents}
  bind:this={editor}
></textarea>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
  @import "./TextContainer.css";

  #editor {
    resize: none;
    outline: none;
    font-family: "Roboto Mono", monospace;
    font-size: 1.5rem;
  }
</style>
