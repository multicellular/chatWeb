<template>
  <div class="page-container">
    <div class="main-container">
      <div class="left-nav-con">
        <div class="nav-con-title">LATEST</div>
        <div class="nav-item" @click="curIdx=0">
          <div class="nav-title">{{mockData[0].title}}</div>
          <p class="nav-content">{{mockData[0].article | first}}</p>
        </div>
        <div class="nav-item" @click="curIdx=1">
          <div class="nav-title">{{mockData[1].title}}</div>
          <p class="nav-content">{{mockData[1].article | first}}</p>
        </div>
        <div class="nav-item" @click="curIdx=2">
          <div class="nav-title">{{mockData[2].title}}</div>
          <p class="nav-content">{{mockData[2].article | first}}</p>
        </div>
        <div class="nav-item" @click="curIdx=3">
          <div class="nav-title">{{mockData[3].title}}</div>
          <p class="nav-content">{{mockData[3].article | first}}</p>
        </div>
      </div>
      <div class="right-main-con">
        <div class="main-title">{{curData.title}}</div>
        <div class="main-subtitle">{{curData.author}}</div>
        <div class="content-bg" v-if="curData.imgUrl" :style="{'background-image':'url('+ curData.imgUrl +')'}"></div>
        <div class="main-content">
          <p class="content-article">{{curData.article}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import image1 from "@/assets/images/home_bg.jpeg";
import image2 from "@/assets/images/home_map.jpeg";
export default {
  data() {
    return {
      regexStr: '^[^，,.。"“！! ?？]+',
      mockData: [
        {
          title: "季节之门",
          author: "（周捷）",
          imgUrl: '',
          article: `清晨起来推开窗户，一阵湿润润的气息扑面而来，一种熟悉的温馨告诉我：春天来了。这睡眼惺忪的一推，打开的却是一扇季节之门。
            匆匆忙忙走在回家的路上，绷着脸，思绪还未从忙碌后的疲惫中解脱出来。忽听一声喊，原来是数月不见的老友。一挥手，几句亲切的笑骂脱口而出，心中顿觉春意暖怀。那一挥手，一莞尔，心扉的季节之门顿时打开。
            季节之门，原来是这样简简单单。毋须刻意追求，毋需四处寻找，季节之门，就在瞬间转换。推开门是冬；微笑着是春，绷着脸是冬。季节之门，就在我们心与心、心与自然的交流对视之时开启。
            季节之门，有一把百试不爽的金钥匙，上面刻着：温馨、微笑。`
        },
        {
          title: "这世界真美",
          author: "（石雪辉）",
          imgUrl: '',
          article: `你们走的时候，很想洒脱很想倜傥。你们真正走的时候，却是在夜晚悄悄地走的，还撑了一把漂亮的伞。我想我只有投奔雨了，
            不料雨停后的草地竟是馨香透亮的，微风亲切地拂面掠耳。在这个时刻，世界真美。
            绯红花瓣在手指间飘落是美，斑斓汪洋如海的明媚是美，君子好逑的季节是美，在冷清阴湿的路上累累的苦痛也是一种美。
            当心事浸没五月的堤岸，当记忆焚烧悔恨的灵魂，当暴风雨摧毁了希望之船，五彩缤纷却仍是阳光的歌词，勿忘我花仍旧晶莹剔透，彼岸仍在热切地呼唤。
            落霞是暮云吗？落霞是燃烧的玫瑰。一如荒原有真实的太阳，秋雨有知己的情人。
            这世界真美。`
        },
        {
          title: "四 季",
          author: "（陈丹燕）",
          imgUrl: image1,
          article: `冬天的寒潮到来的时候，南方雾状的天空上变得寒冷而明丽。看上去，蓝得不认识。阳光像锐利的箭一样，冰凉地射过来，在路上走一圈，觉得前额已经被冻得昏起来了。这才是真正的冬天。
            我想，我喜欢四季鲜明，热就是热，冷就是冷。有一年冬天在广州，看着那里的树千辛万苦地支撑着绿，所有的叶子却绿得又旧又累，心里真正是惊异与遗憾，为它们觉得累，四季如春。
            我想，冬天是一定太黑太乏味。所以，天虽然冷下来，大家走在路上虽然缩手缩脚，但还是可以感觉到季节的生动。
            随之而来的春天，才会被人在这寒风中千百次地被人幻想。人生也是这样，有大起大落，才衬托出一种美丽与背景。`
        },
        {
          title: "自由是感觉不到的",
          author: "（柯云路)",
          imgUrl: '',
          article: `自由是感觉不到的。这就是深刻的格言。感觉不到的就是“无”，就是无为。我们能感觉到的是不自由。当我们说自由时，说自在时，是因为我们还感觉到不自由、不自在。
            或者，起码是我们曾感觉到过不自由、不自在。感觉到自由了，自在了，那是因为还残存着些微的不自由，不自在，至少还有着不自由、不自在的记忆。
            其实，即使我们只是记着过去曾有的不自由、不自在，那么，它仍然具有一定程度的现时意义。真正的自由，就是彻底的“无”，就是连过去的不自由，也毫无印象。`
        },
        {
          title: "永恒的变化",
          author: "[美]曼迪诺",
          imgUrl: image2,
          article: `没有什么是一成不变的。生活就像自然，有阳春，也有金秋；有酷夏，也有寒冬。走运和倒霉都不可能持续很久。对于突然情况，如果没有充分的思想准备，
          那么厄运就会像大海的波涛一样，在你生活的海岸上忽起忽落拍打不停。相应的，高潮和低潮，日出和日落，富有和贫穷，快乐和失望，将应运而生。
          做好最坏的准备。别羡慕那些春风得意的骄子。他们往往是脆弱的，一旦面临灾祸，就会束手无策，彻底崩溃。也别学那些倒霉背时的可怜家伙。他们一遇到挫折就不能自拔，常常沉溺于悲哀，
          一错再错，在眼看就要柳暗花明之际，却躺下不再起来。注意坚持不懈，别学他们的样儿。
          要永远坚信这一点，一切都会变的。无论受多大创伤，心情多么沉重，一贫如洗也好，都要坚持住。太阳落了还会升起，不幸的日子总有尽头，过去是这样，将来也是这样。`
        }
      ],
      curIdx: 4,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    curData() {
      return this.mockData[this.curIdx] || {};
    }
  },
  filters: {
    first: function(value) {
      if (!value) return "";
      return value.match(/^[^.。！! ?？]+/)[0];
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
$images: "../../assets/images/";
.main-container {
  color: #333;
  display: flex;
  .left-nav-con {
    margin-top: 30px;
    width: 30%;
    .nav-con-title {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    .nav-item {
      // width: 300px;
      max-height: 400px;
      overflow: hidden;
      .nav-title {
        font-weight: 800;
      }
    }
  }
  .right-main-con {
    position: relative;
    // flex: auto;
    width: 65%;
    margin-left: 5%;
    .content-bg {
      float: right;
      width: 40%;
      height: 300px;
      border-radius: 200px;
      // shape-outside: circle();
      filter: grayscale(80%);
      shape-outside: content-box;
      background-position: center; 
      background-repeat: no-repeat;
    }
    .main-title {
      font-size: 45px;
      font-weight: bolder;
      text-decoration: underline;
      text-decoration-color: #ffef00;
    }
    .main-subtitle {
      margin-top: 16px;
      color: #686b6d;
    }
    .main-content {
      position: relative;
      // padding: 32px 40% 0px 32px;
      // background-image: url($images+"home_map.jpeg");
    }
  }
}
</style>


