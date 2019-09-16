<template>
    <div>
        <videoPlayer 
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        ></videoPlayer>
    </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player';
import 'videojs-contrib-hls'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import RecordRTC from 'recordrtc';

export default {
    name:'tape',
    props:{
        //视频配置
        playerOptions:{
            type:Object,
            required:true
		},

        //视频文件名
        videoFileName:{
            type:String,
            required:false,
            default:'录制视频文件'
        }
    },
    data(){
        return{
            recorder:'',//临时保存录像的视频流
        }
    },
    created(){

    },
    methods:{

        //截图事件
        screenshot() {

            //获取video元素
            let video = this.$refs.videoPlayer;
            let videoEl = video.player.tech({
                IWillNotUseThisInPlugins: true
            }).el();

            //创建一个canvas
            let canvasEl = document.createElement('canvas');
            canvasEl.width = videoEl.videoWidth;
            canvasEl.height = videoEl.videoHeight;

            //截图
            let ctx = canvasEl.getContext('2d');
            ctx.drawImage(videoEl, 0, 0, 544, 960, 0, 0, 544, 960);

            //把截图保存下来(base64)
            let image = canvasEl.toDataURL('image/png');

            return image;

        },

        //开始录像事件
        startCapture() {

            //获取video元素
            let video = this.$refs.videoPlayer;
            let videoEl = video.player.tech({
                IWillNotUseThisInPlugins: true
            }).el();

            //获取视频流
            let stream = videoEl.captureStream();

            //将视频流注入到recordRTC
            this.recorder = RecordRTC(stream, {
                type: 'video'
            });

            //开始录制
            this.recorder.startRecording();
        },

        //停止录像事件
       stopCapture() {

            //停止录制
            this.recorder.stopRecording(() => {

                //获取录制的blob对象
                let blob = this.recorder.getBlob();
                this.videoFile = this.recorder.getBlob();

                //将blob转换为可以供video播放的url
                let url = URL.createObjectURL(blob);

                //将blob对象转换为文件
                let fileName = this.videoFileName+".webm";
                let fileObject = new File([blob], fileName, {
                    type: 'video/webm'
				});     
				
				console.log('11111111');
				this.videoData({url,fileObject});
			});
			function video2file(){
				
			}		
		},
		
		//返回视频文件和url
		videoData(videoData){
			this.$emit('videoData',videoData);
		}
	},
	watch:{

	},
    components:{
        videoPlayer
    }
}
</script>