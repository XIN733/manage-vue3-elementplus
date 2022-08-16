import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'Home',
                            label: '首页',
                            icon: 'HomeFilled',
                            url: 'Home/index.vue'
                        },
                        {
                            path: '/mall',
                            name: 'Mall',
                            label: '商品管理',
                            icon: 'VideoPlay',
                            url: 'Mall/index.vue'
                        },
                        {
                            path: '/user',
                            name: 'User',
                            label: '用户管理',
                            icon: 'User',
                            url: 'User/index.vue'
                        },
                        {
                            path: '/other',
                            label: '其他',
                            icon: 'Location',
                            children: [
                                {
                                    path: '/other/page1',
                                    name: 'Page1',
                                    label: '页面1',
                                    icon: 'Setting',
                                    url: 'Other/Page1.vue'
                                },
                                {
                                    path: '/other/page2',
                                    name: 'Page2',
                                    label: '页面2',
                                    icon: 'Setting',
                                    url: 'Other/Page2.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'Home',
                            label: '首页',
                            icon: 'HomeFilled',
                            url: 'Home/index.vue'
                        },
                        {
                            path: '/mall',
                            name: 'Mall',
                            label: '商品管理',
                            icon: 'VideoPlay',
                            url: 'Mall/index.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '用户名或密码错误'
                }
            }
        }
    }
}