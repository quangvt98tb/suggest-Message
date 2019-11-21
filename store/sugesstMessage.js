import {
  set
} from '@/util/actions'

export const state = () => {
  return {
    api: {
      api: '/api/'
    },
    listSuggest: [],
  }
}

export const mutations = {
	SET_SUGGEST_LIST: set('tacNhanList'),
}

export const actions = { 
	async getSuggest(
    { state, commit },
    text
  ) {
    const { api } = state.api

    try {
      const data = await this.$axios.$post(`${api}/`, text )
  	  commit('SET_SUGGEST_LIST', listSuggest)
  	  
    } catch (err) {
      console.log('getSuggest', err)
    }
  },
}