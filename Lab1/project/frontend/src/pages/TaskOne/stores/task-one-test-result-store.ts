import { writable } from "svelte/store";

export const taskOneTestResultStore = writable({
  success: false,
  open: false,
})
