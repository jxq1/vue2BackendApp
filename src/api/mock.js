import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
import mall from './mockServeData/mall'

// 定义mock请求拦截
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)

// 登录
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)

// 商品列表的数据
Mock.mock(/api\/mall\/getMall/,mall.getMallList)
Mock.mock(/api\/mall\/addMall/,'post',mall.createMall)
Mock.mock(/api\/mall\/deleteMall/,'post',mall.deleteMall)
Mock.mock(/api\/mall\/editMall/,'post',mall.updateMall)
Mock.mock(/api\/mall\/batchremove/,'post',mall.batchremove)


