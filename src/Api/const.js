export const API_PATH = {
    GET_COMPANY_LIST: 'GetCompanyList',
    GET_USER_INFORMATION: 'GetUserInformation',
    CALL_ORDER_LIST: (outletId, orderDate) => {
        return `CallOrderList?outletId=${outletId}&orderDate=${orderDate}`
    },
    CALL_QUEUE_NUMBER: 'CallQueueNumber',
    CALL_COLLECTED_ORDER: 'CallCollectedOrder',
    GET_ORDER_INFORMATION: (orderId) => `GetOrderInformation?orderId=${orderId}`,
    GET_FOOD_LIST: (outletId) => `GetFoodList?OutletId=${outletId}`,
    UPDATE_FOOD_ITEM: 'UpdateFoodItem'
}

export const PATH = {
    LOGIN: '/login',
    FOOD: '/food'
}
