import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './type.js'


Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		user:{},
		token:null,
		title:''
	},//数据源
	mutations:{
		[types.LOGIN]:(state,data)=>{
			localStorage.token=data;
			state.token=data;
		},
		[types.LOGOUT]:(state)=>{
			localStorage.removeItem('token');
			state.token=null;
		},
		[types.TITLE]:(state,data)=>{
			localStorage.removeItem('token');
			state.tite='test';
		},
	} // 修改状态

})
