import http from '../utils/request'

// 请求首页数据的接口
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData')
}

// 
export const getUser = (params) => {
    // 返回用户列表
    return http.get('/user/getUser',params)
}

export const addUser = (data) => {
    return http.post('/user/add',data)
}

export const editUser = (data) => {
    return http.post('/user/edit',data)
}

export const delUser = (data) => {
    return http.post('/user/del',data)
}

// 登录
export const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
}

// 商品信息
// 获取信息
export const getMall = (params) => {
    return http.get('/mall/getMall',params)
}
// 增加商品信息
export const addMall = (data) => {
    return http.post('/mall/addMall',data)
}
// 删除商品信息
export const delMall = (data) => {
    return http.post('/mall/deleteMall',data)
}
//修改信息
export const editMall = (data) => {
    return http.post('/mall/editMall',data)
}
//批量删除信息
export const batchremove = (data) => {
    return http.post('/mall/batchremove',data)
}