import Cookies from 'js-cookie'
import router from '@/router'

const tab = {
    namespaced: true,
    state: {
        isCollapse: false, //是否展开左边导航
        tabsList: [ //记录面包屑页面路径
            {
                path: '/home',
                name: 'Home',
                label: '首页',
                icon: 'HomeFilled'
            }
        ],
        currentMenu: {//记录面包屑高亮页面
            path: '/home',
            name: 'Home',
            label: '首页',
            icon: 'HomeFilled'
        },
        menu:[]
    },
    mutations: {
        setCollapseMenu: function (state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'Home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = {
                    path: '/home',
                    name: 'Home',
                    label: '首页',
                    icon: 'HomeFilled'
                }
            }
            // console.log(state.tabsList)
            // console.log(state.currentMenu)
        },
        setCurrentMenu(state, val) {
            state.currentMenu = val
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookies.set('menu',JSON.stringify(val))
        },
        getMenu(state) {
            if(!Cookies.get('menu')){
                return
            }else{
                const menu = JSON.parse(Cookies.get('menu'))
                state.menu = menu
                const menuArray = []
                menu.forEach(item => {
                    if(item.children){
                        item.children = item.children.map(item => {
                            item.component =  () => import('@/views/' + item.url) 
                            return item
                        })
                        menuArray.push(...item.children)
                    }else{
                        item.component =  () => import('@/views/' + item.url) 
                        menuArray.push(item)
                    }
                });
                // 路由的动态添加, 请注意，添加路由并不会触发新的导航。也就是说，除非触发新的导航，否则不会显示所添加的路由,页面会空白。
                menuArray.forEach(item => {
                    router.addRoute('Main',item)
                })
            }
        },
        clearMenu(state){
            state.menu = ''
            Cookies.remove('menu')
        }
    }
}

export default tab