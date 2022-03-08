import { InventoryItem } from "./InventoryItem";

export interface Inventory {
    usedSlots:number;
    maxSlots:number;
    items:InventoryItem[];
}