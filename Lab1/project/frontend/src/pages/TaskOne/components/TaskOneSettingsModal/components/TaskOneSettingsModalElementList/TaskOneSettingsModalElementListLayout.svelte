<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div class="flex flex-col gap-3">
  {@render children()}
</div>
