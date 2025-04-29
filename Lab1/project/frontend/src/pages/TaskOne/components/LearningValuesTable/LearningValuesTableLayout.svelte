<script lang="ts">
  import type { LayoutProps } from '../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div Class="w-full whitespace-nowrap flex-1 mb-3">
  {@render children()}
</div>
