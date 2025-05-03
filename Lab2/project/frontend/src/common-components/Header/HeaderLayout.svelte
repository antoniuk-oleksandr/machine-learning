<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>


<div class="w-full flex justify-between">
  {@render children()}
</div>
