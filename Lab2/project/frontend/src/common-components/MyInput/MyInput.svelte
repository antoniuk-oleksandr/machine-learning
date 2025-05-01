<script lang="ts">
  import { Input, Label } from 'flowbite-svelte'
  import MyInputLayout from './MyInputLayout.svelte'
  import type { MyInputProps } from '../../types/MyInputProps'
  import ErrorParagraph from '../ErrorParagraph/ErrorParagraph.svelte'
    import SubText from '../SubText/SubText.svelte'

  const {
    name,
    id,
    placeholder,
    label,
    error,
    class: className,
    type = 'text',
    showErrorMessage = true,
    subText,
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
  <SubText text={subText}/>
  <ErrorParagraph {showErrorMessage} {error} />
</MyInputLayout>
