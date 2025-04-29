<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="whitespace-nowrap flex justify-between items-center">
  {@render children()}
</div>
