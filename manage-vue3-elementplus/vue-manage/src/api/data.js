import axios from "./axios";

export const getMenu = (param) => {
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
}

export const getData = (param) => {
    return axios.request({
        url:'/home/getData',
        method:'get',
        data:param
    })
}

export const getUserList = (param) => {
    return axios.request({
        url:'/user/getUserList',
        method:'get',
        data:param
    })
}

export const addUser = (param) => {
    return axios.request({
        url:'/user/addUser',
        method:'post',
        data:param
    })
}

export const editUser = (param) => {
    return axios.request({
        url:'/user/editUser',
        method:'post',
        data:param
    })
}

export const delUser = (param) => {
    return axios.request({
        url:'/user/deleteUser',
        method:'get',
        data:param
    })
}
