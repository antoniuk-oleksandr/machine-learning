<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { LayoutProps } from './types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div transition:fade={{ duration: 500 }}>
  {@render children()}
</div>
