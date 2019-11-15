<template>
  <div>
    <vue-simple-suggest
      v-model="chosen"
      :filter-by-query="true"
      :list="simpleSuggestionList"
    >
    <!-- <input v-model="text"> -->
    </vue-simple-suggest>
  
    <br>
  
    <p>Chosen element: {{ chosen }}</p>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css' // Optional CSS
// import '_' from 'lodash'
var _ = require('lodash');

  export default {
    components: {
      VueSimpleSuggest
    },
    data() {
      return {
        chosen: '',
        text: ''
      }
    },
    watch: {
      chosen: function(){
        this.simpleSuggestionList()
      }
    },
    methods: {
      simpleSuggestionList: _.debounce( 
        function() {
          return [
            'Vue.js',
            'React.js',
            'Angular.js',
            'khong'
          ]
        }, 
        // Đây là thời gian (đơn vị mili giây) chúng ta đợi người dùng dừng gõ.
        1500
      ) 
    }
  }
</script>

<style>

</style>
