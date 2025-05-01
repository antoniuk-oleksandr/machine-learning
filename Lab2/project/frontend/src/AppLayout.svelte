<script lang="ts">
  import type { LayoutProps } from './types/LayoutProps'
  import Header from './common-components/Header/Header.svelte'

  const { children }: LayoutProps = $props()
</script>

<div class="max-w-7xl mx-auto min-h-svh flex flex-col gap-6 p-6">
  <Header />
  {@render children()}
</div>
