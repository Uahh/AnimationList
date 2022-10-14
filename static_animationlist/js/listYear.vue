<template>
    <el-row>
        <el-col :span="24">
            <div v-if="this.showFlag" v-infinite-scroll="this.loadData">
                <div v-for="(item, key) in this.curData" class="bangumi-border" :key="item.id">
                    <div class="bangumi-item">
                        <el-button @click="onAdd(item['id'], item['title_cn'])" size="small" class="add-button">+</el-button>
                        <div class="head">
                            <h4>{{ item['title_cn'] }}</h4>
                            <small>{{ item['title_jp'] }}</small>
                        </div>
                        <hr>
                        <div class="body">
                            <img class="cover"
                                :src="`animationlist/getCover?path=/${ item.path.replace('&', 'and_signal_') }/cover.jpg`"
                                @error="imageError" />
                            <b>{{ item['year'] }}年</b>
                            <br>
                            <span style="word-wrap:break-word;">{{ item['tips'] }}</span>
                        </div>
                        <div class="foot">
                            <div v-if="item['stars'] != -1">
                                <el-rate v-model="item['stars']" disabled allow-half size="small" :max=10 />
                                <span>{{ item['stars'] }}分 ({{ item['people'] }}人评分)</span>
                            </div>
                            <span v-else>暂无评分</span>
                        </div>
                    </div>
                </div>
                <el-backtop :right="20" :bottom="60" />
            </div>
        </el-col>
    </el-row>
</template>
 
<script>
module.exports = {
    data() {
        return {
            protocol: 'http',
            url: window.location.host,
            showFlag: false,
            initDataNum: 10,
            curData: {},
            keys: [],
            data: {},
        };
    },
    props: {
        year: null,
        tab: null
    },
    mounted: function () {
        let dataList
        $.ajax({
            type: "get",
            url: this.protocol + '://' + this.url + '/animationlist/getData?year=' + this.year,
            async: false,
            success: function (result) {
                dataList = eval('[' + result + ']')[0]
            }
        })
        this.data = dataList
        // console.log(this.data)
        this.keys = Object.keys(this.data)
        for (let i = 0; i < 10; i++) {
            this.curData[this.keys[i]] = this.data[this.keys[i]]
        }
        this.showFlag = true
    },
    methods: {
        imageError(e){
            e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';
        },
        onAdd(id, name) {
            let result = {
                id: id,
                name: name
            }
            this.$emit("sendlist", result);
        },
        loadData() {
            if (this.tab == this.year) {
                for (let i = this.initDataNum; i < this.initDataNum + 1; i++) {
                    this.curData[this.keys[i]] = this.data[this.keys[i]]
                }
                this.initDataNum += 2
            }
        }
    }
}
</script>
 
<style>

</style>