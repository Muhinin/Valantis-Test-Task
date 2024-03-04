export type productType = {
    brand: string | null;
    id: string;
    price: number;
    product: string;
}

export enum apiActions {
    GET_IDS = "get_ids",
    GET_ITEMS = "get_items",
    GET_FIELDS = "get_fields",
    FILTER = "filter",
}