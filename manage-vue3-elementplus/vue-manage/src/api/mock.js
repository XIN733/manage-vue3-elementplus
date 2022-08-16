// Mock模拟接口 
import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
import userApi from './mockServeData/user.js'
import permissionApi from './mockServeData/permission.js'

// 设置一下模拟返回数据的时间
// Mock.setup({
//     timeout:'200-600'
// })

Mock.mock("/permission/getMenu",'post',permissionApi.getMenu)

Mock.mock("/home/getData",'get',homeApi.getStatisticalData)

Mock.mock(/user\/getUserList/,'get',userApi.getUserList)

Mock.mock("/user/addUser",'post',userApi.createUser)

Mock.mock("/user/editUser",'post',userApi.updateUser)

Mock.mock("/user/deleteUser",'get',userApi.deleteUser)

