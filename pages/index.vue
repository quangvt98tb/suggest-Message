<template>
  <div>
    
    <div class="jumbotron jumbotron-fluid" >

          <b-form-textarea
            type="text"
            ref="form"
            class="myForm"
            id="textarea"
            v-model.trim="text"
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

    <h3>Messages</h3>
    <div v-for="(message,index) in messages" :key="index" class="container" >
      <p>{{message.text}}</p>
      <span class="time-right">{{message.time}}</span>
    </div>
    
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapState, mapActions } from "vuex";
var _ = require('lodash');
import axios from 'axios';

export default {
  components: {
    Logo
  },
  data() {
    return {
      isMounted: false,
      messages: [],
      //isMessage: false,
      text: "",
      list: [],
      
    };
  },
  watch: {
    text: function() {
      this.list = [];
      this.getSuggest();
    }
  },
  computed: {
  // ...mapState("sugesstMessage", ["listSuggest"]),
  },

  methods: {
    //...mapActions("sugesstMessage", ["getSuggestM"]),
    sendMessage() {
      let m = {};
      let date = Date();
      let time = date.substring(16,25);
      m.text = this.text;
      m.time = time;
      this.messages.push(m);
      this.text = "";
    },
    getSuggest: _.debounce(
      async function() {
        //console.log(1);
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
        
        if (endPosition === -1 ) {
        
          let textInput = {
            "sentence": this.text
          }
          let jsonObj = JSON.stringify(textInput)
         
          axios.post('http://192.168.0.109:8890/api', 
            jsonObj
            )
            .then( res => {
              let obj = res.data 
              this.list = obj.next
            }
            ).catch(err => {
                console.log("error")
                console.log(err)
              }
            );
        }
        else {
          textInput = this.text.slice(endPosition + 1);
          
          axios.post('https://192.168.0.109:8890/api', textInput)
            .then( res => {
              let obj = res.data 
              this.list = obj.next
            }
            ).catch(err => {
                console.log(err)
              }
            );
         
        }
        
      },
      // Đây là thời gian (đơn vị mili giây) chúng ta đợi người dùng dừng gõ.
      2500
    )
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style>

.container {
  border: 1px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px;
  margin: 5px 0;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}
/* */
/* .my-highlight,
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
} */
</style>
