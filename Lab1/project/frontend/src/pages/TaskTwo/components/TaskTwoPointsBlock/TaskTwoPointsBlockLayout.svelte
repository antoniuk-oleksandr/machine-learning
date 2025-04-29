<script lang="ts">
  import type { LayoutProps } from '../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="relative flex flex-col gap-3 h-full">
  {@render children()}
</div>
