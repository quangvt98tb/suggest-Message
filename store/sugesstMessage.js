import {
  set
} from '@/util/actions'

export const state = () => {
  return {
    api: {
      api: '/'
    },
    listSuggest: [],
  }
}

export const mutations = {
	SET_SUGGEST_LIST: set('listSuggest'),
}

export const actions = { 
	async getSuggestM(
    { state, commit },
    text
  ) {
    const { api } = state.api

    try {
      console.log(text)
      const query = { sentence: text }
      const data = await this.$axios.$post(`${api}`, query )
      console.log("data", data)
  	  commit('SET_SUGGEST_LIST', data)
  	  
    } catch (err) {
      console.log('getSuggest', err)
    }
  },
}