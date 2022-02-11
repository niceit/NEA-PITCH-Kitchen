<template>
    <div>
        <div class="header-stall">
            <div class="stall-title">Stall 1</div>
            <div>
                <button @click="$router.push(PATH.FOOD)" class="btn btn-4 mr-2">Food Avaibility</button>
                <button @click="signOut" class="btn btn-4 sign-out-button">
                    Sign Out      
                </button>
            </div>
        </div>
        <div class="card-list">
            <div class="cards">
                <div class="card">
                    <div class="card-header">
                        <p>Take away</p>
                        <p>1001</p>
                        <p>05:22</p>
                    </div>
                    <div class="card-content">
                        <div class="card-top">
                        <h3 class="card-title">
                            x01 Wanton Mee
                        </h3>
                        <h3 class="card-title">
                            x03 Wanton Soup
                        </h3>

                        </div>

                        <div class="card-header">
                            <p>Order time</p>
                            <p>13:00</p>
                            <p>02/11/2022</p>
                        </div>

                        <div class="card-bottom">
                            <button class="button-live">
                                Call Q
                            </button>
                            <button class="button-live color-collected">
                                Collected
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <p>Take away</p>
                        <p>1001</p>
                        <p>05:22</p>
                    </div>
                    <div class="card-content">
                        <div class="card-top">
                        <h3 class="card-title">
                            x01 Wanton Mee
                        </h3>
                        <h3 class="card-title">
                            x03 Wanton Soup
                        </h3>

                        </div>

                        <div class="card-header">
                            <p>Order time</p>
                            <p>13:00</p>
                            <p>02/11/2022</p>
                        </div>

                        <div class="card-bottom">
                            <button class="button-live">
                                Call Q
                            </button>
                            <button class="button-live color-collected">
                                Collected
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <p>Take away</p>
                        <p>1001</p>
                        <p>05:22</p>
                    </div>
                    <div class="card-content">
                        <div class="card-top">
                        <h3 class="card-title">
                            x01 Wanton Mee
                        </h3>
                        <h3 class="card-title">
                            x03 Wanton Soup
                        </h3>

                        </div>

                        <div class="card-header">
                            <p>Order time</p>
                            <p>13:00</p>
                            <p>02/11/2022</p>
                        </div>

                        <div class="card-bottom">
                            <button class="button-live">
                                Call Q
                            </button>
                            <button class="button-live color-collected">
                                Collected
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {PATH} from '@/Api/const.js'
import AppLocalStorage from '@/store/localstorage'
export default {
    data() {
        return {
            PATH,
        }
    },
    methods: {
        signOut() {
            AppLocalStorage.removeTokenAndUserData()
            this.$router.push(this.PATH.LOGIN)
        }
    }
};
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
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        width: calc(calc(100% / var(--columns)) - var(--spacing));
    }
    .card-header {
        padding-top: 10px;
        display: flex;
        justify-content: space-around;
        p {
            font-weight: bold;
            font-size: 16px;
        }
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
        padding: 25px;
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
</style>
