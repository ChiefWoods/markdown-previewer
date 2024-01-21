<script lang="ts">
  import copy from "../assets/icons/content-copy.svg";
  import copied from "../assets/icons/file-document-check-outline.svg";
  import { contents } from "./stores.js";

  let isCopied: boolean = false;
  let lastClicked: Date;

  const timeoutLimit = 5000;

  async function copyText() {
    try {
      await navigator.clipboard.writeText($contents);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }

    isCopied = true;
    lastClicked = new Date();

    setTimeout(() => {
      if (new Date().getTime() - lastClicked.getTime() > timeoutLimit) {
        isCopied = false;
      }
    }, timeoutLimit);
  }
</script>

<button on:click={copyText} class:copied={isCopied}>
  <img src={isCopied ? copied : copy} alt={isCopied ? "Copied Text" : "Copy Text"} />
  <span>{isCopied ? "Copied!" : "Copy"}</span>
</button>

<style>
  @import "./ActionBtn.css";
</style>
