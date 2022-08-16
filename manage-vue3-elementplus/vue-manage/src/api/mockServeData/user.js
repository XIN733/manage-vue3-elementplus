import Mock from 'mockjs'

// get请求从confin.url获取参数，post从confit.body中获取参数
function param20bj(url){
    const search = url.split('?')[1]
    if(!search){
        return
    }
    return JSON.parse(
        '{"'+
        decodeURIComponent(search)
          .replace(/"/g,'\\"')
          .replace(/&/g,'","')
          .replace(/=/g,'":"') +
        '"}'
    )
}

let List = []
const count = 200
for(let i=0;i<count;i++){
    List.push(
        Mock.mock({ //模拟数据
            id:Mock.Random.guid(),
            name:Mock.Random.cname(),
            addr:Mock.mock('@county(true)'),
            'age|18-60':1,
            birth:Mock.Random.date(),
            sex:Mock.Random.integer(0,1)
        })
    )
}

export default{
    /**
     * 获取用户列表
     * get
     * 要带参数  name,page,limit; name可以不填, page,limit有默认值
     * @param: name,page,limit
     * @return {{code:number,count：number,data: *[]}}
     */
    getUserList:config => {
        console.log(config)
        // const {name,page=1,limit=20}=param20bj(config.url)
        const {name,page=1,limit=20}=JSON.parse(config.body)
        console.log('name:'+name,'page:'+page,'分页大小limit:'+limit)
        const mockList = List.filter(user => {
            if(name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item,index) => index < limit * page && index >= limit * (page -1))
        return{
            code:20000,
            count:mockList.length,
            list:pageList
        }
    },
    /**
     * 增加用户 
     * post
     * @param: name,addr,age,birth,sex 
     * @return {{coode:number,data:{message:string}}}
     */
    createUser:config => {
        const {name,addr,age,birth,sex} = JSON.parse(config.body)
        List.unshift({
            id:Mock.Random.guid(),
            name:name,
            addr:addr,
            age:age,
            birth:birth,
            sex:sex
        })
        return {
            code:20000,
            data:{
                message:"添加成功"
            }
        }
    },
    /**
     * 删除用户
     * get
     * @param: id
     * @return {*}
     */   
    deleteUser:config => {
        const id = config.body
        if(!id){
            return{
                code:-999,
                message:"参数不正确"
            }
        }else{
            List = List.filter(u => u.id !== id)
            return{
                code:20000,
                message:'删除成功'
            }
        }
    },
    /**
     * 批量删除 
     * get
     * @param:config 
     * @return {{code:number,data:{message:string}}}
     */    
    batchremove:config => {
        let { ids } = param20bj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return{
            code:"批量删除成功"
        }
    },
    /**
     * 修改用户
     * post
     * @param: id,name,addr,age,birth,sex 
     * @return {{code:number,data:{message:string}}}
     */   
    updateUser:config => {
        const {id,name,addr,age,birth,sex} = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if(u.id === id){
                u.name = name
                u.addr = addr
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code:20000,
            data:{
                message:'编辑成功'
            }
        }
    }
}


