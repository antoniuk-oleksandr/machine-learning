<script lang="ts">
  import { Label, Fileupload } from 'flowbite-svelte'
  import ErrorParagraph from '../../../../common-components/ErrorParagraph/ErrorParagraph.svelte'
  import SubText from '../../../../common-components/SubText/SubText.svelte'
  import TrainingPageDatasetUploadLayout from '../../../TrainingPage/components/TrainingPageDatasetUpload/TrainingPageDatasetUploadLayout.svelte'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { TestingFormData } from '../../../../types/TestingFormData'

  type TestingPageWeightsUploadProps = {
    error?: string
  }

  const { error }: TestingPageWeightsUploadProps = $props()
  let isErrorPresent = typeof error === 'string' && error.length > 0

  let formDataStore = getContext<Writable<TestingFormData>>('formDataStore')

  let files = $state<FileList | undefined>()
  $effect(() => {
    formDataStore.update((prev) => {
      if (!files) return prev
      return { ...prev, weightsFile: files[0] }
    })
  })
</script>

<TrainingPageDatasetUploadLayout>
  <Label>Upload file</Label>
  <Fileupload
    inputClass="{isErrorPresent ? 'border-red-500' : ''} py-0"
    bind:files
    accept=".json"
  />
  <SubText text="Only JSON files with weights values" />
  <ErrorParagraph {error} />
</TrainingPageDatasetUploadLayout>
