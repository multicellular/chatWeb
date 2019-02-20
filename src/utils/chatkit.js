import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

// const chatManager = new ChatManager({
//     instanceLocator: 'v1:us1:5697f151-ab2c-404f-9137-8ea36d9acedf',
//     userId: '3',
//     tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5697f151-ab2c-404f-9137-8ea36d9acedf/token' })
// });

// chatManager.connect().then(currentUser => console.log(currentUser)).catch(err => console.log(err));
// export default chatManager.connect();

export default function (userId) {
    const chatManager = new ChatManager({
        instanceLocator: 'v1:us1:5697f151-ab2c-404f-9137-8ea36d9acedf',
        userId: userId,
        tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5697f151-ab2c-404f-9137-8ea36d9acedf/token' })
    });

    return chatManager.connect();
}
