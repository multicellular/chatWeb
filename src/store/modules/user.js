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
        },
        SET_CHAT_USER(state, chatUser) {
            state.chatUser = chatUser;
        },
        CLEAR_CHAT_USER(state) {
            state.chatUser = {};
        },
    },
    actions: {}
}
export default user;