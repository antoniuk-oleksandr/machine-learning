<script lang="ts">
  type ErrorParagraphProps = {
    error?: string | null
    showErrorMessage?: boolean
    styles?: string
  }

  const { error, showErrorMessage = true, styles }: ErrorParagraphProps = $props()
</script>

{#if showErrorMessage && typeof error === 'string' && error.length > 0}
  <p class="{styles} text-red-500 text-base">{error}</p>
{/if}
