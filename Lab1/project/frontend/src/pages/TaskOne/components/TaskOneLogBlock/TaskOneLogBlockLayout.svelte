<script lang="ts">
  import type { LayoutProps } from '../../../../types/LayoutProps'

  type TaskOneLogBlockLayoutProps = LayoutProps & {
    blockElement: HTMLDivElement | undefined
  }

  let { children, blockElement = $bindable() }: TaskOneLogBlockLayoutProps = $props()
</script>

<div bind:this={blockElement} class="flex h-task-one-logs overflow-auto flex-col gap-6">
  {@render children()}
</div>
