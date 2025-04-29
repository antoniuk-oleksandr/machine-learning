<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import TaskOnePage from './pages/TaskOne/TaskOnePage.svelte'
  import AppLayout from './AppLayout.svelte'
  import TaskTwoPage from './pages/TaskTwo/TaskTwoPage.svelte'
  import { fade } from 'svelte/transition'
</script>

<div transition:fade={{ duration: 500 }}>
  <Router>
    <AppLayout>
      <Route path="/task-one">
        <TaskOnePage />
      </Route>
      <Route path="/task-two">
        <TaskTwoPage />
      </Route>
      <Route path="*">
        <TaskOnePage />
      </Route>
    </AppLayout>
  </Router>
</div>
