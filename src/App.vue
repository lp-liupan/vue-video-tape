<template>
    <div id="app">
       <vueVideoTape :playerOptions="options" ref="tape"></vueVideoTape>
	   <button @click="image">截图</button>
	   <button @click="start">开始录像</button>
	   <button @click="stop">停止录像</button>
	   <img :src="base64" alt="">
	   <video :src="rtmp"></video>
    </div>
</template>
<script>

import vueVideoTape from './tape/tape'

export default  {
    data(){
        return{
			base64:'',
			rtmp:'',
			options:{},

        }
    },
    components:{
       vueVideoTape
	},
	methods:{
		//测试截图
		image(){
			this.base64 = this.$refs.tape.screenshot();
		},

		//开始录像
		start(){
			this.$refs.tape.startCapture();
		},

		//测试录像
		stop(){
			this.rtmp = this.$refs.tape.stopCapture();
		}
	}
}
</script>