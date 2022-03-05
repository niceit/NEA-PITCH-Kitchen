import Api from './api'
import { API_PATH } from './const'

const FoodAvaibilityAPI = {
    async getFoodCategories (outletId) {
        return await Api.get(API_PATH.GET_FOOD_CATEGORIES(outletId))
    },
    async getListFood (categoryId, outletId) {
        return await Api.get(API_PATH.GET_FOOD_LIST(categoryId, outletId))
    },
    updateFoodItem (id) {
        const data = {
            Id: id,
            IsAllowOrder: true
        }
        return Api.post(API_PATH.UPDATE_FOOD_ITEM, data)
    },
    updateFoodSoldOutAvailable (id) {
        const data = {
            Id: id,
            IsAllowOrder: false
        }
        return Api.post(API_PATH.UPDATE_FOOD_ITEM, data)
    }
}
export default FoodAvaibilityAPI
