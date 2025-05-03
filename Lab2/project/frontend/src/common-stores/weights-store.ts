import { writable } from "svelte/store";

export const weightsStore = writable<number[][] | undefined>()
