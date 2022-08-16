/* 
添加一个登录凭证token，token在登录的时候通过接口请求将用户名和密码传给后端，后端在数据库
中匹配成功后返回一个凭证，前端将token缓存起来，在调用接口时传给后端验证就建立了登录权限效验
*/
import Cookies from 'js-cookie'

const user = {
    namespaced: true,
    state:{
        token:'',
    },
    mutations:{
        setToken(state,val){
            state.token = val
            Cookies.set('token',val)
        },
        clearToken(state){
            state.token = ''
            Cookies.remove('token')
        },
        getToken(state){
            state.token = state.token ||  Cookies.get('token')
        }
    }
}
export default user