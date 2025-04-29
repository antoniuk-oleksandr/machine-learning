<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="grid !font-semibold grid-cols-3 bg-gray-200">
  {@render children()}
</div>
