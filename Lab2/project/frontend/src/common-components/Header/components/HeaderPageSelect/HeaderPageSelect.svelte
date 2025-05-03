<script lang="ts">
  import { Select } from 'flowbite-svelte'
  import { navigate, useRouter } from 'svelte-routing'

  let selected = $state<'training' | 'testing' | undefined>()
  let items = [
    { value: 'training', name: 'Training' },
    { value: 'testing', name: 'Testing' },
  ]

  useRouter().activeRoute.subscribe((route) => {
    if (!route) return

    if (route.uri === '/testing') selected = 'testing'
    else selected = 'training'
  })
</script>

<Select onchange={() => navigate(`/${selected}`)} class="w-40" {items} bind:value={selected} />
