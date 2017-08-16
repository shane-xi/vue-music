<template>
		<div class="singer">

		</div>
</template>
<script>
import {getSingerList} from '@/api/singer'
import {ERR_OK} from '@/api/config'
export default {
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
					this.singers = res.data.list;
					this._normalizeSinger(this.singers)
				}
			})
		},
		_normalizeSinger(data) {
			var map = {};
			data.forEach((item, index) => {
				const key = item.Findex
				if (!map[key]) {
					map[key] = []
				}
				map[key].push({
					name: item.Fsinger_name,
					id: item.Fsinger_mid,
					avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
				});
			});
			let res = [];
			
			console.log(map)
		}
	}
}
</script>
