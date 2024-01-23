<script lang="ts">
  import markdown from "./assets/icons/language-markdown.svg";
  import fileCode from "./assets/icons/file-code-outline.svg";
  import fileEye from "./assets/icons/file-eye-outline.svg";
  import Section from "./lib/Section.svelte";
  import SectionHeader from "./lib/SectionHeader.svelte";
  import CopyBtn from "./lib/CopyBtn.svelte";
  import Editor from "./lib/Editor.svelte";
  import DownloadBtn from "./lib/DownloadBtn.svelte";
  import Preview from "./lib/Preview.svelte";
  import Footer from "./lib/Footer.svelte";
  import { onMount } from "svelte";

  const scrollableElements: HTMLElement[] = [];

  function syncScroll(scrolledEle: HTMLElement, otherEle: HTMLElement) {
    const scrollTopPercent =
      scrolledEle.scrollTop /
      (scrolledEle.scrollHeight - scrolledEle.clientHeight);
    const top =
      scrollTopPercent * (otherEle.scrollHeight - otherEle.clientHeight);

    otherEle.scrollTop = top;
  }

  function handleScroll(e: Event) {
    const scrolledEle = e.target as HTMLElement;
    scrollableElements
      .filter((ele) => ele !== scrolledEle)
      .forEach((ele) => {
        ele.removeEventListener("scroll", handleScroll);
        syncScroll(scrolledEle, ele);
        window.requestAnimationFrame(() => {
          ele.addEventListener("scroll", handleScroll);
        });
      });
  }

  onMount(() => {
    scrollableElements.push(
      ...(Array.from(
        document.querySelectorAll(".text-container")
      ) as HTMLElement[])
    );

    scrollableElements.forEach((ele) => {
      ele.addEventListener("scroll", handleScroll);
    });
  });
</script>

<main>
  <div id="title">
    <img src={markdown} alt="Markdown" />
    <h1>Markdown Previewer</h1>
  </div>
  <div id="container">
    <Section>
      <SectionHeader
        slot="section-header"
        src={fileCode}
        alt="Edit File"
        heading="Editor"
      />
      <CopyBtn slot="action-btn" />
      <Editor slot="text-container" />
    </Section>
    <Section>
      <SectionHeader
        slot="section-header"
        src={fileEye}
        alt="Preview File"
        heading="Preview"
      />
      <DownloadBtn slot="action-btn" />
      <Preview slot="text-container" />
    </Section>
  </div>
</main>
<Footer />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Changa&display=swap");

  :root {
    --primary: #e9edc9;
    --secondary: #ccd5ae;
    --accent: #fefae0;
    --text-container-scrollbar-track-hover: #efebd2;
    --text-container-scrollbar-thumb: #b5bd99;
    --text-container-scrollbar-thumb-hover: #969c7f;
    --text-container-scrollbar-thumb-active: #7d8266;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px;
    background: var(--primary);
  }

  #title {
    display: flex;
    gap: 20px;
  }

  img {
    width: 45px;
    aspect-ratio: 1/1;
  }

  h1 {
    font-family: "Changa", sans-serif;
    font-size: 3.5rem;
    text-align: center;
  }

  #container {
    display: flex;
    gap: 40px;
    flex: 1;
    max-height: 350px;
  }

  @media (max-width: 1000px) {
    #container {
      flex-direction: column;
      max-height: initial;
    }
  }
</style>
