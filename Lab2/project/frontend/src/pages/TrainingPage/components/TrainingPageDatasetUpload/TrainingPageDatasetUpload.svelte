<script lang="ts">
  import { Fileupload, Label } from 'flowbite-svelte'
  import { handleFileSelect } from '../../handlers'
  import SubText from '../../../../common-components/SubText/SubText.svelte'
  import TrainingPageDatasetUploadLayout from './TrainingPageDatasetUploadLayout.svelte'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { TrainingFormData } from '../../../../types/TrainingFormData'
  import ErrorParagraph from '../../../../common-components/ErrorParagraph/ErrorParagraph.svelte'

  type TrainingPageDatasetUploadProps = {
    error: string | undefined
  }

  const { error }: TrainingPageDatasetUploadProps = $props()
  let isErrorPresent = $derived(typeof error === 'string' && error.length > 0)

  let formDataStore = getContext<Writable<TrainingFormData>>('formDataStore')

  let files = $state<FileList | undefined>()
  $effect(() => {
    if (!files) return

    handleFileSelect(files, formDataStore)
  })
</script>

<TrainingPageDatasetUploadLayout>
  <Label>Upload file</Label>
  <Fileupload
    inputClass="{isErrorPresent ? 'border-red-500' : ''} py-0"
    bind:files
    accept=".json"
  />
  <SubText text="Only JSON files with learning values" />
  <ErrorParagraph {error} />
</TrainingPageDatasetUploadLayout>
