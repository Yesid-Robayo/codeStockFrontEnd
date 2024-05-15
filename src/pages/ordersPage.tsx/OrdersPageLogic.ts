import { useNavigate } from "react-router-dom";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { OrdersAPI } from "../../services/OrdersAPI";
import { ProductsAPI } from "../../services/ProductsAPI";
import { useDispatch, useSelector } from "react-redux";
import { productResponseDTO, userData } from "../../utils/utilsDTOS";
import { orderReducer } from "../../redux/reducers/orderReducer";

/**
 * Logic for the OrdersPage component.
 * @returns An object containing various variables and functions related to the OrdersPage component.
 */
export const OrdersPageLogic = () => {
    /**
     * Custom hooks and external dependencies
     */
    const labels = useLabels();
    const styles = useStyles();
    const productsAPI = ProductsAPI;
    const orderAPI = OrdersAPI;
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Redux state selectors
     */
    const userData: userData = useSelector((state: any) => state.auth.user);
    const orders: productResponseDTO[] = useSelector((state: any) => state.order.orders);

    /**
     * Removes a product from the order.
     * @param idProduct - The ID of the product to be removed.
     */
    const deleteOrder = (idProduct: number) => {
        dispatch(orderReducer.actions.removeProductToOrder({ idProduct: idProduct }));
    };

    /**
     * Removes all orders.
     */
    const deleteAllOrders = () => {
        dispatch(orderReducer.actions.removeAllOrders());
    };

    /**
     * Sends an email for the order.
     * If there are no orders, nothing happens.
     * Shows a toast message indicating the progress.
     * If the email is sent successfully, creates an order in the database and removes all orders.
     * @remarks
     * - If the email sending fails, shows an error toast message.
     * - If creating the order in the database fails, nothing happens.
     */
    const sendEmailForOrder = () => {
        if (orders.length === 0) {
            return;
        }
        toast.showToast(labels.sendOrderInProcess);
        productsAPI.sendInventoryEmailPDFUserOrder(orders).then((response) => {
            if (response === 404) {
                toast.showToast(labels.errorToSentOrder);
            } else {
                toast.showToast(labels.sendOrderSuccess);

                orderAPI.createOrder({
                    idPerson: parseInt(userData.idPerson),
                    products: orders.map(order => ({ idProduct: order.idProduct, quantity: 1 })),
                    date: new Date()
                }).then((response) => {

                    if (response === 404) {
                        // Error
                    } else {
                        deleteAllOrders();
                        dispatch(orderReducer.actions.removeAllOrders());
                    }

                }).catch((error) => { });


            }
        }).catch((error) => { });

    }

    /**
     * Converts an ID currency to its corresponding currency code.
     * @param idCurrency - The ID of the currency.
     * @returns The currency code corresponding to the given ID currency.
     */
    const convertIdCurrency = (idCurrency: number) => {
        switch (idCurrency) {
            case 1:
                return 'USD';
            case 2:
                return 'COP';
            case 3:
                return 'EUR';
            case 4:
                return 'BRL';
            default:
                return 'USD';
        }
    }

    /**
     * Returns an object containing various variables and functions related to the OrdersPage component.
     */
    return { labels, styles, productsAPI, orderAPI, toast, userData, orders, deleteOrder, deleteAllOrders, sendEmailForOrder, convertIdCurrency }
}