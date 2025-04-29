<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'

  const { children }: LayoutProps = $props()
</script>

<div
  class="opacity-0 duration-200 transition-opacity group-hover:opacity-100 absolute text-red-500 my-4 cursor-pointer flex item right-4"
>
  {@render children()}
</div>
