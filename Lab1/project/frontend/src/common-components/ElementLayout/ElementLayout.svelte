<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="container mx-auto">
  {@render children()}
</div>
