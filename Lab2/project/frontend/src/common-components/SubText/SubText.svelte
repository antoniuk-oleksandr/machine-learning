<script lang="ts">
  type SubTextProps = {
    text?: string
  }

  const { text }: SubTextProps = $props()
</script>

{#if text !== undefined}
  <p class="text-sm text-gray-500">{text}</p>
{/if}
