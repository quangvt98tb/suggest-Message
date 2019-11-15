<template>
  <div>
    <div class="container">
        <Logo>
          <li v-for="item in messages">
            {{ item }}
          </li>
        </Logo>
        <div class="my-container">
          <div class="backdrop">
            <HighlightText
              class="my-highlight"
              highlightClassName="highlight"
              :queries="list"
            >{{text}}</HighlightText>
          </div>

          <b-form-textarea
            type="text"
            ref="form"
            class="myForm"
            id="textarea"
            v-model.trim="text"
            placeholder="Enter something..."
            rows="6"
            cols="6"
            @keyup.enter="sendMessage()"
          ></b-form-textarea>
          
          <div
            class="suggest-list"
            :style="{top: top + 'em', left: left + 'em'}"
          >
            <scrollBar class="wrap" barYMinHeight="3" :scrollTrackStyle="scrollTrackStyle">
              <b-list-group>
                <b-list-group-item
                  class="suggest-word"
                  v-for="(item, index) in list"
                  :key="index"
                  @click="chooseWord(item)"
                >{{item}}</b-list-group-item>
              </b-list-group>
            </scrollBar>
            <div>
              <button class="btn btn-success" type="button" @click="sendMessage()" >Basic</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
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
      top: 2,
      left: 0
    };
  },
  watch: {
    text: function() {
      this.list = [];
      this.startCursor = this.text.length - 1;
      this.getSuggest();
    }
  },
  computed: {
   
  },

  methods: {
    sendMessage() {
      
      this.messages.push(this.text);
      this.text = "";
    },
    chooseWord(item) {
      if(!_.endsWith(this.text,' ')) {
        this.text = this.text + " " + item
        this.$refs.form.focus();
      } else {
        this.text = this.text + item
        this.$refs.form.focus();
      }
    },
    getSuggest: _.debounce(
      function() {
        //
        this.left = 0.45 * (this.startCursor % 135);
        this.top = 2 + this.startCursor / 135;
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
          this.list= ["hieuoc", "ngusi", "danhdon","haha"]
        }
        else {
          textInput = this.text.slice(endPosition + 1);
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
.my-container {
  position: relative;
}

.my-container .backdrop {
  display: block;
  position: absolute;
  left: 0.8em;
  top: 0.4em;
  color: transparent;
  background-color: transparent;
  font-size: 1em;
  white-space: pre-wrap;
  /* z-index: 1; */
}

.my-container .myForm {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  color: black;
  /* color: transparent; */
  background-color: transparent;
  font: 1em sans-serif;
  line-height: 1.45em;
  /* z-index: 1; */
  letter-spacing: 0;
  word-spacing: normal;
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
  height: 2em;
  background-color: rgb(82, 255, 189);
}

.wrap {
  height: 6em;
  width: 8em;
}
</style>
