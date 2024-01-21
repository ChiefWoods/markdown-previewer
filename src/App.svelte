<script lang="ts">
  import markdown from "./assets/icons/language-markdown.svg";
  import fileCode from "./assets/icons/file-code-outline.svg";
  import copy from "./assets/icons/content-copy.svg";
  import fileEye from "./assets/icons/file-eye-outline.svg";
  import download from "./assets/icons/download-outline.svg";
  import Section from "./lib/Section.svelte";
  import SectionHeader from "./lib/SectionHeader.svelte";
  import CopyBtn from "./lib/CopyBtn.svelte";
  import Editor from "./lib/Editor.svelte";
  import DownloadBtn from "./lib/DownloadBtn.svelte";
  import Preview from "./lib/Preview.svelte";
  import Footer from "./lib/Footer.svelte";
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
      <CopyBtn
        slot="action-btn"
        id="copy"
        src={copy}
        alt="Copy Text"
        spanText="Copy"
      />
      <Editor slot="text-container" />
    </Section>
    <Section>
      <SectionHeader
        slot="section-header"
        src={fileEye}
        alt="Preview File"
        heading="Preview"
      />
      <DownloadBtn
        slot="action-btn"
        id="download"
        src={download}
        alt="Download File"
        spanText="Download"
      />
      <Preview slot="text-container" />
    </Section>
  </div>
</main>
<Footer />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Changa&display=swap");

  :root {
    --green-mist: #ccd5ae;
    --chrome-white: #e9edc9;
    --off-yellow: #fefae0;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px;
    background: var(--chrome-white);
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
  }
</style>
