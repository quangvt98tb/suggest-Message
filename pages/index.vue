<template>
  <div>
    
    <div class="jumbotron jumbotron-fluid" >

          <b-form-textarea
            type="text"
            ref="form"
            class="myForm"
            id="textarea"
            v-model.trim="text"
            row="6"
            col="6"
            placeholder="Enter something..."
            @keyup.enter="sendMessage()"
          ></b-form-textarea>

          <ul class="list-group list-group-horizontal" >
            <li class="list-group-item" v-for="(item, index) in list" :key="index">{{ item }}</li>
          </ul>

          <div>
            <button class="btn btn-success" type="button" @click="sendMessage()" >Send Message</button>
          </div>
        
    </div>

    <Logo>
      <li v-for="(item,index) in messages" :key="index">
        {{ item }}
        </li>
    </Logo>
    
  </div>


</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapState, mapActions } from "vuex";
var _ = require('lodash');

export default {
  components: {
    Logo
  },
  data() {
    return {
      isMounted: false,
      messages: [],
      text: "",
      startCursor: 0,
      list: [],
      scrollTrackStyle: {
        backgroundColor: "white"
      },
      top: 3,
      left: 0
    };
  },
  watch: {
    text: function() {
      this.list = [];
      this.getSuggest();
    }
  },
  computed: {
   ...mapState("sugesstMessage", ["listSuggest"]),
  },

  methods: {
    ...mapActions("sugesstMessage", ["getSuggest"]),
    sendMessage() {
      
      this.messages.push(this.text);
      this.text = "";
    },
    getSuggest: _.debounce(
      async function() {
        //
        this.left = 0.45 * (this.startCursor % 135);
        this.top = 3 + this.startCursor / 135;
        //
        if (this.text == ""){
          this.list = []
          return 
        }
        if( _.endsWith(this.text,'.'))
	      	{	
            this.list = [];
            return
          }
        var endPosition = Number(this.text.lastIndexOf('.'));
        var textInput;
        if (endPosition === -1 ) {
          textInput = this.text;
          // await this.getSuggest(textInput);
          // this.list = this.listSuggest;

          this.list= ["hieuoc", "ngusi", "danhdon","haha"]
        }
        else {
          textInput = this.text.slice(endPosition + 1);
          // await this.getSuggest(textInput);
          // this.list = this.listSuggest;
          this.list= ["fifa", "ngu", "vl"]
        }
        
        
      },
      // Đây là thời gian (đơn vị mili giây) chúng ta đợi người dùng dừng gõ.
      2000
    )
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style>
.container {
  margin-left: 5em;
  margin-right: 5em; 
}

.my-highlight,
.my-highlight * {
  padding: 0;
  margin: 0;
  font: 1em;
  color: transparent;
  word-spacing: normal;
  letter-spacing: 0;
  white-space: pre-wrap;
}

.highlight {
  letter-spacing: 0;
  color: transparent;
  background-color: yellow;
  padding: 0;
  margin: 0;
  word-spacing: normal;
  white-space: pre-wrap;
}

.suggest-list {
  position: absolute;
}

.suggest-word {
  height: 2em;
}

.suggest-word:hover {
  height: 3em;
  background-color: rgb(82, 255, 189);
}

.wrap {
  height: 7em;
  width: 8em;
}
</style>
