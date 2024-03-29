export const API_PATH = {
    GET_COMPANY_LIST: 'GetCompanyList',
    GET_USER_INFORMATION: 'GetUserInformation',
    CALL_ORDER_LIST: (outletId, orderDate) => {
        return `CallOrderList?outletId=${outletId}&orderDate=${orderDate}&status=View,Ready,Collected`
    },
    CALL_QUEUE_NUMBER: 'CallQueueNumber',
    CALL_COLLECTED_ORDER: 'CallCollectedOrder',
    GET_ORDER_INFORMATION: (orderId) => `GetOrderInformation?orderId=${orderId}`,
    GET_FOOD_CATEGORIES: (outletId) => `GetFoodCategoryList?OutletId=${outletId}`,
    GET_FOOD_LIST: (categoryId, outletId) => `GetFoodList?OutletId=${outletId}&CategoryId=${categoryId}`,
    UPDATE_FOOD_ITEM: 'UpdateFoodItem'
}

export const PATH = {
    LOGIN: '/login',
    FOOD: '/food'
}
