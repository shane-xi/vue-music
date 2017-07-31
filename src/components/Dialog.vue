<template id="dialog-template">
    <div class="dialogs">
        <div class="dialog" v-bind:class="{ 'dialog-active': show }">
            <div class="dialog-content">
                <header class="dialog-header">
                    <h1 class="dialog-title">{{ title }}</h1>
                </header>
                <div v-for="field in fields" class="form-group">
                    <label>{{ field.name }}</label>
                    <select v-if="field.dataSource" v-model="item[field.name]">
                        <option v-for="opt in field.dataSource" :value="opt">{{ opt }}</option>
                    </select>
                    <input v-else type="text" v-model="item[field.name]">
                </div>
                <footer class="dialog-footer">
                    <div class="form-group">
                        <label></label>
                        <button v-on:click="save">Save</button>
                        <button v-on:click="close">Close</button>
                    </div>
                </footer>
            </div>
        </div>
        <div class="dialog-overlay"></div>
    </div>
</template>
<style scoped>
.dialog {
    display: none;
}

.dialog-active {
    display: block;
}
</style>

<script>
import bus from '@/util/bus'

export default {
    data() {
        return {
        }
    },
    props: {
        mode: Number,
        title: String,
        index: [String, Number],
        show: {
            type: Boolean,
            default: false
        },
        fields: {},
        item: {}
    },
    watch: {

    },
    methods: {
        close() {
            this.$emit('on-state-change')
        },
        save() {
            var that = this
            this.$emit('on-state-change')
            if (this.mode === 1) {
                this.$emit('create-item')
            }
            if (this.mode === 2) {
                bus.$emit('update-item', that.index)
            }
        }
    }
}
</script>
