import { createSlice } from "@reduxjs/toolkit";
import { productResponseDTO } from "../../utils/utilsDTOS";

type Orderstate = {
    orders: productResponseDTO[];
}

const initialState: Orderstate = {
    orders: [],
}

/**
 * Represents the order reducer.
 */
export const orderReducer = createSlice({
    name: "order",
    initialState,
    reducers: {
        /**
         * Adds a product to the order.
         * @param state - The current state.
         * @param action - The action containing the payload.
         */
        addProductToOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        /**
         * Removes a product from the order.
         * @param state - The current state.
         * @param action - The action containing the payload.
         */
        removeProductToOrder: (state, action) => {
            state.orders = state.orders.filter((order) => order.idProduct !== action.payload.idProduct);
        },
        /**
         * Removes all orders.
         * @param state - The current state.
         */
        removeAllOrders: (state) => {
            state.orders = [];
        }
    },
})