<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    src,
    alt,
    heading,
    btn,
    textContainer,
  }: {
    src: string;
    alt: string;
    heading: string;
    btn: Snippet;
    textContainer: Snippet;
  } = $props();
</script>

<section>
  <div>
    <img {src} {alt} />
    <h2>{heading}</h2>
    {@render btn()}
  </div>
  {@render textContainer()}
</section>

<style>
  section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--secondary);
    border-radius: 6px 6px 0 0;
    padding: 5px 10px;
  }

  img {
    width: 25px;
    aspect-ratio: 1/1;
  }

  h2 {
    font-family: "Changa", sans-serif;
    font-size: 2.3rem;
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    section {
      flex: initial;
      height: 40vh;
      min-height: 250px;
    }
  }

  @media (max-width: 320px) {
    h2 {
      display: none;
    }
  }
</style>
