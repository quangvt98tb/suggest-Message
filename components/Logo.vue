<template>
	<div class="container">
	  <li v-for="(message,index) in messages" :key="index">{{message}}</li>
	  <span class="time-right">now</span>
	</div>
</template>

<scrip>
export default {
	props: {
		messages: {
			type: Array,
			default: []
		}
	},

};
</scrip>

