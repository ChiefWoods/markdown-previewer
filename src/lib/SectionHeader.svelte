<script lang="ts">
  export let src: string;
  export let alt: string;
  export let heading: string;
</script>

<img {src} {alt} />
<h2>{heading}</h2>

<style>
  img {
    width: 25px;
    aspect-ratio: 1/1;
  }

  h2 {
    font-family: "Changa", sans-serif;
    font-size: 2.3rem;
  }
</style>
