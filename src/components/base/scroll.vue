<template>
	<div ref="wrapper" class="wrapper">
		<slot></slot>
	</div>
</template>
<style>
 .wrapper {
	 overflow: hidden;
	 width: 100%
 }
</style>

<script>
import betterScroll from 'better-scroll'
export default {
	props: {
		probeType: {
			type: Number,
			default: 1
		},
		click: {
			type: Boolean,
			default: true
		},
		listenScroll: {
			type: Boolean,
			default: false
    },
		refreshDelay: {
			type: Number,
			default: 20
		},
		 /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
		pulldown: {
			type: Boolean,
			default: false
		},
		pullup: {
			type: Boolean,
			default: false
		},	
		data: {
			type: Array,
			default: null
		}
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll();
		})
	},
	methods: {
		_initScroll() {
			this.scroll = new betterScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click
			});
			// 是否派发滚动到底部事件，用于上拉加载
			if(this.pullup) {
				this.scroll.on('scrollEnd', () => {
					//滚动到底部 触发 事件
					this.$emit()
				})
			};
			// 是否派发顶部下拉事件，用于下拉刷新
			if(this.puuldown) {
				this.scroll.on('touchend', () => {
					//是否滚动到底部
					if(this.scroll.y <= (this.scroll.maxScrollY + 50)) {
						tthis.$emit()
					}
				})
			};
			if (this.listenScroll) {
				let me = this
				this.scroll.on('scroll', (pos) => {
					me.$emit('scroll', pos)
				})
      }
		},
		//代理better-scroll的一些方法
		refresh() {
			this.scroll && this.scroll.refresh();
		},
		scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
		}
	},
	watch: {
		data() {
			setTimeout(() => {
				this.refresh();
			}, this.refreshDelay)
			// refreshDelay是保证如果用到transtion-group,DOM渲染在动画之后完成
		}
	}

}
</script>
