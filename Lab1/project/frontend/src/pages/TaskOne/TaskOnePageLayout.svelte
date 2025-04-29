<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="flex-1 h-full">
  {@render children()}
</div>
