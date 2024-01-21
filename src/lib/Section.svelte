<section>
  <div>
    <slot name="section-header" />
    <slot name="action-btn" />
  </div>
  <slot name="text-container" />
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
    background: var(--green-mist);
    border-radius: 6px 6px 0 0;
    padding: 5px 10px;
  }
</style>
