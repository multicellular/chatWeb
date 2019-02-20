export default [
    {
        name: '/',
        path: '/',
        redirect: '/home',
        component: () => import( /* webpackChunkName: "home-module" */ '@/views/home-module/index'),
        children: [{
            name: 'home',
            path: 'home',
            component: () => import( /* webpackChunkName: "home" */ '@/views/home-module/home')
        },{
            name: 'title',
            path: 'title',
            component: () => import( /* webpackChunkName: "title" */ '@/views/home-module/title')
        }]
    },
    {
        name: 'chat',
        path: '/chat',
        redirect: '/chat/chatRoom',
        meta: {
            requiredAuth: true
        },
        component: () => import( /* webpackChunkName: "chat-module" */ '@/views/chat-module/index'),
        children: [{
            name: 'groupChat',
            path: 'groupChat',
            component: () => import( /* webpackChunckName: 'groupChat' */ '@/views/chat-module/groupChat')
        },{
            name: 'chatRoom',
            path: 'chatRoom',
            component: () => import( /* webpackChunckName: 'chatRoom' */ '@/views/chat-module/chatRoom')
        }]
    },
    {
        name: 'blog',
        path: '/blog',
        redirect: '/blog/blogBook',
        component: () => import( /* webpackChunkName: "blog-module" */ '@/views/blog-module/index'),
        children: [{
            name: 'blogBook',
            path: 'blogBook',
            component: () => import( /* webpackChunckName: 'blog' */ '@/views/blog-module/blogBook')
        }]
    },
    {
        name: 'game',
        path: '/game',
        redirect: '/game/gameCenter',
        component: () => import( /* webpackChunkName: "game-module" */ '@/views/game-module/index'),
        children: [{
            name: 'gameCenter',
            path: 'gameCenter',
            component: () => import( /* webpackChunckName: 'gameCenter' */ '@/views/game-module/gameCenter')
        },{
            name: 'game001',
            path: 'game001',
            component: () => import( /* webpackChunckName: 'game001' */ '@/views/game-module/game001')
        },{
            name: 'game002',
            path: 'game002',
            component: () => import( /* webpackChunckName: 'game002' */ '@/views/game-module/game002')
        }]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import( /* webpackChunckName: 'login' */ '@/views/login/login')
    }
]