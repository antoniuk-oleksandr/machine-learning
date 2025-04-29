<script lang="ts">
  type TaskOneSettingsModalElementTextProps = {
    title: string
    description: string
  }

  const { title, description }: TaskOneSettingsModalElementTextProps = $props()
</script>

<div class="flex flex-col">
  <span class="text-gray-800 w-fit font-semibold whitespace-nowrap">{title}</span>
  <span class="text-gray-500 w-fit whitespace-nowrap">{description}</span>
</div>
