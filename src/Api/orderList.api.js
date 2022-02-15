import Api from './api'
import { API_PATH } from './const'

const OrderListAPI = {
    getListOrder (outletId, orderDate) {
        return Api.get(API_PATH.CALL_ORDER_LIST(outletId, orderDate))
    },
    callQueueNumber (data) {
        return Api.post(API_PATH.CALL_QUEUE_NUMBER, data)
    },
    callCollectedOrder (data) {
        return Api.post(API_PATH.CALL_COLLECTED_ORDER, data)
    },
    getOrderInformation (orderId) {
        return Api.get(API_PATH.GET_ORDER_INFORMATION(orderId))
    }
}
export default OrderListAPI
