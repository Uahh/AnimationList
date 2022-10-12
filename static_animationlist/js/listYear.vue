<template>
    <el-row>
        <el-col :span="24">
            <div v-if="this.showFlag" v-infinite-scroll="this.loadData">
                <el-space fill="true" style="width: 100%; height: 100%;">
                    <div v-for="(item, key) in this.curData">
                        <el-card>
                            <template #header>
                                <div>
                                    <el-button @click="onAdd(item['id'], item['title_cn'])" size="small"
                                        class="add-button">
                                        +</el-button>
                                    <h4>{{ item['title_cn'] }}</h4>
                                    <br>
                                    <small class="grey">{{ item['title_jp'] }}</small>
                                </div>
                            </template>
                            <div>
                                <el-row>
                                    <el-col :span="8" style="max-width: 100px;">
                                        <img :src="`/animationlist/getCover?path=/${item.path}/cover.jpg`" />
                                    </el-col>
                                    <el-col :span="15">
                                        <div style="margin: 0px 0px 0px 20px; float:left;">
                                            <span>{{ item['year'] }}年</span>
                                            <br>
                                            <span style="word-wrap:break-word;">{{ item['tips'] }}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div v-if="item['stars'] != -1">
                                            <el-rate v-model="item['stars']" disabled allow-half size="small" :max=10 />
                                            <br>
                                            <span>{{ item['stars'] }}分 ({{ item['people'] }}人评分)</span>
                                        </div>
                                        <div v-else>
                                            <span>暂无评分</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                        <el-backtop :right="20" :bottom="60" />
                    </div>
                </el-space>
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