import http from '@/utils/axiosInstance'

export function getBlogsApi() {
    return http({
        url: '/blog/getblogs',
        method: 'get'
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

export function postBlogApi({ title, content, images, uid, forward_comment, source_id }) {
    // forwardObj={ source_uname, source_uid, source_uavator, forward_comment, source_id }
    return http({
        url: '/blog/postblog',
        method: 'post',
        data: { title, content, images, uid, forward_comment, source_id }
    });
}

export function postCommentApi({ blogid, content, uid }) {
    return http({
        url: '/blog/postcomment',
        method: 'post',
        data: { blogid, content, uid }
    });
}

export function uploadFile(file){
    return http({
        url: '/uploadFile',
        method: 'post',
        data: 
            file
        
    });
}