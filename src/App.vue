<template>
    <div id="app">
       <vueVideoTape 
			:playerOptions="options"
			ref="tape"
			:screenshoted = "screenshoted"
			:startCaptured = "startCaptured"
			:stopCaptured = "stopCaptured"
			@imageData="imageData"
			@videoData="videoData"></vueVideoTape>
	   <button @click="image">截图</button>
	   <button @click="start">开始录像</button>
	   <button @click="stop">停止录像</button>
	   <img :src="base64" alt="">
	   <video :src="rtmp" autoplay="true"></video>
    </div>
</template>
<script>

import vueVideoTape from './tape/tape'

export default  {
    data(){
        return{
			base64:'',
			rtmp:'',
			options:{
				width:600,
				sources:[
					{
						src:'http://hls01open.ys7.com/openlive/426a3ffab5734110bb6955b889241910.m3u8'
					}
				]
			},
			screenshoted:false,
			startCaptured:false,
			stopCaptured:false,


        }
    },
    components:{
       vueVideoTape
	},
	methods:{
		//测试截图
		image(){
			// this.base64 = this.$refs.tape.screenshot();
			this.screenshoted = true;
		},

		//开始录像
		start(){
			// this.$refs.tape.startCapture();
			this.startCaptured = true;
		},

		//测试录像
		stop(){
			 
			// this.$refs.tape.stopCapture();
			this.stopCaptured = true;
		},

		imageData(base64){
			this.base64 = base64;
			this.screenshoted = false;
		},
		videoData(url,file){
			console.log(file,'00000000000');
			this.rtmp = url;
			this.startCaptured = false;
			this.stopCaptured = false;
		}
	}
}
</script>