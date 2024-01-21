<script lang="ts">
  import copy from "../assets/icons/content-copy.svg";
  import copied from "../assets/icons/file-document-check-outline.svg";
  import { contents } from "./stores.js";

  export let id: string;
  export let src: string;
  export let alt: string;
  export let spanText: string;
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
    src = copied;
    alt = "Copied Text";
    spanText = "Copied!";
    lastClicked = new Date();

    setTimeout(() => {
      if (new Date().getTime() - lastClicked.getTime() > timeoutLimit) {
        isCopied = false;
        src = copy;
        alt = "Copy Text";
        spanText = "Copy";
      }
    }, timeoutLimit);
  }
</script>

<button {id} on:click={copyText} class:copied={isCopied}>
  <img {src} {alt} />
  <span>{spanText}</span>
</button>

<style>
  @import "./ActionBtn.css";
</style>
