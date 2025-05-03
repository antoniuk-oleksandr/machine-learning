import { writable } from "svelte/store";
import type { EpochData } from "../../../types/EpochData";

export const epochsStore = writable<EpochData[]>([])
