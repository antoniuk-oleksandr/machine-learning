<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  type TaskOneTestResultModalIconLayoutProps = LayoutProps & {
    success: boolean
  }

  const { children, success }: TaskOneTestResultModalIconLayoutProps = $props()
</script>

<div
  class="flex justify-center items-center h-12 w-12 rounded-full {success
    ? 'bg-green-50'
    : 'bg-red-50'}"
>
  {@render children()}
</div>
