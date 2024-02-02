<script lang="ts">
  import { marked } from "marked";
  import { contents } from "./stores.js";

  export let preview;

  const customRenderer = new marked.Renderer();

  customRenderer.paragraph = (text: string) => {
    const processed = text.replace(/\\r|\\n/g, "<br>");
    return `<p>${processed}</p>`;
  };

  customRenderer.link = (href, title, text) => {
    return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  };

  marked.options({
    breaks: true,
    renderer: customRenderer,
  });
</script>

<div id="preview" class="text-container" bind:this={preview}>
  {@html marked.parse($contents)}
</div>

<style>
  @import "./TextContainer.css";

  #preview {
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(#preview h1) {
    font-size: 4rem;
  }

  :global(#preview h2) {
    font-size: 3.5rem;
  }

  :global(#preview h3) {
    font-size: 3rem;
  }

  :global(#preview h4) {
    font-size: 2.5rem;
  }

  :global(#preview h5) {
    font-size: 2rem;
  }

  :global(#preview h6) {
    font-size: 1.5rem;
  }

  :global(#preview p) {
    font-size: 1.5rem;
  }

  :global(#preview blockquote) {
    font-size: 1.5rem;
    border-left: 10px solid var(--secondary);
    padding: 10px;
    background: var(--primary);
  }

  :global(#preview ol, #preview ul) {
    font-size: 1.5rem;
    margin-left: 20px;
  }

  :global(#preview li) {
    margin: 10px 0;
  }

  :global(#preview pre) {
    font-size: 1.5rem;
    background: var(--secondary);
    padding: 10px;
    border-radius: 6px;
  }
</style>
