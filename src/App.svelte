<script lang="ts">
  import markdown from "./assets/icons/language-markdown.svg";
  import fileCode from "./assets/icons/file-code-outline.svg";
  import fileEye from "./assets/icons/file-eye-outline.svg";
  import copy from "./assets/icons/content-copy.svg";
  import copied from "./assets/icons/file-document-check-outline.svg";
  import download from "./assets/icons/download-outline.svg";
  import Section from "./lib/Section.svelte";
  import Footer from "./lib/Footer.svelte";
  import defaultContent from "./assets/defaultContent.txt";
  import { marked } from "marked";
  import DOMPurify from "dompurify";

  let container: HTMLDivElement = $state() as HTMLDivElement;
  let editor: HTMLTextAreaElement = $state() as HTMLTextAreaElement;
  let preview: HTMLDivElement = $state() as HTMLDivElement;
  let content: string = $state("");
  let scrollableElements: HTMLElement[] = $derived.by(() => [editor, preview]);
  let customRenderer = new marked.Renderer();
  let isScrolling: boolean = false;
  let isCopied: boolean = $state(false);
  let lastClicked: Date;
  const timeoutLimit = 3000;

  customRenderer.link = ({ href, title, text }) => {
    return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  };

  marked.options({
    breaks: true,
    renderer: customRenderer,
  });

  function syncScroll(scrolledEle: HTMLElement, refEle: HTMLElement) {
    if (isScrolling) return;

    isScrolling = true;

    const scrollProgress =
      scrolledEle.scrollTop /
      (scrolledEle.scrollHeight - scrolledEle.clientHeight);
    const targetScroll = Math.round(
      scrollProgress * (refEle.scrollHeight - refEle.clientHeight),
    );

    refEle.scrollTop = targetScroll;

    requestAnimationFrame(() => {
      isScrolling = false;
    });
  }

  function handleScroll(e: Event) {
    const scrolledEle = e.target as HTMLElement;

    if (!isScrolling) {
      scrollableElements
        .filter((ele) => ele !== scrolledEle)
        .forEach((ele) => syncScroll(scrolledEle, ele));
    }
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(content);
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

  function downloadFile() {
    const blob = new Blob([content], { type: "text/markdown" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    Object.assign(a, {
      href,
      download: "preview.md",
    });
    a.click();
  }

  $effect(() => {
    scrollableElements.forEach((ele) => {
      ele.removeEventListener("scroll", handleScroll);
      ele.addEventListener("scroll", handleScroll, { passive: true });
    });

    return () => {
      scrollableElements.forEach((ele) => {
        ele.removeEventListener("scroll", handleScroll);
      });
    };
  });

  fetch(defaultContent)
    .then((res) => res.text())
    .then((data) => {
      content = data;
    });
</script>

<main>
  <div id="title">
    <img src={markdown} alt="Markdown" />
    <h1>Markdown Previewer</h1>
  </div>
  <div id="container" bind:this={container}>
    <Section src={fileCode} alt="Edit File" heading="Editor">
      {#snippet btn()}
        <button onclick={copyText} class:copied={isCopied}>
          <img
            src={isCopied ? copied : copy}
            alt={isCopied ? "Copied Text" : "Copy Text"}
          />
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </button>
      {/snippet}
      {#snippet textContainer()}
        <textarea
          id="editor"
          class="text-container"
          placeholder="Type something here..."
          bind:value={content}
          bind:this={editor}
        ></textarea>
      {/snippet}
    </Section>
    <Section src={fileEye} alt="Preview File" heading="Preview">
      {#snippet btn()}
        <button onclick={downloadFile}>
          <img src={download} alt="Download File" />
          <span>Download</span>
        </button>
      {/snippet}
      {#snippet textContainer()}
        <div id="preview" class="text-container" bind:this={preview}>
          {@html DOMPurify.sanitize(marked.parse(content, { async: false }))}
        </div>
      {/snippet}
    </Section>
  </div>
</main>
<Footer />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Changa:wght@200..800&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap");

  :root {
    --primary: #e9edc9;
    --secondary: #ccd5ae;
    --accent: #fefae0;
    --text-container-scrollbar-track-hover: #efebd2;
    --text-container-scrollbar-thumb: #b5bd99;
    --text-container-scrollbar-thumb-hover: #969c7f;
    --text-container-scrollbar-thumb-active: #7d8266;
    --scrollbar-thickness: 5px;
  }

  :global(body) {
    max-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px;
    background: var(--primary);
    overflow: hidden;
  }

  #title {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  #title > img {
    width: 45px;
    aspect-ratio: 1/1;
  }

  h1 {
    font-family: "Changa", sans-serif;
    font-size: 3.5rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
    text-wrap: nowrap;
  }

  #container {
    display: flex;
    gap: 40px;
    flex: 1;
    overflow: hidden;
  }

  button {
    margin: 5px;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
    padding: 5px 8px;
    font-family: "Changa", sans-serif;
    font-size: 1.5rem;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 5px;

    & > img {
      width: 20px;
      aspect-ratio: 1/1;
    }

    &:hover {
      background: #dfdfdf;
    }
  }

  .copied {
    background: #9ade7b;

    &:hover {
      background: #7fcb5b;
    }
  }

  .text-container {
    background: var(--accent);
    width: 100%;
    flex: 1;
    padding: 10px;
    overflow-y: scroll;
    border: 3px solid var(--secondary);
    scrollbar-width: thin;
    scrollbar-color: var(--text-container-scrollbar-thumb) var(--accent);
  }

  #editor {
    resize: none;
    outline: none;
    font-family: "Roboto Mono", monospace;
    font-size: 1.5rem;
  }

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

  @media (max-width: 1024px) {
    main {
      gap: 20px;
      padding: 20px;
    }

    h1 {
      font-size: 2.5rem;
    }

    #container {
      flex-direction: column;
      max-height: initial !important;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 1.5rem;
    }

    #title > img {
      width: 30px;
    }
  }
</style>
