<template>
  <div class="main">
    <view class="cpt-mask" v-if="isShow">
      <view class="leftTitle">处置提示</view>
      <view class="leftLable"
        >站点级别:
        {{ polluteManageLevelLabel }}
      </view>
      <view class="leftLable"
        >处置类型:
        <radio-group @change="flagChange">
          <label class="radio" style="margin-right: 30rpx">
            <radio value="0" style="transform: scale(0.7)" />正常条件
          </label>
          <label class="radio">
            <radio value="1" style="transform: scale(0.7)" />存在污染源
          </label>
        </radio-group>
      </view>
      <view class="leftLable"
        >处置意见:
        <textarea class="textarea" style="font-size: 13px;" @blur="bindTextAreaBlur" />
      </view>
      <view class="leftLable"><span>是否上传附件:</span>
        <radio-group @change="fileChange">
          <label class="radio" style="margin-right: 30rpx">
            <radio value="0" style="transform: scale(0.7)" />否
          </label>
          <label class="radio">
            <radio value="1" style="transform: scale(0.7)" />是
          </label>
        </radio-group>
      </view>
      <view class="show_img" v-if="fileValue=='1'">
        <image :src="imagSrc" @click="chooseImage" class="show_img_image"></image>   
        <view v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
          <image :src="imgList[index]" class="show_img_image"></image>
          <view style="text-align:center">{{iconName}}</view>
        </view>
      </view>
      <view class="rightButton">
        <button
          class="cu-btn"
          size="mini"
          @click="close()"
          style="margin-right: 10px"
        >
          取消
        </button>
        <button class="cu-btn bg-green" size="mini" @click="confirm()">
          确定
        </button>
      </view>
    </view>
  </div>
</template>
<script>
import { appConfig } from '../../config/config.js'
export default {
  props: ["selectCard", "isShow"],
  data() {
    return {
      polluteManageLevelLabel: "",
      flag: "",
      options: "",
      status: "",
      loading: false,
      imagSrc: "../../static/images/upload.png",
      imgList:[],
      fileValue:"",
      iconName:"",
      filesList: [],
    };
  },
  methods: {
    chooseImage() {
        uni.chooseImage({
            success: (chooseImageRes) => {
              debugger
                const tempFilePaths = chooseImageRes.tempFilePaths;
                this.iconName = chooseImageRes.tempFiles[0].name
                const tokeValue=uni.getStorageSync("access-user")
                if (this.imgList.length != 0) {
                    this.imgList = this.imgList.concat(tempFilePaths)
                } else {
                    this.imgList = tempFilePaths
                }
                uni.uploadFile({
                    url: appConfig.WEB_API +'/dutjt-resource/oss/endpoint/put-file', //仅为示例，非真实的接口地址
                    header:{
                      "dutjt-Auth":'bearer ' +tokeValue
                    },
                    method: 'post',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData:{},
                    success: (res) => {
                      var resData = JSON.parse(res.data)
                      JSON.stringify()
                        uni.showToast({
                          title: "上传文件成功!",
                          icon: "none"
                        })
                      var obj={
                      link:resData.data.link,//附件地址
                      buId:this.selectCard.id,//对应待办中的id
                      originalName:resData.data.originalName,//附件原始名称
                      userTaskId:this.selectCard.userTaskId,//对应待办中的userTaskId
                      }
                      this.filesList.push(obj)
                    },
                    fail: () => {
                      uni.showToast({
                        title: '上传文件失败!',
                        icon: 'none',
                      })
                    },
                });
            }
        });
    },
    confirm() {
      var that = this;
      if (that.options == "") {
        uni.showToast({
							title: '请输入处理意见!',
							icon: "none"
						})
      } else {
        const tokeValue=uni.getStorageSync("access-user")
        uni.request({
            url: appConfig.WEB_API + '/bu/airWarningManage/dealWithAir',
            method: 'post',
            data: {
              id: that.selectCard.id, //对应待办中的id
              userTaskId: that.selectCard.userTaskId, //对应待办中的userTaskId
              taskId: that.selectCard.taskId, //对应taskId
              flag: that.flag, // 1表示选择存在污染源，0表示正常条件
              options: that.options, //处置意见内容
              status: that.status, //处理状态： flag是1，status是3；flag是0，status是6
              processInstanceId: that.selectCard.processInstanceId, //对应processInstanceId
              filesList: that.filesList,
            },
            header:{
              "dutjt-Auth":'bearer ' +tokeValue
            },
            success: (res) => {
              if(res.data.code==200){
                uni.showToast({
                  title: "处理成功！",
                });
                that.$emit("close");
              }else{
                uni.showToast({
                  title: "处理失败！",
                });
              }
            }
        });
      }
    },
    bindTextAreaBlur(e) {
      this.options = e.detail.value;
    },
    flagChange(evt) {
      this.flag = evt.detail.value;
      if (this.flag == "1") {
        this.status = "3";
      } else if (this.flag == "0") {
        this.status = "6";
      }
    },
    fileChange(evt) {
      this.fileValue = evt.detail.value;
    },
    close() {
      this.$emit("close");
    },
  },
  mounted: function () {
    this.polluteManageLevelLabel = this.selectCard.polluteManageLevelLabel;
  },
};
</script>
<style scoped lang="scss">
.leftTitle {
  margin: 10px;
  font-size: 16px;
  font-weight: 520;
}
.leftLable {
  margin: 10px 20px;
  font-size: 13px;
  font-weight: 500;
}
.textarea {
  border: 1px solid #a5a5a5;
  height: 60px;
}
.rightButton {
  text-align: right;
  margin-right:10px;
}
.radio {
  height: 15px;
  weight: 15px;
}
.show_img {
  display: flex;
  flex-wrap: nowrap;
  width:100%;
  height:100%;
  border: 2upx dashed #eee;
  margin: 10px 20px;
}
.show_img_image {
    width:80px;
    height:80px;
    border: 2upx dashed #eee;
    background-size: cover;
    margin-right: 5px;
}
.cpt-mask {
  position: absolute;
  top: 0;
  opacity: 1;
  z-index: 99;
  width: 90%;
  padding:5px;
  margin: 40% 5%;
  background-color: white;
  border-radius: 10px;

  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*左边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*上边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*右边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05);
}
</style>
