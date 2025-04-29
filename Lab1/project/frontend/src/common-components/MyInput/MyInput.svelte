<script lang="ts">
  import { Input, Label } from 'flowbite-svelte'
  import MyInputLayout from './MyInputLayout.svelte'
  import type { MyInputProps } from '../../types/MyInputProps'
  import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.svelte'

  const {
    name,
    id,
    placeholder,
    label,
    error,
    class: className,
    type = 'text',
    showErrorMessage = true,
  }: MyInputProps = $props()
</script>

<MyInputLayout {className}>
  <Label for={id} class="block text-base">{label}</Label>
  <Input
    {type}
    {name}
    {id}
    class="{typeof error === 'string' && error.length > 0 ? 'border-red-500' : ''} text-base"
    {placeholder}
  />
  <ErrorParagraph {showErrorMessage} {error} />
</MyInputLayout>
