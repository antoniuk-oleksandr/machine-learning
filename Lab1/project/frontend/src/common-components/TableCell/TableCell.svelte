<script lang="ts">
  import type { LayoutProps } from '../../types/LayoutProps'

  type TableCellProps = LayoutProps & {
    styles?: string,
  }

  const { children, styles }: TableCellProps = $props()
</script>

<div class="{styles} py-4 px-6 font-medium">
  {@render children()}
</div>
