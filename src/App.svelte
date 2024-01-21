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
    --text-container-scrollbar: #b5bd99;
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
