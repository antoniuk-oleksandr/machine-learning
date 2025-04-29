<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="grid grid-cols-1 grow flex-1 md:grid-cols-2 gap-6 p-6 min-h-app-body">
  {@render children()}
</div>
