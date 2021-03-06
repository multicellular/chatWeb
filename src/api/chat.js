import http from '@/utils/axiosInstance'

export function createRoomApi({ name, caption, ownerid }) {
    return http({
        url: '/room/insertRoom',
        method: 'post',
        data: { name, caption, ownerid }
    });
}

export function getPublicRoomsApi() {
    return http({
        url: '/room/getSystemRooms',
        method: 'get'
    });
}

export function getUserRoomsApi(uid) {
    return http({
        url: '/room/getUserRooms',
        method: 'get',
        params: { uid }
    });
}

export function getUserChatsApi(uid) {
    return http({
        url: '/room/getUserChats',
        method: 'get',
        params: { uid }
    });
}

// export function getRoomUsersApi(roomid) {
//     return http({
//         url: '/api/room/getRoomUsers',
//         method: 'get',
//         params: { roomid }
//     });
// }

export function getUserFriendsApi(uid) {
    return http({
        url: '/room/getUserFriends',
        method: 'get',
        params: { uid }
    });
}

export function createChatApi({ uid, fuid }) {
    return http({
        url: '/room/insertChat',
        method: 'post',
        data: { uid, fuid }
    });
}

// export function inviteRoomUserApi({ roomid, uid }) {
//     return http({
//         url: '/api/room/userJoinRoom',
//         method: 'post',
//         data: { roomid, uid }
//     });
// }

export function inviteRoomUsersApi({ roomid, uids }) {
    return http({
        url: '/room/listJoinRoom',
        method: 'post',
        data: { roomid, uids }
    });
}

export function deleteRoomUserApi({ roomid, uid }) {
    return http({
        url: '/room/userLeaveRoom',
        method: 'post',
        data: { roomid, uid }
    });
}

// export function inviteFriendApi({ flist_id, uid }) {
//     return http({
//         url: '/api/room/joinFriend',
//         method: 'post',
//         data: { flist_id, uid }
//     });
// }

// export function inviteFriendByNameApi({ flist_id, uname }) {
//     return http({
//         url: '/api/room/joinFriendByName',
//         method: 'post',
//         data: { flist_id, uname }
//     });
// }

export function searchUsersByNameApi({ uname }) {
    return http({
        url: '/room/searchUsersByName',
        method: 'get',
        params: { uname }
    });
}

export function createApplyApi({ verify_message, apply_uid, apply_flist_id, invitees_uid, invitees_flist_id }) {
    return http({
        url: '/room/createApply',
        method: 'post',
        data: { verify_message, apply_uid, apply_flist_id, invitees_uid, invitees_flist_id }
    });
}

export function findApplyApi({ invitees_uid }) {
    return http({
        url: '/room/findApply',
        method: 'get',
        params: { invitees_uid }
    });
}

export function ignoreApplyApi(applyid) {
    return http({
        url: '/room/ignoreApply',
        method: 'post',
        data: { applyid }
    });
}

export function allowJoinFriendApi({ uremark, apply_uid, apply_flist_id, invitees_uid, invitees_flist_id, applyId }) {
    return http({
        url: '/room/allowJoinFriend',
        method: 'post',
        data: { uremark, apply_uid, apply_flist_id, invitees_uid, invitees_flist_id, applyId }
    });
}

export function deleteFriendApi({ flist_id, uid }) {
    return http({
        url: '/room/deleteFriend',
        method: 'post',
        data: { flist_id, uid }
    });
}