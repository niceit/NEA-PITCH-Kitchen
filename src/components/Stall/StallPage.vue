<template>
    <div>
        <div class="header-stall">
            <div class="stall-title">Stall</div>
            <div class="d-flex align-items-center">
                <button @click="$router.push(PATH.FOOD)" class="btn btn-4 mr-2">Food Avaibility</button>
                <button @click="signOut" class="btn btn-4 sign-out-button mr-2">
                    Sign Out
                </button>
                <p class="mb-0 name-user">{{nameUser}}</p>
            </div>
        </div>
        <div v-if="listItemOrder.length" class="card-list">
            <div class="cards">
                <div v-for="item in listItemOrder" :key="item.Id" class="card">
                    <div @click="selectItemOrder(item.Id)" class="card-header">
                        <p>{{item.OrderStatus}}</p>
                        <p>{{item.QueueNumber}}</p>
                        <p>Total Price: {{item.TotalPrice}}</p>
                    </div>
                    <div class="card-content">
                        <div @click="selectItemOrder(item.Id)" class="card-top">
                            <h3 v-for="perAddOnItem in item.AddonItems" :key="perAddOnItem.Id" class="card-title">
                                x{{perAddOnItem.Quantity}} {{perAddOnItem.AddonName ? perAddOnItem.AddonName : 'Empty Name'}}
                            </h3>
                            <h3 v-for="perFoodItem in item.FoodItems" :key="perFoodItem.Id" class="card-title">
                                x{{perFoodItem.Quantity}} {{perFoodItem.FoodName ? perFoodItem.FoodName : 'Empty Name'}}
                            </h3>

                        </div>

                        <div @click="selectItemOrder(item.Id)" class="card-header">
                            <p>Order time</p>
                            <p>{{item.OrderDate}}</p>
                        </div>

                        <div class="card-bottom">
                            <button @click="callQueueItem(item.Id)" class="button-live">
                                Call Q
                            </button>
                            <button @click="callCollectedOrder(item.Id)" class="button-live color-collected">
                                Collected
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-list" v-else>Empty List</div>
        <DialogOrderInformation ref="DialogOrderInfor" :currentOrderItem="currentOrderItem"></DialogOrderInformation>
    </div>
</template>

<script>
import { PATH } from '@/Api/const.js'
import AppLocalStorage from '@/store/localstorage'
import OrderListAPI from '@/Api/orderList.api.js'
import Application from '@/utils/application.js'
import DialogOrderInformation from '@/components/DialogOrderInformation/DialogOrderInformation.vue'
export default {
    data () {
        return {
            intervalRefresh: null,
            PATH,
            nameUser: '',
            listItemOrder: [],
            outletId: '',
            currentOrderItem: {}
        }
    },
    methods: {
        signOut () {
            AppLocalStorage.removeTokenAndUserData()
            this.$router.push(this.PATH.LOGIN)
        },

        getListItemOrder () {
            var today = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
            // this.$store.dispatch('application/setShowLoader', true)
            OrderListAPI.getListOrder(this.outletId, today)
                .then(res => {
                    this.$store.dispatch('application/setShowLoader', false)
                    const listItems = res.data.Data
                    if (listItems && listItems.length) {
                        this.listItemOrder = listItems
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        },

        callQueueItem (orderId) {
            const data = {
                OrderId: orderId
            }
            this.$store.dispatch('application/setShowLoader', true)
            OrderListAPI.callQueueNumber(data)
                .then(res => {
                    if (Application.isApiResponseSuccess(res.data)) {
                        Application.showToasted('Order queue item successfully', 'success')
                        this.$store.dispatch('application/setShowLoader', false)
                        this.getListItemOrder()
                    } else {
                        Application.showToasted('Order queue item fail', 'error')
                        this.$store.dispatch('application/setShowLoader', false)
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        },

        callCollectedOrder (orderId) {
            const data = {
                OrderId: orderId
            }
            this.$store.dispatch('application/setShowLoader', true)
            OrderListAPI.callCollectedOrder(data)
                .then(res => {
                    if (Application.isApiResponseSuccess(res.data)) {
                        Application.showToasted('Order collected item successfully', 'success')
                        this.$store.dispatch('application/setShowLoader', false)
                        this.getListItemOrder()
                    } else {
                        Application.showToasted('Order collected item fail', 'error')
                        this.$store.dispatch('application/setShowLoader', false)
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        },

        selectItemOrder (orderId) {
            this.$store.dispatch('application/setShowLoader', true)
            OrderListAPI.getOrderInformation(orderId)
                .then(res => {
                    if (Application.isApiResponseSuccess(res.data)) {
                        this.$store.dispatch('application/setShowLoader', false)
                        this.$refs.DialogOrderInfor.isOpened = true
                        this.currentOrderItem = res.data.Data
                    }
                })
                .catch(() => {
                    Application.showToasted('Something went wrong. Please try again', 'error')
                    this.$store.dispatch('application/setShowLoader', false)
                })
        }
    },
    mounted () {
        const userData = AppLocalStorage.getUserData()
        this.nameUser = userData.FullName
        this.outletId = userData.OutletIds[0].OutletId
        this.getListItemOrder()
        this.intervalRefresh = setInterval(() => {
            this.getListItemOrder()
        }, 10000)
    },
    components: {
        DialogOrderInformation
    }
}
</script>

<style lang="scss" scoped>
    .header-stall {
        display: flex;
        width: calc(100% - 40px);
        margin: 20px;
        justify-content: space-between;
        .stall-title {
            font-size: 25px;
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgb(53, 51, 51);
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        }
        .btn-4 {
            background: #cbbcf6;
            transition: all 0.16s ease-in;
            height: 40px;
        }

        .btn-4:hover {
            background: none;
            color: #464646;
            box-shadow: 0 0 0 1px rgba(80, 80, 80, .5);
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
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        width: calc(calc(100% / var(--columns)) - var(--spacing));
        margin-bottom: 20px;
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }
    .card-header {
        padding-top: 10px;
        display: flex;
        justify-content: space-around;
        p {
            font-weight: bold;
            font-size: 16px;
        }
        cursor: pointer;
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
        padding: 25px;
        display: flex;
        flex-direction: column;
        flex: 1;
        cursor: pointer;
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
        padding: 5px 25px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        flex-shrink: 0;
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
    .mr-2 {
        margin-right: 20px;
    }
    .sign-out-button {
        background: rgb(192, 60, 60) !important;
        transition: all 0.16s ease-in;
        height: 40px;
        color: #fff;
        &:hover {
            background: none !important;
        }
    }
    .name-user {
        font-weight: bold;
    }
    .empty-list {
        display: flex;
        justify-content: center;
        font-size: 40px;
        text-decoration: underline;
    }
</style>
