<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="px-6 pt-6 gap-6 flex flex-col md:flex-row items-center justify-between">
  {@render children()}
</div>
