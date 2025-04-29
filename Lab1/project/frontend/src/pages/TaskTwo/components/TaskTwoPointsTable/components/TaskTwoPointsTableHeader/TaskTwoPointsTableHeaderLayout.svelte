<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="flex grid-cols-2 !font-semibold bg-gray-200">
  {@render children()}
</div>
