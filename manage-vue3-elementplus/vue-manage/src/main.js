import { createApp, h } from 'vue'
import {  ElMessage,ElMessageBox } from 'element-plus'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import '@/assets/less/index.less'
import * as Elicons from "@element-plus/icons-vue"
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import '@/api/mock.js'


const app = createApp({
    created:() => {
        store.commit('tab/getMenu')
        console.log(store.state.tab.menu)
        if(store.state.tab.menu.length > 0){
           router.push({name:'Home'})
        }
    },
    mounted:() => {},
    render:() => h(App),
})

// app.use(ElementPlus)
// 全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
    app.component(key,Elicons[key])
})

app.use(store)
app.use(router)

// 配置请求根路径
// axios.defaults.baseURL = 'https://xxx'

app.config.globalProperties.$http = axios

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm


app.mount('#app')
