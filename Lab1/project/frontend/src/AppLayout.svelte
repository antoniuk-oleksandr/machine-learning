<script lang="ts">
  import type { LayoutProps } from './types/LayoutProps'
  import Header from './common-components/Header/Header.svelte'

  const { children }: LayoutProps = $props()
</script>

<div class="mx-auto max-w-7xl !text-base min-h-svh grow">
  <Header />
  {@render children()}
</div>
