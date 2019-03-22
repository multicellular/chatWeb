import http from '@/utils/axiosInstance'

export function getBlogsApi() {
    return http({
        url: '/blog/getblogs',
        method: 'get'
    });
}

export function getBlogsByUserApi(uid) {
    return http({
        url: '/blog/getBlogsByUser',
        method: 'get',
        params: { uid }
    });
}

export function getCommentsApi(blogid) {
    return http({
        url: '/blog/getcomments',
        method: 'get',
        params: {
            blogid
        }
    });
}

export function postBlogApi({ title, content, media_urls, media_type, uid, forward_comment, source_id, is_private }) {
    // forwardObj={ source_uname, source_uid, source_uavator, forward_comment, source_id }
    return http({
        url: '/blog/postblog',
        method: 'post',
        data: { title, content, media_urls, media_type, uid, forward_comment, source_id, is_private }
    });
}

export function postCommentApi({ blogid, content, uid }) {
    return http({
        url: '/blog/postcomment',
        method: 'post',
        data: { blogid, content, uid }
    });
}