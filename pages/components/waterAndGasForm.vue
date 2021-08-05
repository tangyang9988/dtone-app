<template>
  <div class="main">
    <view class="cpt-mask" v-if="isShow">
      <view class="leftTitle">处置提示</view>
      <view v-if="userTaskId == 'pollution_warning_maintain'">
      <view class="leftLable">上传调查结果</view>
      <view class="show_img">
        <image :src="imagSrc" @click="chooseImage" class="show_img_image"></image>   
        <view class="" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
          <image :src="imgList[index]" class="show_img_image"></image>
            <!-- <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                <text class='cuIcon-close'></text>
          </view> -->
        </view>
      <!-- <view class="solids" @click="chooseImage">
            <text class='cuIcon-cameraadd'></text>
      </view> -->
        </view>
        <view class="leftLable"
          >处置意见:
          <textarea
            class="textarea"
            style="font-size: 13px"
            @blur="bindTextAreaBlur"
          />
        </view>
      </view>
      <view v-else-if="userTaskId == 'pollution_warning_enterprise'">
        <view class="leftLable"
          >处置意见:
          <textarea
            class="textarea"
            style="font-size: 13px"
            @blur="bindTextAreaBlur"
          />
        </view>
        <view class="leftLable"
          ><span>是否上传附件:</span>
          <radio-group @change="fileChange">
            <label class="radio" style="margin-right: 30rpx">
              <radio value="0" style="transform: scale(0.7)" />否
            </label>
            <label class="radio">
              <radio value="1" style="transform: scale(0.7)" />是
            </label>
          </radio-group>
        </view>
      </view>
      <view class="rightButton">
        <button
          class="cu-btn"
          size="mini"
          @click="close()"
          style="margin-right: 20px"
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
import { dealWithPollution } from "../../api/airPollution.js";
import { appConfig } from '../../config/config.js'
export default {
  props: ["selectCard", "isShow"],
  data() {
    return {
      imgList:[],
      polluteManageLevelLabel: "",
      userTaskId: "",
      options: "",
      status: "",
      loading: false,
      imagSrc: "../../static/images/upload.png",
      filesList: [],
    };
  },
  methods: {
    chooseImage() {
      // uni.chooseImage({
      //     count: 3, //默认9
      //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      //     sourceType: ['album'], //从相册选择
      //     success: (res) => {
      //         if (this.imgList.length != 0) {
      //             this.imgList = this.imgList.concat(res.tempFilePaths)
      //         } else {
      //             this.imgList = res.tempFilePaths
      //         }
      //         console.log(this.imgList)
      //     }
          
      // });
        uni.chooseImage({
            success: (chooseImageRes) => {
                const tempFilePaths = chooseImageRes.tempFilePaths;
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
                      this.filesList=[{
                      link:resData.data.link,//附件地址
                      buId:this.selectCard.id,//对应待办中的id
                      originalName:resData.data.originalName,//附件原始名称
                      userTaskId:this.selectCard.userTaskId,//对应待办中的userTaskId
                      }]
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
          title: "请输入处理意见",
        });
      } else {
        var obj = {
          id: that.selectCard.id, //对应待办中的id
          userTaskId: that.selectCard.userTaskId, //对应待办中的userTaskId
          taskId: that.selectCard.taskId, //对应taskId
          options: that.options, //处置意见内容
          status: that.status, //处理状态： flag是1，status是3；flag是0，status是6
          processInstanceId: that.selectCard.processInstanceId, //对应processInstanceId
          filesList: that.filesList,
        };
        dealWithPollution(obj).then(
          function (result) {
            uni.showToast({
              title: "处理成功！",
            });
            that.$emit("close");
          },
          function (err) {
            uni.showToast({
              title: "处理异常！",
            });
          }
        );
      }
    },
    bindTextAreaBlur(e) {
      this.options = e.detail.value;
    },
    fileChange(evt) {
      let value = evt.detail.value;
      if (value == "0") {
        this.filesList = [];
      } else if (value == "1") {
        this.filesList = [];
      }
    },
    close() {
      this.$emit("close");
    },
  },
  mounted: function () {
    this.polluteManageLevelLabel = this.selectCard.polluteManageLevelLabel;
    this.userTaskId = this.selectCard.userTaskId;
    if(this.userTaskId == "pollution_warning_maintain"){
       this.status="12"
    }else if(this.userTaskId == "pollution_warning_enterprise"){
      this.status="6"

    }
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
.textarea {
  width:100%;
  border: 1px solid #a5a5a5;
  height: 60px;
}
.rightButton {
  position: absolute;
  right: 20px;
}
.radio {
  height: 15px;
  weight: 15px;
}
.cpt-mask {
  position: absolute;
  top: 0;
  opacity: 1;
  z-index: 99;
  width: 90%;
  height: 300px;
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
