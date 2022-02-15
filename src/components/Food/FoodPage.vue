<template>
    <div>
        <div class="header-stall">
          <button @click="goBack" class="btn btn-4 sign-out-button mr-2">
              Back
          </button>
            <div>Food Avaibility</div>
        </div>
        <div class="card-list">
            <div class="cards">
                <div v-for="perFood in listFood" :key="perFood.Id" class="card">
                    <div class="card-top">
                        <h3 class="card-title">
                            {{perFood.Name}}
                        </h3>
                    </div>
                    <div class="card-content">
                        <div v-if="perFood.Images && perFood.Images.length">
                            <img
                                v-for="(image, index) in perFood.Images" :key="index"
                                class="card-img"
                                :src="image"
                                alt="img"
                            />
                        </div>
                        <div v-else class="no-image">
                            No Image
                        </div>
                        <div class="card-bottom">
                            <button @click="updateFoodIsAllowOrdered(perFood.Id)" class="button-live">
                                Available
                            </button>
                            <button @click="updateFoodSoldOut(perFood.Id)" class="button-live color-collected">
                                Sold
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppLocalStorage from '@/store/localstorage'
import Application from '@/utils/application.js'
import FoodAvaibilityAPI from '@/Api/foodAvaibility.api.js'
export default {
    data () {
        return {
            intervalRefresh: null,
            listFood: []
        }
    },
    methods: {
        goBack () {
            this.$router.push('/')
        },
        getListFood () {
            const userData = AppLocalStorage.getUserData()
            const outletId = userData.OutletIds[0].OutletId
            // this.$store.dispatch('application/setShowLoader', true)
            FoodAvaibilityAPI.getListFood(outletId)
                .then(res => {
                    if (Application.isApiResponseSuccess(res.data)) {
                        this.$store.dispatch('application/setShowLoader', false)
                        this.listFood = res.data.Data
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        },

        updateFoodIsAllowOrdered (foodId) {
            this.$store.dispatch('application/setShowLoader', true)
            FoodAvaibilityAPI.updateFoodItem(foodId)
                .then(res => {
                    if (Application.isApiResponseSuccess(res.data)) {
                        Application.showToasted('Update food available successfully', 'success')
                        this.$store.dispatch('application/setShowLoader', false)
                        this.getListFood()
                    } else {
                        Application.showToasted('Update food available fail', 'error')
                        this.$store.dispatch('application/setShowLoader', false)
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        },

        updateFoodSoldOut (foodId) {
            this.$store.dispatch('application/setShowLoader', true)
            FoodAvaibilityAPI.updateFoodSoldOutAvailable(foodId)
                .then(res => {
                    if (Application.isApiResponseSuccess(res.data)) {
                        Application.showToasted('Update food sold out successfully', 'success')
                        this.$store.dispatch('application/setShowLoader', false)
                        this.getListFood()
                    } else {
                        Application.showToasted('Update food sold out fail', 'error')
                        this.$store.dispatch('application/setShowLoader', false)
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        }
    },
    mounted () {
        this.getListFood()
        this.intervalRefresh = setInterval(() => {
            this.getListFood()
        }, 10000)
    }
}
</script>

<style lang="scss" scoped>
    .header-stall {
        display: flex;
        width: calc(100% - 40px);
        margin: 20px;
        justify-content: space-between;
        div {
            border: 2px solid #ddd;
            font-size: 25px;
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000;
            height: 60px;
            box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
        }
    }
    .card-list {
        padding: 0px 20px;
    }
    .cards {
        display: flex;
        flex-wrap: wrap;
        margin-left: calc(-1 * var(--spacing));
        --spacing: 30px;
        --columns: 4;
    }
    .card {
        border-radius: 20px;
        overflow: hidden;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        width: calc(calc(100% / var(--columns)) - var(--spacing));
    }

    @media screen and (max-width: 767px) {
    .cards {
        --spacing: 15px;
        --columns: 1;
        margin-bottom: -10px;
    }
    .card {
        margin-bottom: 10px;
    }
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    .cards {
        --spacing: 30px;
        --columns: 2;
        margin-bottom: -10px;
    }
    .card {
        margin-bottom: 10px;
    }
    }

    .card-img {
        height: 200px;
        width: 100%;
        object-fit: cover;
        flex-shrink: 0;
    }
    .card-top {
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-title {
        font-weight: 500;
        margin-bottom: 25px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .card-bottom {
        padding: 10px 25px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        flex-shrink: 0;
    }

    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .button-live {
        background: #e09c48;
        transition: all 0.25s ease-out;
        height: 40px;
        border: none;
        width: 110px;
        color: #fff;
        font-size: 18px;
        border-radius: 20px;
    }
    .button-live:hover {
        position: relative;
        top: -2px;
        box-shadow: -6px 14px 12px 2px rgba(90, 90, 90, .12);
    }
    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .color-collected {
        background: #24a058;
    }
    .no-image {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-style: italic;
        width: 100%;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
</style>
