<template>
    <div class="slide-show" @touchstart="onTouchStart" @touchmove="onTouchmove" @touchend="onTouchend">
        <transition-group tag="ul" class='slide-ul' :name="name">
            <li v-for="(item , index ) in slides" :key="index" v-show="index===nowIndex">
                <a :href="item.href">
                    <img :src="item.src" alt="">
                </a>
            </li>
        </transition-group>
        <ul class="slide-pages">
            <li v-for="(item, index) in slides" @click="goto(index)" class="slide-page-point" :key="index">
                <a :class="{'active': index === nowIndex}">{{ index + 1 }}</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nowIndex: 0,
            name: ''
        }
    },
    props: {
        slides: {
            type: Array,
            default: []
        },
        duration: {
            type: Number,
            default: 2000
        },
        type: {
            type: String,
            default: 'move'
        }
    },
    computed: {
        prevIndex() {
            if (this.nowIndex === 0) {
                return this.slides.length - 1
            } else {
                return this.nowIndex - 1
            }
        },
        nextIndex() {
            if (this.nowIndex === this.slides.length - 1) {
                return 0
            } else {
                return this.nowIndex + 1
            }
        }
    },
    methods: {
        goto(index) {
            var preIndex = this.nowIndex
            this.nowIndex = index
            var forward = this.nowIndex - preIndex > 0 ? 'right' : 'left';
            this.name = this.type + '-' + forward
        },
        runInv() {
            this.invId = setInterval(() => {
                this.name = this.type + '-' + 'right'
                if (this.nowIndex === this.slides.length - 1) {
                    this.nowIndex = 0
                } else {
                    this.nowIndex = this.nowIndex + 1
                }
            }, this.duration)
        },
        clearInv() {
            clearInterval(this.invId)
        },
        calculatePos(e) {
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let xd = this.x - x;
            let yd = this.y - y;
            let axd = Math.abs(xd);
            let ayd = Math.abs(yd);
            return {
                deltaX: xd,
                deltaY: yd,
                absX: axd,
                absY: ayd
            };
        },
        onTouchStart(e) {
            if (e.touches.length > 1) {
                return;
            }
            this.touch = true;
            this.start = Date.now();
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            this.clearInv();
        },
        onTouchmove(e) {
            if (this.preventDefault) {
                e.preventDefault();
            }
            if (!this.touch) {
                return;
            }
            let pos = this.calculatePos(e);
            if (pos.absX > pos.absY) {
                e.preventDefault();
                //this.slid(this.activeIndex, pos.deltaX);
            }
        },
        onTouchend(e) {
            if (!this.touch) {
                return;
            }
            let pos = this.calculatePos(e);
            let time = Date.now() - this.start;
            let velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
            let isFlick = velocity > 0.6;
            let newIndex = this.nowIndex;
            if (isFlick || pos.absX > 100) {
                if (pos.absX / pos.deltaX > 0) {
                    this.name = this.type + '-' + 'right'
                    if (this.nowIndex === this.slides.length - 1) {
                        this.nowIndex = 0
                    } else {
                        this.nowIndex = this.nowIndex + 1
                    }
                } else {
                    this.name = this.type + '-' + 'left'
                    if (this.nowIndex === 0) {
                        this.nowIndex = this.slides.length - 1
                    } else {
                        this.nowIndex = this.nowIndex - 1
                    }
                }
            }
            this.cleanTouch();
            this.runInv();
        },
        onTouchcancel(e) {
            if (!this.touch) {
                return;
            }
            this.cleanTouch();
        },
        cleanTouch() {
            this.touch = false;
        },
    },
    mounted() {
        this.runInv()
    }
}
</script>
<style lang="less" scoped>
.slide-pages {
    position: absolute;
    bottom: 20px;
    right: 30px;
    li {
        display: inline-block;
        height: 18px;
        a {
            display: block;
            width: 6px;
            height: 6px;
            margin: 0 5px;
            border: 2px solid #fff;
            border-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            text-align: left;
            text-indent: -9999px;
            overflow: hidden;
            _zoom: 1;
            background: #f5f5f5;
            background: rgba(0, 0, 0, 0.4);
            -webkit-transition: all .2s;
            transition: all .2s;
            &.active {
                background: #fff;
                background: rgba(255, 255, 255, 0.4);
                border-color: #757575;
                border-color: rgba(0, 0, 0, 0.4);
            }
        }
    }
}

.slide-show {
    position: relative;
    overflow: hidden;
}

.slide-ul {
    width: 100%;
    height: 300px;
    li {
        position: absolute;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.move-right-enter-active {
    transition: all 0.5s ease;
    transform: translateX(0)
}

.move-right-leave-active {
    transition: all 0.5s ease;
    transform: translateX(-100%);
}

.move-right-enter {
    transform: translateX(100%);
}

.move-right-leave {
    transform: translateX(0);
}

.move-left-enter-active {
    transition: all 0.5s ease;
    transform: translateX(0)
}

.move-left-leave-active {
    transition: all 0.5s ease;
    transform: translateX(100%);
}

.move-left-enter {
    transform: translateX(-100%);
}

.move-left-leave {
    transform: translateX(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
