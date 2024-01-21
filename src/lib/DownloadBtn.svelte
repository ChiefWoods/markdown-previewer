<script lang="ts">
  import { contents } from "./stores.js";

  export let id: string;
  export let src: string;
  export let alt: string;
  export let spanText: string;

  function downloadFile() {
    const blob = new Blob([$contents], { type: "text/markdown" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);

    a.href = url;
    a.download = "preview.md";
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
</script>

<button {id} on:click={downloadFile}>
  <img {src} {alt} />
  <span>{spanText}</span>
</button>

<style>
  @import "./ActionBtn.css";
</style>
