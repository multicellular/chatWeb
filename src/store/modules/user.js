const user = {
    state: {
        userInfo: {},
        hasInfo: false,
        chatUser: {}
    },
    mutations: {
        SET_USER_INFO(state, data) {
            state.userInfo = data;
            state.hasInfo = true;
        },
        CLEAR_USER_INFO(state) {
            state.userInfo = {};
            state.hasInfo = false;
        }
    },
    actions: {}
}
export default user;