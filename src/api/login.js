import http from '@/utils/axiosInstance'

export function signUpApi({ name, password, avator }) {
    return http({
        url: '/api/user/signup',
        method: 'POST',
        data: {
            name,
            password,
            avator
        }
    });
}

export function signInApi({ name, password }) {
    return http({
        url: '/api/user/signin',
        method: 'POST',
        data: {
            name,
            password
        }
    });
}

export function infoApi() {
    return http({
        url: '/api/user/info',
        method: 'GET',
        secret: true // token
    });
}

export function modifyBioApi({ userid, bio }) {
    return http({
        url: '/api/user/modifyBio',
        method: 'POST',
        data: { userid, bio }
    });
}


// chatkit
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
