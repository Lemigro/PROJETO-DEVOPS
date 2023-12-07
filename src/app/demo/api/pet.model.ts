interface InventoryStatus {
    label: string;
    value: string;
}
export interface Pet {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
    key?: string;
}