import axios from 'axios';

let base = '';

export const fetchList = params => { return axios.get(`${ base }/user/list`, {params: params}); };

export const editUser = params => { return axios.post(`${ base }/user/edit`, params); };

export const postError = params => { return axios.get(`${ base }/error`, {params: params}); };

export const requestLogin = params => { return axios.post(`${ base }/login`, params).then(res => res.data); };

export const fetchAwardList = params => {return axios.get(`${ base }/getAward`).then(res => res.data); };

export const saveActivity = params => {return axios.post(`${ base }/saveActivity`).then(res => res.data); };
