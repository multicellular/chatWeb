import http from '@/utils/http'

export function loginApi(userId) {
    return http({
        url: '/api/user/login',
        method: 'GET',
        params: {
            id: userId
        }
    });
}
export function createApi({ userId, nickName, avatarURL, customData }) {
    return http({
        url: '/api/user/create',
        method: 'POST',
        data: {
            id: userId,
            name: nickName,
            avatarURL,
            customData
        }
    });
}
export function createRoomApi({ userId, roomName, isPrivate, customData, userIds }) {
    return http({
        url: '/api/user/createRoom',
        method: 'POST',
        data: {
            userId,
            roomName,
            isPrivate,
            customData,
            userIds
        }
    });
}
