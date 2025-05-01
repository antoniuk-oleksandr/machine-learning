import { writable } from "svelte/store";
import type { SettingsModalStore } from "../types/SettingsModalStore";

export const settingsModalStore = writable<SettingsModalStore>({
  open: false,
  gridSize: 8,
  pointSize: 2,
})
