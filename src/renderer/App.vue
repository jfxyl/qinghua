<template>
  <div class="big-continer" id="app">
    <div class="mWrap">
      <div class="header">
        <h1 class="title ">华北水利水电大学融媒体中心</h1>
        <p class="times cr74">{{curTime}}</p>
      </div>
      <div class="continer">
        <div class="clearfix">
          <!-- 左边 -->
          <div class="left-warp por w505 fl">
            <i class="icons icon-arrow1"></i>
            <i class="icons icon-arrow2"></i>
            <i class="icons icon-arrow3"></i>
            <i class="icons icon-arrow4"></i>
            <!-- 官方微博 -->
            <div class="plane h550">
              <div class="plane-title">官方微博<i class="icons icon-tit"></i></div>
              <div class="plane-body">
                <div class="title1 clearfix">
                  <div class="fensi ovhidden">
                    <div class="img"><img :src="wbAcount.avatar" /></div>
                    {{wbAcount.nickname}}
                  </div>
                  <div class="fensi ar">
                    <i class="icons icon-fs"></i>粉丝：{{wbAcount.flowers_count}}
                  </div>
                  <div class="fensi ar">
                    <i class="icons icon-wb"></i>微博：{{wbAcount.status_count}}
                  </div>
                </div>
                <div class="echart-warp o-hidden clearfix">
                  <div class="news-warp h430" id="FontScroll">
                    <ul class="news newscro1">
                      <li class="news-li clearfix" v-for="(item,index) in wbList" :key="index" ref="rollul" :class="{anim:animate.anim1==true}">
                        <div class="in">
                          <p class="title fs16 crc8 ovhidden">{{item.content}}</p>
                          <p class="ar cr74">{{time(item.create_time)}}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 中间 -->
          <div class="mid-warp w814 mt38 fl por">
            <i class="icons icon-arrow1"></i>
            <i class="icons icon-arrow2"></i>
            <i class="icons icon-arrow3"></i>
            <i class="icons icon-arrow4"></i>
            <!-- 本地视频 -->
            <div class="plane h510 bg4">
              <div class="plane-title">本地视频播放<i class="icons icon-tit"></i></div>
              <div class="plane-body pt0 por">
                <video class="video1" id="video_id" :src="videoSrc"  width="" height="" autoplay="autoplay" muted></video>
              </div>
            </div>
          </div>

          <!-- 右边 -->
          <div class="right-warp w505 fl por">
            <i class="icons icon-arrow1"></i>
            <i class="icons icon-arrow2"></i>
            <i class="icons icon-arrow3"></i>
            <i class="icons icon-arrow4"></i>
            <!-- 融媒体联盟榜单 -->
            <div class="plane h550">
              <div class="plane-body pt0 o-hidden por" id="demo1">
                <div class="plane-title">融媒体联盟榜单<i class="icons icon-tit"></i></div>
                <div id="myCarousel" class="carousel slide " data-ride="carousel">
                  <!-- 轮播（Carousel）指标 -->
                  <ol class="carousel-indicators tab_menu big clearfix" style="">
                    <li data-target="#myCarousel" data-slide-to="0" :class="{'active':curNav==0}" @click="navTab(0)">微信</li>
                    <li data-target="#myCarousel" data-slide-to="1" :class="{'active':curNav==1}" @click="navTab(1)">微博</li>
                  </ol>
                  <!-- 轮播（Carousel）项目 -->
                  <div class="carousel-inner">
                    <div class="item slide-item2" :class="carouse1">
                      <div class="table-warp">
                        <table class="table" width="100%" border="0" cellpadding="0" cellspacing="0">
                          <colgroup>
                            <col width="12%">
                            <col width="53%">
                            <col width="20%">
                          </colgroup>
                          <thead>
                          <tr>
                            <th>排名</th>
                            <th>公众号</th>
                            <th>
                              <div class="fem por">WCI</div>
                            </th>
                          </tr>
                          </thead>
                          <tbody :v-if="rankList!=''">
                          <tr v-for="(item,index) in rankList.weixin" :key="index">
                            <td>
                              <i :class="'icons no' +(index+1)" v-if="index<=2">{{index+1}}</i>
                              <i class="num" v-if="index>2">{{index+1}}</i>
                            </td>
                            <td>
                              <span class="ovhidden fem fl">{{item.wx_nickname}}</span>
                            </td>
                            <td>{{filterNum(item.wci)}}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="item slide-item1" :class="carouse2">
                      <div class="table-warp">
                        <table class="table" width="100%" border="0" cellpadding="0" cellspacing="0">
                          <colgroup>
                            <col width="15%">
                            <col width="50%">
                            <col width="20%">
                          </colgroup>
                          <thead>
                          <tr>
                            <th>排名</th>
                            <th>微博号</th>
                            <th>
                              <div class="fem por">BCI</div>
                            </th>
                          </tr>
                          </thead>
                          <tbody :v-if="rankList!=''">
                          <tr v-for="(item,index) in rankList.weibo" :key="index">
                            <td>
                              <i :class="'icons no' +(index+1)" v-if="index<=2">{{index+1}}</i>
                              <i class="num" v-if="index>2">{{index+1}}</i>
                            </td>
                            <td>
                              <span class="ovhidden fem fl">{{item.weibo_nickname}}</span>
                            </td>
                            <td>{{item.bci}}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="clearfix mt30">
          <!-- 左边 -->
          <div class="left-warp w673 fl por">
            <i class="icons icon-arrow1"></i>
            <i class="icons icon-arrow2"></i>
            <i class="icons icon-arrow3"></i>
            <i class="icons icon-arrow4"></i>
            <!-- 媒体华水 -->
            <div class="plane h362">
              <div class="plane-title">媒体华水<i class="icons icon-tit"></i></div>
              <div class="plane-body">
                <div class="news-warp media-li h290" id="FontScroll">
                  <ul class="news mt5 newscro2">
                    <li class="news-li clearfix" v-for="(item,index) in mediaList" :key="index" ref="rollul1" :class="{anim:animate.anim2==true}">
                      <span class="cr74 fr">{{time(item._source.news_postdate)}}</span>
                      <i class="num ac">{{item.ind}}</i>
                      <p class="title fs16 crc8 ovhidden">{{item._source.news_title}}</p>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 中间 -->
          <div class="mid-warp w478 fl por">
            <i class="icons icon-arrow1"></i>
            <i class="icons icon-arrow2"></i>
            <i class="icons icon-arrow3"></i>
            <i class="icons icon-arrow4"></i>
            <!-- 热门词云 -->
            <div class="plane h362">
              <div class="plane-title">热门词云<i class="icons icon-tit"></i></div>
              <div class="plane-body pt0">
                <div class="echart-warp mt0 h290">
                  <cloudChart id="wordCloud" :dataArray="defaultWords" v-if="defaultWords!= ''"></cloudChart>
                </div>
              </div>
            </div>
          </div>

          <!-- 右边 -->
          <div class="right-warp w673 fl por">
            <i class="icons icon-arrow1"></i>
            <i class="icons icon-arrow2"></i>
            <i class="icons icon-arrow3"></i>
            <i class="icons icon-arrow4"></i>
            <!-- 矩阵热文 -->
            <div class="plane h362">
              <div class="plane-title mb0">矩阵热文<i class="icons icon-tit"></i></div>
              <div class="plane-body">
                <div class="news-warp h290" id="FontScroll">
                  <ul class="news newscro3">
                    <li class="news-li clearfix" v-for="(item,index) in hotList" :key="index" ref="rollul2" :class="{anim:animate.anim3==true}">
                      <div class="in">
                        <p class="title fs16 crc8 ovhidden">{{item.news_title}}</p>
                        <p class="cr74 clearfix"><span class="fr">{{time(item.news_posttime)}}</span><span>{{item.wx_nickname}}</span></p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const ipcRenderer = require('electron').ipcRenderer;
  import cloudChart from './components/wordCloud.vue';
  export default {
    components:{
      cloudChart
    },
    name: 'App',
    data() {
      return {
        curTime:'',
        animate:{
          anim1:true,
          anim2:true,
          anim3:true,
        },
        wbAcount:[],//官方微博账号
        wbList:[],//官方微博
        mediaList:[],//媒体华水
        defaultWords:[],//热门词云
        scrollList:[],
        rankList:[],//融媒体联盟榜单
        hotList:[],//矩阵热文
        curNav:0,
        carouse1:'active',
        carouse2:'',
        timer:null,
        timeOut:null,
        firstTime:true,
        videoList:[],//视频列表
        videoLen:0,//视频列表个数
        currVideoVideo:0,  //当前播放的视频 
        lvId:'',
        videoSrc:'',
      }
    },
    created() {
      this.getDate()
    },
    mounted(){
      let that = this;
      that.$nextTick(()=> {
        that.$utils.setScreen();
        that.wbAjax();//官方微博
        that.mediaAjax();//媒体华水
        that.rankAjax();//融媒体联盟榜单
        that.wordCloudAjax();//热门词云
        that.hotAjax(); //矩阵热文
        that.videoAjax();
        setInterval(that.haveChange,2000)
        setInterval(that.getDate,1000);
      })
    },
    methods: {
      // code判断
      returnCode (data,callback) {
        let code = parseInt(data.code);
        if(code === 1){
          callback();
        }else{
          if(data.msg != undefined){
            this.$utils.alertText(data.msg);
          }
        }
      },
      getDate() {
        // nowDate = new Date();
        let date = new Date();
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        this.curTime =  y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;

      },
      time(t){
        let tm = t.split(' ')[0];
        return tm.split('-').join('/');
      },
      filterNum(val){
        return parseFloat(val).toFixed(2)
      },
      haveChange(){
        let that = this;
        that.$api.get('havachange',null,r =>{
          that.returnCode(r,function(){
            if(r.data == "1"){
              that.wordCloudAjax()
            }else if(r.data == "2"){
              that.videoAjax();
            }
          })
        })

      },
      //官方微博
      wbAjax () {
        let that = this;
        that.$api.get('wb_account',null,r =>{
          that.returnCode(r,function(){
            that.wbAcount = r.data;
          })
        })
        that.$api.get('getwb_list',null,r =>{
          that.returnCode(r,function(){
            that.wbList = r.data;
            let len = that.wbList.length;
            r.data.forEach(ele => {
              that.wbList.push(ele)
            });
            //setInterval(that.scroll,3157,0,'rollul','70') 
            that.scroll(len,70,1);
          })
        });
      },

      //媒体华水
      mediaAjax () {
        let that = this;
        that.$api.get('mths_list',null,r =>{
          that.returnCode(r,function(){
            let len = r.data.length;
            r.data.forEach((item,index)=>{
              if(index<9){
                item.ind = "0"+(index+1);
              }else{
                item.ind = index+1;
              }
            })
            that.mediaList = r.data;
            r.data.forEach(ele => {
              that.mediaList.push(ele)
            });
            that.scroll(len,58,2);
            //setInterval(that.scroll,9899,1,'rollul1','58')
          })
        })
      },
      //融媒体联盟榜单
      rankAjax(){
        let that = this;
        that.$api.get('media_alliance',null,r =>{
          that.returnCode(r,function(){
            if(r.data != null){
              that.rankList = r.data;
              that.timer = setTimeout(that.scroll1,2900)
            }
          })
        })
      },
      //矩阵热文
      hotAjax(){
        let that = this;
        that.$api.get('hot_article',null,r =>{
          that.returnCode(r,function(){
            that.hotList = r.data;
            let len = that.hotList.length;
            r.data.forEach(ele => {
              that.hotList.push(ele)
            });
            that.scroll(len,70,3);
          })
        })
      },
      wordCloudAjax(){
        let that = this;
        that.defaultWords = [];
        that.$api.get('words_clouds',null,r =>{
          that.returnCode(r,function(){
            //console.log(r.data);
            for(let i in r.data){
              let temp = {};
              temp.name = r.data[i].key;
              temp.value =  r.data[i].doc_count;
              that.defaultWords.push(temp);
            }
          })
        })
      },
      //本地视频
      play(id){
        let that = this;

        if(that.firstTime){
          that.firstTime=false;
          that.currVideo = 1;
        }

        let video = document.getElementById(id);
        that.videoSrc = that.videoList[that.currVideo].url;
        video.load();
        //console.log(video.src);
        video.play();
        that.lvId = that.videoList[that.currVideo].id;
        that.$api.get('local_video_ing',{lvid:that.lvId},r =>{
        });
        that.currVideo++;
        if(that.currVideo >= that.videoLen){
          that.currVideo = 0; // 播放完了，重新播放 
        }
      },
      videoAjax(){
        let that = this;
        that.videoList=[];
        that.$api.get('local_video',null,r =>{
          that.returnCode(r,function(){
            that.videoList = r.data;
            that.videoLen = that.videoList.length;//播放列表的长度
            let video = document.getElementById("video_id");
            that.videoSrc = that.videoList[0].url;
            video.play();
            that.lvId = that.videoList[0].id;
            that.$api.get('local_video_ing',{lvid:that.lvId},r =>{});
            video.addEventListener('ended', function(){
              that.play('video_id');

            });
          })
        })
      },
      scroll(len,param,index){
        let style = document.styleSheets[0];
        let keyframe = '';
        for (let i = 0; i <= len; i++) {
          let tmp  = i*100/len+'%{transform: translateY(-'+i*param+'px);}'
          keyframe +=tmp;
        }
        console.log(keyframe);
        style.insertRule("@keyframes scrollText"+index+"{"+keyframe+"}",0);//写入样式
      },
      // scroll(type,relName,ht){
      //   let that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      //   let con1 = that.$refs[relName];
      //   con1[0].style.marginTop = ht + 'px';
      //   that.animate['anim'+(type+1)]=!that.animate['anim'+(type+1)];
      //   setTimeout(function(){
      //     that.scrollList[type].push(that.scrollList[type][0]);
      //     that.scrollList[type].shift();
      //     con1[0].style.marginTop='0px';
      //     that.animate['anim'+(type+1)]=!that.animate['anim'+(type+1)];  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      //   },20)
      // },
      scroll1(){
        let that = this;
        that.curNav = (that.curNav==0)? 1 : 0;
        clearTimeout(that.timeOut);
        if(that.curNav==1){
          that.carouse1 = 'active left';
          that.carouse2 = 'next';
        }else{
          that.carouse1 = 'next';
          that.carouse2 = 'active left';
        }
        setTimeout(function(){
          if(that.curNav==1){
            that.carouse2 = 'next left';
          }else{
            that.carouse1 = 'next left';
          }
        },50);
        that.timeEnd();
      },
      navTab(type){
        let that = this;
        that.curNav = type;
        clearTimeout(that.timeOut);
        clearTimeout(that.timer);

        if(that.curNav==1){
          that.carouse1 = 'active left';
          that.carouse2 = 'next';
        }else{
          that.carouse1 = 'prev';
          that.carouse2 = 'active right';
        }
        setTimeout(function(){
          if(that.curNav==1){
            that.carouse2 = 'next left';
          }else{
            that.carouse1 = 'prev right';
          }
        },1);
        that.timeEnd();
      },
      timeEnd(){
        let that = this;
        that.timeOut = setTimeout(function(){
          if(that.curNav==1){
            that.carouse1 = '';
            that.carouse2 = 'active';

          }else{
            that.carouse1 = 'active';
            that.carouse2 = '';
          }
          clearTimeout(that.timer);
          that.timer = setTimeout(that.scroll1,9900)
        },1000);
      },
    },
    watch:{
        videoSrc(){
            console.log(this.videoSrc)
            ipcRenderer.send('download-main-video', this.videoSrc)
        }
    }
  }
</script>

<style>
  @import "./style/animate.css";
  @import "./style/style.css";
</style>
