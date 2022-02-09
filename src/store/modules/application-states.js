export const application = {
    namespaced: true,
    state: {
        modalDataDirty: false,
        showPageLoader: false,
        cartItemIdOnStart: null // cart item id to open dialog when dish detail page first load
    },
    actions: {
        setShowLoader: (context, payload) => {
            context.commit('setShowLoader', payload)
        },
        setDirty: (context, payload) => {
            context.commit('setDirty', payload)
        },
        resetDirty: (context, payload) => {
            context.commit('resetDirty', payload)
        }
    },
    mutations: {
        setShowLoader (state, payload) {
            state.showPageLoader = payload
        },
        setDirty (state, payload) {
            state.modalDataDirty = payload
        },
        resetDirty (state) {
            state.modalDataDirty = false
        },
        SET_CART_ITEM_ID_ON_START (state, value) {
            state.cartItemIdOnStart = value
        }
    },
    getters: {
        getCartItemIdOnStart (state) {
            return state.cartItemIdOnStart
        }
    }
}
