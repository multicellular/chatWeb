import http from '@/utils/http'

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

export function postBlogApi({ title, content, images, uavator, uname, uid, forwardObj = {} }) {
    // forwardObj={ source_uname, source_uid, source_uavator, forward_comment, source_id }
    return http({
        url: '/api/blog/postblog',
        method: 'post',
        data: { title, content, images, uavator, uname, uid, forwardObj }
    });
}

export function postCommentApi({ blogid, content, uname, uid, uavator }) {
    return http({
        url: '/api/blog/postcomment',
        method: 'post',
        data: { blogid, content, uname, uid, uavator }
    });
}