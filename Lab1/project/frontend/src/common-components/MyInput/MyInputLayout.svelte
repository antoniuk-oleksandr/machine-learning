<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  type MyInputLayoutProps = LayoutProps & {
    className?: string
  }

  const { children, className }: MyInputLayoutProps = $props()
</script>

<div class="{className} flex flex-col gap-1">
  {@render children()}
</div>
