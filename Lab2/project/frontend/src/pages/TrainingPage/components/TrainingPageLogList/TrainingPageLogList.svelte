<script lang="ts">
  import { onDestroy, tick } from 'svelte'
  import type { EpochData } from '../../../../types/EpochData'
  import { epochsStore } from '../../stores/epochs-store'
  
  let element = $state<HTMLElement | undefined>(undefined)
  let epochs = $state<EpochData[]>([])
  const unsubscribe = epochsStore.subscribe((value) => {
    epochs = value
  })

  $effect(() => {
    if (element && epochs.length) {
      (async () => {
        await tick() 
        element?.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        })
      })()
    }
  })

  onDestroy(() => unsubscribe())
</script>

<div bind:this={element} class="flex flex-col gap-3 max-h-logs overflow-y-auto">
  {#each epochs as item}
    <div>
      <p>Epoch: {item.epoch}</p>
      <p>Accuracy: {item.accuracy}</p>
      <p>Cross entropy: {item.crossEntropy}</p>
    </div>
  {/each}
</div>
