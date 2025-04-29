<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="flex flex-col divide-gray-200 divide-y w-full max-h-variables overflow-auto">
  {@render children()}
</div>
