<script lang="ts">
  import type { LearningValue } from '../../../../types/LearningValue'
  import LearningValuesTableBody from './components/LearningValuesTableBody/LearningValuesTableBody.svelte'
  import LearningValuesTableHeader from './components/LearningValuesTableHeader/LearningValuesTableHeader.svelte'
  import LearningValuesTableLayout from './LearningValuesTableLayout.svelte'

  type LearningValuesTable = {
    learningValues: LearningValue[]
  }

  const props: LearningValuesTable = $props()
</script>

<LearningValuesTableLayout>
  <LearningValuesTableHeader />
  <LearningValuesTableBody {...props} />
</LearningValuesTableLayout>
