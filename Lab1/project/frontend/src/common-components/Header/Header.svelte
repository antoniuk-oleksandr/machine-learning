<script lang="ts">
  import { Select, Button } from 'flowbite-svelte'
  import { handleHeaderSettingsButtonClick, handleSelectTaskChange } from './handlers'
  import { AdjustmentsHorizontalOutline } from 'flowbite-svelte-icons'
  import HeaderLayout from './HeaderLayout.svelte'
  import { onMount } from 'svelte'
  import { useRouter } from 'svelte-routing'
  import { get } from 'svelte/store'

  let selected = $state<undefined | string>()

  onMount(() => {
    const store = useRouter().activeRoute
    const { uri } = get(store)

    if (uri === '/task-one') selected = 'task1'
    else if (uri === '/task-two') selected = 'task2'
    else selected = 'task1'
  })

  let options = [
    { value: 'task1', name: 'Task One' },
    { value: 'task2', name: 'Task Two' },
  ]
</script>

{#if selected}
  <HeaderLayout>
    <Select
      onchange={() => selected && handleSelectTaskChange(selected)}
      class="w-full h-12 md:w-fit"
      items={options}
      bind:value={selected}
    />
    {#if selected === 'task1'}
      <Button
        onclick={() => selected && handleHeaderSettingsButtonClick(selected)}
        size="lg"
        color="light"
        class="text-base h-12 flex gap-1"
      >
        <AdjustmentsHorizontalOutline />
        <span>Settings</span>
      </Button>
    {/if}
  </HeaderLayout>
{/if}
