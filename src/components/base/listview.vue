<template>
	<scroll v-if="data.length"
					class="listview"
					ref="listview"
					:listenScroll="listenScroll"
					:probeType="probeType"
	>
		<div>
			<div v-for="(group, index) in data" :key="index"  class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{ group.title }}</h2>
				<div v-for="(item, index) in group.items" :key="index" class="list-group-item">
					<img v-lazy="item.avatar" class="avatar">
					<span class="name">{{ item.name }}</span>
				</div>
			</div>
		</div>
		<div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
				<ul>
					<li v-for="(item, index) in shortcutList" :data-index="index" class="item"
							:key="index">{{item}}
					</li>
				</ul>
    	</div>
	</scroll>
</template>
<script>
import Scroll from 'base/scroll'

const AHCHOR_HEIGHT = 18;

export default {
	props: {
		data:{
			type: Array,
			default: []
		}
	},
	data() {
		return {}
	},
	computed: {
		shortcutList() {
			return this.data.map((group) => {
				return group.title.substr(0, 1);
			})
		}
	},
	created() {
		this.probeType = 3
    this.listenScroll = true
		this.touch = {};
		this.listHeight = [];
	},
	watch: {
		data() {
			this.$nextTick(() => {
				this._calculateHeight();
			})
		}
	},
	components: {
		'scroll': Scroll
	},
	methods: {
		onShortcutTouchStart(e) {
			let firstTouch = e.touches[0].pageY;
			this.touch.y1 = firstTouch;
			this.touch.index = e.target.dataset.index;
			this.$refs.listview.scrollToElement(this.$refs.listGroup[this.touch.index], 16);
		},
		onShortcutTouchMove(e) {
			this.touch.y2 = e.touches[0].pageY;
			let delta = (( this.touch.y2 - this.touch.y1) / AHCHOR_HEIGHT) | 0;
			let toIndex = parseInt(this.touch.index) + delta;
			this.$refs.listview.scrollToElement(this.$refs.listGroup[toIndex], 16);
		},
		_calculateHeight() {
			let height = 0;
			this.listHeight = [];
			var list = this.$refs.listGroup;
			this.listHeight.push(height);
			for (let i = 0;i < list.length; i++) {
				height += list[i].clientHeight
				this.listHeight.push(height)
			}
			console.log(this.listHeight)
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.listview
			position: relative
			width: 100%
			height: 100%
			overflow: hidden
			background: $color-background
			.list-group
				padding-bottom: 60px
				.list-group-title
					height: 60px
					line-height: 30px
					padding-left: 40px
					font-size: $font-size-small
					color: $color-text-l
					background: $color-highlight-background
				.list-group-item
					display: flex
					align-items: center
					padding: 40px 0 0 60px
					.avatar
						width: 100px
						height: 100px
						border-radius: 50%
					.name
						margin-left: 40px
						color: $color-text-l
						font-size: $font-size-medium
	.list-shortcut {
			position: fixed
			z-index: 30
			right: 20px
			top: 50%
			transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item {
				padding: 3px
				line-height: 1
				color: $color-text-l
				font-size: $font-size-small
			}	
	}			
</style>

