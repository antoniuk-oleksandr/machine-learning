<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="flex items-center justify-center text-2xl gap-3">
  {@render children()}
</div>
