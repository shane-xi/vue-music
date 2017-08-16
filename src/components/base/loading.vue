<template>
	<div class="loading-wrap">
		<img class="loading-gif" src="./loading.gif" style="width:50px">
		<p class="loading-text">加载中</p>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	}
}
</script>
<style scoped>
	.loading-wrap {
		width: 100%;
		text-align: center;
		z-index: 1
	}
	.loading-text{
		line-height: 20px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.3)
	}
</style>


