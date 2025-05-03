<script lang="ts">
  import TestingPageForm from './components/TestingPageForm/TestingPageForm.svelte'
  import TestingPageLeftSide from './components/TestingPageLeftSide/TestingPageLeftSide.svelte'
  import TestingPageResult from './components/TestingPageResult/TestingPageResult.svelte'
  import TestingPageRightSide from './components/TestingPageRightSide/TestingPageRightSide.svelte'
</script>

<TestingPageForm>
  <TestingPageLeftSide />
  <TestingPageRightSide />
</TestingPageForm>
<TestingPageResult />
