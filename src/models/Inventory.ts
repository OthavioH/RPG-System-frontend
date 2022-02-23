import { InventoryItem } from "./InventoryItem";

export interface Inventory {
    weight:number;
    maxWeight:number;
    items:InventoryItem[];
}