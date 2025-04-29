<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="grid grid-cols-3 gap-6">
  {@render children()}
</div>
