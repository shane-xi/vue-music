<template>
  <div class="recommend" ref="recommend">
    <slide :slides="slides"></slide>
  </div>
</template>
<script>
import Slide from 'base/slide' 
export default {
  data(){
    return {
      slides:[
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
      ]
    }
  },
  components: {
    'slide': Slide
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 176px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 130px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 40px 40px 40px
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