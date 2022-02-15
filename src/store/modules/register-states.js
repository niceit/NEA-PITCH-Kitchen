export const register = {
    namespaced: true,
    state: {
        authKey: '',
        phoneNum: ''
    },
    actions: {
        setAuthKeyFromVerifySMS: (context, payload) => {
            context.commit('setAuthKey', payload)
        },
        setPhoneNum: (context, payload) => {
            context.commit('setPhoneNum', payload)
        }

    },
    mutations: {
        setAuthKey (state, payload) {
            state.authKey = payload
        },
        setPhoneNum (state, payload) {
            state.phoneNum = payload
        }
    }
}
