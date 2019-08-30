# vue-video-tape

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install vue-video-tape

```

```html
<template>
    <div>
        <VueVideoTape :playerOptions='options' ref="videotape"></VueVideoTape>
    </div>
</template>
<script>
import VueVideoTape from 'vue-video-tape'

export default {
    data(){
        return{
            options:{
				width:600,
				sources:[
					{
						src:'http://.........'
					}
				]
			}
        }
    },
    methods:{

		
		image(){
			//截图事件，返回图片base64
			let image = this.$refs.videotape.screenshot();
		},

		start(){
			//开始录制
			this.$refs.videotape.startCapture();
		},

		stop(){
			//结束录制，返回视频文件
			let video = this.$refs.videotape.stopCapture();
		}

    },
    components:{
        VueVideoTape
    }
}
</script>

```
