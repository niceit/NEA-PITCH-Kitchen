<template>
    <div>
        <b-modal v-model="isOpened" hide-footer hide-header hide-backdrop>
            <div class="title-notification">
                <div class="close-box ml-auto d-flex align-items-center">
                    <button @click="closeModalInformation" type="button" class="btn-close"
                        aria-label="Close"></button>
                </div>
            </div>
            <div class="content-notification">
                <form class="form">
                    <h2>Information Order</h2>
                    <p type="Full Name:">
                        <input readonly :value="currentOrderItem.FullName"/>
                    </p>
                    <p type="Order Status:">
                        <input readonly :value="currentOrderItem.OrderStatus"/>
                    </p>
                    <p type="Payment Price:">
                        <input readonly :value="currentOrderItem.PaymentPrice"/>
                    </p>
                    <p type="Queue Number:">
                        <input readonly :value="currentOrderItem.QueueNumber"/>
                    </p>
                    <p type="Order Code:">
                        <input readonly :value="currentOrderItem.OrderCode"/>
                    </p>
                    <p type="Order Date:">
                        <input readonly :value="currentOrderItem.OrderDate"/>
                    </p>
                    </form>
            </div>
        </b-modal>
        <div v-if="isOpened" class="custom-modal-backdrop fade" :class="{show: isOpened}"></div>
    </div>
</template>

<script>
export default {
    props: ['currentOrderItem'],
    data () {
        return {
            isOpened: false
        }
    },
    methods: {
        closeModalInformation () {
            this.isOpened = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .title-notification {
        display: flex;
        align-items: center !important;
        h2 {
            margin-bottom: 0px;
            font-size: 30px !important;
        }
        .btn-close {
            top: 10px !important;
            right: 20px !important;
            left: auto !important;
            position: absolute;
            z-index: 100;
        }
    }
    .content-notification {
        min-height: 60vh;
        display: flex;
        padding-bottom: 10px;
    }
    .content-notification {
        .form {
            width: 100%;
            position: relative;
        }
        h2 {
            margin: 10px 0;
            padding-bottom: 10px;
            width: 180px;
            color: #78788c;
            border-bottom: 3px solid #78788c;
        }
        input {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background: none;
            outline: none;
            resize: none;
            border: 0;
            font-family: "Montserrat", sans-serif;
            transition: all 0.3s;
            border-bottom: 2px solid #bebed2;
        }
        input:focus {
            border-bottom: 2px solid #78788c;
        }
        p:before {
            content: attr(type);
            display: block;
            margin: 28px 0 0;
            font-size: 14px;
            color: #5a5a5a;
        }
        button {
            float: right;
            padding: 8px 12px;
            margin: 8px 0 0;
            font-family: "Montserrat", sans-serif;
            border: 2px solid #78788c;
            background: 0;
            color: #5a5a6e;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            background: #78788c;
            color: #fff;
        }
        div {
            content: "Hi";
            position: absolute;
            bottom: -15px;
            right: -20px;
            background: #50505a;
            color: #fff;
            width: 320px;
            padding: 16px 4px 16px 0;
            border-radius: 6px;
            font-size: 13px;
            box-shadow: 10px 10px 40px -14px #000;
        }
        span {
            margin: 0 5px 0 15px;
        }
    }
</style>
