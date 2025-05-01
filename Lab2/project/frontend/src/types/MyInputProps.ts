export type MyInputProps = {
  name: string
  placeholder: string
  label: string
  id?: string
  error?: string | null
  type?: 'text' | 'number' | 'email' | 'password'
  class?: string
  showErrorMessage?: boolean
  subText?: string
}
