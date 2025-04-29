<script lang="ts">
  import type { LayoutProps } from '../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="flex justify-between items-center">
  {@render children()}
</div>
