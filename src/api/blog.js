import http from '@/utils/axiosInstance'

export function getBlogsApi() {
    return http({
        url: '/api/blog/getblogs',
        method: 'get'
    });
}

export function getCommentsApi(blogid) {
    return http({
        url: '/api/blog/getcomments',
        method: 'get',
        params: {
            blogid
        }
    });
}

export function postBlogApi({ title, content, images, uid, forward_comment, source_id }) {
    // forwardObj={ source_uname, source_uid, source_uavator, forward_comment, source_id }
    return http({
        url: '/api/blog/postblog',
        method: 'post',
        data: { title, content, images, uid, forward_comment, source_id }
    });
}

export function postCommentApi({ blogid, content, uid }) {
    return http({
        url: '/api/blog/postcomment',
        method: 'post',
        data: { blogid, content, uid }
    });
}