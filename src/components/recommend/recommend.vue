<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" :data="songList" :click="click">
			<div>
				<slide :slides="slides"></slide>
        <loading class="loading-container" v-if="!songList"></loading>
				<div class="recommend-list">
					<div class="list-title">推荐歌单</div>
					<div class="rem-ul">
						<a v-for="(item, index) in songList" :key="index" class="rem-item" href="">
              <div class="img-wrap">
							  <img @load="loadImage" :src="item.picUrl" class="img" />
							</div>
              <span class="play-count">{{ formatPlayNum(item.playCount) }}</span>
							<p v-html="item.name" class="text"></p>
						</a>
					</div>
					<div class="list-title">推荐歌单</div>
					<div class="rem-ul">
						<a v-for="(item, index) in songList" :key="index" class="rem-item">
							<div class="img-wrap">
							  <img @load="loadImage" :src="item.picUrl" class="img" />
							</div>
							<span class="play-count">{{ formatPlayNum(item.playCount) }}</span>
							<p v-html="item.name" class="text"></p>
						</a>
					</div>
          <div class="list-title">推荐歌单</div>
					<div class="rem-ul">
						<a v-for="(item, index) in songList" :key="index" class="rem-item">
							<div class="img-wrap">
							  <img @load="loadImage" :src="item.picUrl" class="img" />
							</div>
							<span class="play-count">{{ formatPlayNum(item.playCount) }}</span>
							<p v-html="item.name" class="text"></p>
						</a>
					</div>
				</div>
			</div>
		</scroll>
    <!-- <scroll style="width:100%">
        <div style="background:red;height:1314px;width:100%"></div>
    </scroll>  -->
	</div>
</template>
<script>
import Slide from 'base/slide'
import Scroll from 'base/scroll'
import Loading from 'base/loading'
import betterScroll from 'better-scroll'
export default {
	data() {
		return {
			slides: [
				{
					src: "http://y.gtimg.cn/music/photo_new/T003R720x288M0000013ryUY16IxPs.jpg"
				},
				{
					src: "http://y.gtimg.cn/music/photo_new/T003R720x288M000002XvwRT2KJ2Sb.jpg"
				},
				{
					src: "http://y.gtimg.cn/music/photo_new/T003R720x288M000003JdOsG0OZ5ED.jpg"
				},
				{
					src: "http://y.gtimg.cn/music/photo_new/T003R720x288M000002XvwRT2KJ2Sb.jpg"
				}
			],
			songList: null,
			click: true
		}
	},
	computed: {

	},
	components: {
		'slide': Slide,
    'scroll': Scroll,
    'loading': Loading
	},
	methods: {
		_getSongList() {
			var url = '/personalized';
			this.$ajax.get(url)
				.then(res => {
					if (res.status === 200) {
						if (res.data.code === 200) {
							this.songList = res.data.result;
						}
					}
				})
		},
		formatPlayNum(num) {
			return num >= 100000 ? Math.ceil(num / 10000) + '万' : Math.ceil(num)
		},
		loadImage() {
			if (!this.checkloaded) {
				this.checkloaded = true
				this.$refs.scroll.refresh()
			}
		}
	},
	created() {
    this._getSongList();
	},
  mounted() {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    display: flex
    height: 100%
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .loading-container
      position: absolute;
      top: 729px;
      transform: translateY(-50%)  
    .recommend-list
      margin-top: 30px
      .list-title
        position: relative;
        padding-left: 18px;
        margin-bottom: 28px;
        font-size: 17px;
        height: 40px;
        line-height: 20px;
        color: #867
        text-align: left
      .rem-ul
        display: flex
        box-sizing: border-box
        flex-wrap: wrap
        align-content: space-between
        justify-content: space-between
        .rem-item:after
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            z-index: 2;
            background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent);
        .rem-item
          position: relative
          display: block
          width: 245px
          padding-bottom: 32px
          .img-wrap
            width: 100%
            height: 0
            padding-bottom: 100%
            .img
              width: 100%
          .play-count
            position: absolute;
            right: 10px;
            top: 4px;
            z-index: 3;
            height: 40px
            padding-left: 26px;
            color: #fff;
            font-size: 12px;
            background-repeat: no-repeat;
            background-size: 22px 20px;
            text-shadow: 1px 0 0 rgba(0,0,0,.15);
            background-image: url(../../assets/earp.svg);
          .text
            display: -webkit-box;
            text-align: left
            -webkit-line-clamp: 2;
            overflow: hidden;
            padding: 12px 4px 0 12px;
            line-height: 1.2;
            font-size: 13px;
        .icon
          flex: 0 0 120px
          width: 120px
          padding-right: 40px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 40px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 20px
            color: $color-text
          .desc
            color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
