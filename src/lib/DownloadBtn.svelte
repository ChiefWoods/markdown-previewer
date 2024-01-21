<script lang="ts">
  import download from "../assets/icons/download-outline.svg";
  import { contents } from "./stores.js";

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

<button on:click={downloadFile}>
  <img src={download} alt="Download File" />
  <span>Download</span>
</button>

<style>
  @import "./ActionBtn.css";
</style>
