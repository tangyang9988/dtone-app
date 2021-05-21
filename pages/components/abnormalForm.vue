<template>
  <div class="main">
    <van-popup
      position="top"
      v-model:show="isShow"
      :lock-scroll="isLockScroll"
      :close-on-click-overlay="isClickOverlay"
      click-overlay="clickOverlay"
      @close="poupClose"
    >
      <div class="detailCards">
        <div class="detailCard">
          <div class="inlineFactor">
            <div class="dealCardTitleIconBody">
              <div class="dealcardTitleIcon"></div>
            </div>
            <div class="inlineFactorName dealCardTitle">处理单</div>
          </div>
          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">区域：</div>
              <div class="factorValue">{{ message.area }}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">站点：</div>
              <div class="factorValue">{{ message.siteName }}</div>
            </div>
          </div>
          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">设备编号：</div>
              <div class="factorValue">{{ message.deviceSn }}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">安装位置：</div>
              <div class="factorValue">{{ message.deviceLocation }}</div>
            </div>
          </div>
          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">监控因子：</div>
              <div class="factorValue">{{ message.alias }}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">预警类型：</div>
              <div class="factorValue">{{ message.alertTypeName }}</div>
            </div>
          </div>
          <div class="inlineFactor">
            <div class="inlineFactorName">预警阈值：</div>
            <div class="factorValue inlineFactorValue">
              {{ message.standardVal }}
            </div>
          </div>
          <div class="inlineFactor">
            <div class="inlineFactorName">开始时间：</div>
            <div class="factorValue inlineFactorValue">
              {{ message.startTime }}
            </div>
          </div>
          <div class="inlineFactor">
            <div class="inlineFactorName">结束时间：</div>
            <div class="factorValue inlineFactorValue">
              {{ message.endTime }}
            </div>
          </div>
          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">持续时间：</div>
              <div class="factorValue">{{ message.duration }}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">状态：</div>
              <div class="factorValue">
                {{ message.status == 1 ? "已处理" : "未处理" }}
              </div>
            </div>
          </div>
          <van-field
            v-if="isShowCommit"
            v-model="feedback"
            size="small"
            rows="1"
            autosize
            label="处理意见"
            type="textarea"
            placeholder="请输入处理意见"
          />
          <!-- <label v-else >{{feedback}}</label> -->
          <div v-else class="inlineFactor">
            <div class="inlineFactorName">处理意见：</div>
            <div class="factorValue inlineFactorValue">{{ feedback }}</div>
          </div>
          <div class="cardButtons">
            <van-button
              v-if="isShowCommit"
              class="commitButton"
              type="default"
              @click="commit(message)"
              >提交</van-button
            >
            <van-button class="returnButton" type="default" @click="cancel"
              >返回</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import { abnormalInfoSubmit } from "@/api/surfaceWater";
// import { abnormalLamSubmit } from "@/api/lampblack";
export default {
  props: ["message", "isShow"],
  data() {
    return {
      feedback: "",
      isLockScroll: true,
      isClickOverlay: false,
      loading: false,
      finished: false,
      tableFactorList: [],
      isShowCommit: false,
    };
  },
  methods: {
    onConfirm(date) {},
    poupClose() {
      //弹出层关闭时，告诉父组件，弹出层已关闭
      this.$emit("poupClose", (this.isShow = false));
    },
    clickOverlay() {
      console.log("点击遮罩层");
    },
    commit(message) {
      var that = this;
      var platFormId = localStorage.getItem("platFormId");
      if (that.feedback == "") {
        Toast.fail("请输入处理意见!");
      } else if (message.endTime == "") {
        Toast.fail("预警没有结束，不能处理!");
      } else {
        if (platFormId=="99") {
          abnormalLamSubmit(platFormId, that.feedback, that.message.id).then(
            function (result) {
              that.isShow = false;
              Toast.success("提交成功！");
              that.$emit("poupClose", false);
            },
            function (err) {
              Toast.fail("请求异常！");
            }
          );
        } else {
          abnormalInfoSubmit(platFormId, that.feedback, that.message.id).then(
            function (result) {
              that.isShow = false;
              Toast.success("提交成功！");
              that.$emit("poupClose", false);
            },
            function (err) {
              Toast.fail("请求异常！");
            }
          );
        }
      }
    },
    cancel() {
      this.isShow = false;
      this.$emit("poupClose", false);
    },
  },

  mounted: function () {
    console.log("子组件：", this.message, "子组件是否打开", this.isShow);
    if (this.message.status == 0) {
      this.isShowCommit = true;
    } else {
      this.feedback = this.message.conclusion;
    }
  },
};
</script>
<style scoped lang="scss">
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}

.detailCards {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin-top: 10px;
  margin-bottom: 15px;
  width: 90%;
  height: 295px;
  background-color: white;
  border-radius: 3px;

  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*左边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*上边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*右边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05);
}

.factorList {
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}

.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 46%;
}
.factorName {                             
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #000000;
  opacity: 1;
}

.factorValue {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.inlineFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  margin-left: 5px;

}
.inlineFactorName {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  margin-top:5px;
}
.inlineFactorValue {
  float: left;
  margin-top: 5px;
}

.chartTitle {
  margin-top: 10px;
  margin-left: 20px;
}

.cardHr {
  width: 90%;
  padding-left: 5%;
}

.cardTitle {
  padding-left: 5%;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 0px 0px;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;

  display: flex;
  justify-content: left;
  align-items: left;
}

.cardTitleIcon {
  width: 18px;
  height: 18px;
  background: #50e2c1;
  border-radius: 50%;
  opacity: 1;
}

.cardTitleWord {
  margin-left: 5px;
}

.newCard {
  width: 90%;
  height: 200px;
}
.cardsHeaderTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
}
.cardButtons {
  display: flex;
  flex-direction: row-reverse;
}
.commitButton {
  background-color: #0554b1;
  border-radius: 8px;
  height: 30px;
  //字体
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #ffffff;
  opacity: 1;
  margin:5px;
}
.returnButton {
  border-radius: 8px;
  height: 30px;
  //字体
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  opacity: 1;
  margin:5px;
}
.dealCardTitle {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #587df7;
}
.dealcardTitleIcon {
  width: 8px;
  height: 2px;
  background: #587df7;
  opacity: 1;
  border-radius: 2px;
}
.dealCardTitleIconBody {
  margin-left: 5px;
  height: 22px;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-cell{
  padding:5px;
  font-size: 13px;
}
</style>
