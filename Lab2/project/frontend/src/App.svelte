<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import TrainingPage from './pages/TrainingPage/TrainingPage.svelte'
  import AppLayout from './AppLayout.svelte'
  import TestingPage from './pages/TestingPage/TestingPage.svelte'
  import RouterLayout from './RouterLayout.svelte'
  import { onMount, onDestroy } from 'svelte'
  import { connectWebSocket, disconnectWebSocket } from './api/websocket'

  onMount(() => connectWebSocket('/api/v1/'))
  onDestroy(() => disconnectWebSocket())
</script>

<RouterLayout>
  <Router>
    <AppLayout>
      <Route path="/training">
        <TrainingPage />
      </Route>
      <Route path="/testing">
        <TestingPage />
      </Route>
      <Route path="*">
        <TrainingPage />
      </Route>
    </AppLayout>
  </Router>
</RouterLayout>
