<template>
		<div class="singer">
			<listview :data="singers"></listview>
		</div>
</template>
<style scoped>
.singer{
	height: 100%;
	width: 100%;
	display: flex;
}
</style>


<script>
import {getSingerList} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import Listview from 'base/listview'

const HOT_SINGER_LEN = 10;

export default {
	components: {
		'listview': Listview
	},
	data() {
		return {
			singers: []
		}
	},
	created() {
		this._getSingerList();
	},
	methods: {
		_getSingerList() {
			getSingerList().then((res) => {
				if(res.code === ERR_OK) {
					this.singers = this._normalizeSinger(res.data.list);
				}
			})
		},
		_normalizeSinger(data) {
			var map = {
				hot: {
					title: '热门',
					items: []
				}
			};
			data.forEach((item, index) => {
				if (index < HOT_SINGER_LEN) {
					map.hot.items.push({
						name: item.Fsinger_name,
						id: item.Fsinger_mid,
						avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
					})
				}
				const key = item.Findex
				if (!map[key]) {
					map[key] = {
						title: key,
						items: []
					}
				}
				map[key].items.push({
					name: item.Fsinger_name,
					id: item.Fsinger_mid,
					avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
				});
			});
			let ret = [];
			let hot = [];
			for (let key in map) {
				let val = map[key]
				if (val.title.match(/[a-zA-Z]/)) {
					ret.push(val)
				} else if (val.title === '热门') {
					hot.push(val)
				}
			}
			ret.sort((a, b) => {
				return a.title.charCodeAt(0) - b.title.charCodeAt(0)
			})
			return hot.concat(ret);
		}
	}
}
</script>
