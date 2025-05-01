<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="h-full grow flex flex-col-reverse md:grid md:grid-cols-2 gap-6">
  {@render children()}
</div>
