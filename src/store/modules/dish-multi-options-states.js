export const DishMultiOptions = {
    namespaced: true,
    state: {
        items: []
    },
    actions: {
        setItems: (context, payload) => {
            context.commit('setItems', payload)
        }
    },
    mutations: {
        setItems (state, payload) {
            state.items = payload
        }
    },
    getters: {
        getItems (state) {
            return state.items
        }
    }
}
