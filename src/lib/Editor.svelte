<script lang="ts">
  import { contents } from "./stores.js";
</script>

<textarea
  id="editor"
  class="text-container"
  placeholder="Type something here..."
  bind:value={$contents}
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
