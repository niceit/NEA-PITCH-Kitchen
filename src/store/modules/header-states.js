export const header = {
    namespaced: true,
    state: {
        dataHeader: {}
    },
    actions: {
        updateDataHeader: (context, payload) => {
            context.commit('setDataHeader', payload)
        }

    },
    mutations: {
        setDataHeader (state, payload) {
            state.dataHeader = payload
        }
    }
}
