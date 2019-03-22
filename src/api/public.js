import http from '@/utils/axiosInstance'

export function uploadFile(formData){
    return http({
        url: '/uploadFile',
        method: 'post',
        data: formData
    });
}