
## 安装

``` bash
npm install vue-video-tape
```

## 全局引入

``` javascript
improt VueVideoTape from "vue-video-tape";
Vue.use(VueVideoTape);
```

## 组件内引入

```javascript
improt {VueVideoTape} from "vue-video-tape";

export default {
	components:{VueVideoTape}
}
```

## 属性

|属性名|属性值|是否必填|介绍|
|:-:|:-:|:-:|:-:|
|playerOptions|Object|true|video配置(参考[videojs文档](https://docs.videojs.com/ "videojs"))|
|videoFileName|String|false|录制视频结束后返回的文件名|
|screenshoted|Boolean|false|当为true时,触发截图事件|
|startCaptured|Boolean|false|当为true时,开始录制|
|stopCaptured|Boolean|false|当为true时,停止录制|

## 事件

|事件名|参数|介绍|
|:-:|:-:|:-:|
|videoData|url,file|录制结束后触发,第一个参数是可以直接播放的url,第二个参数是返回的视频文件|
|imageData|base64|截图成功后触发,返回截图的base64|

## 手动事件

>如果觉得使用属性控制事件的方式比较麻烦,可以直接调用组件的事件进行操作.

|事件名|介绍|
|:-:|:-:|
|screenshot|截图|
|startCapture|开始录制|
|stopCapture|结束录制|

>使用方法(通过`ref`属性,父组件调用子组件的方法):
```html
<template>
    <div>
        <VueVideoTape 
		:playerOptions='options' 
		ref="videotape"
		@imageData="imageData"
		@videoData="videoData"
		></VueVideoTape>
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
			//截图
			this.$refs.videotape.screenshot();
		},
		start(){
			//开始录制
			this.$refs.videotape.startCapture();
		},
		stop(){
			//结束录制
			this.$refs.videotape.stopCapture();
		},

		//截图成功回调事件
		imageData(base64){},

		//录制成功回调事件
		videoData(url,file){},
    },
    components:{
        VueVideoTape
    }
}
</script>
```

