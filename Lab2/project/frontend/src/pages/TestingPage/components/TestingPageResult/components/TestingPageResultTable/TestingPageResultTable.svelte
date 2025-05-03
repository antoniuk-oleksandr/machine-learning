<script lang="ts">
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBodyRow,
    TableBodyCell,
    TableBody,
  } from 'flowbite-svelte'

  type TestingPageResultTableProps = {
    softmax: number[],
    predictedIndex: number,
  }

  const { softmax, predictedIndex }: TestingPageResultTableProps = $props()
</script>

<Table>
  <TableHead>
    <TableHeadCell class="text-base">Number</TableHeadCell>
    <TableHeadCell class="text-base">Probability</TableHeadCell>
    <TableHeadCell class="text-base">Confidence</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each softmax as item, index}
      <TableBodyRow class={`text-base ${index === predictedIndex ? 'bg-primary-100 ' : ''}`}>
        <TableBodyCell class="text-base">{index}</TableBodyCell>
        <TableBodyCell class="text-base">{item}</TableBodyCell>
        <TableBodyCell class="text-base">{(item * 100).toFixed(2)}%</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
