<template>
    <div>

        <el-row>
            <el-col :span="2">
            </el-col>
            <el-col :span="20">
                <el-row class="searcher">
                    <el-col :span="18">
                        <el-input v-model="this.searchContent" placeholder="输入动漫名称.." />
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="onSearch" style="width: 100%; height: 100%; ">
                            <span>搜索</span>
                        </el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="2">
            </el-col>
        </el-row>
        <el-row>
            <el-empty v-show="this.empty" description="没找到这部捏.." style="margin:auto" />
            <el-col :span="24">
                <!-- <h1 style="display:flex; justify-content:center; align-items:center;">搜索或根据年份检索动漫开始制作你的列表</h1> -->
            </el-col>
        </el-row>
        <div v-for="(item, key) in this.data" class="bangumi-border" :key="item.id">
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
</template>
 
<script>
module.exports = {
    data() {
        return {
            protocol: 'http',
            url: window.location.host,
            data: {},
            animationDict: {},
            searchContent: "",
            empty: false
        };
    },
    props: {
    },
    mounted: function () {
        let dataDict
        $.ajax({
            type: "get",
            url: this.protocol + '://' + this.url + '/animationlist/getDataDict',
            async: false,
            success: function (result) {
                dataDict = eval('[' + result.replace() + ']')[0]
            }
        })
        this.animationDict = dataDict
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
        onSearch() {
            if (this.searchContent == '') {
                return
            }
            this.empty = false
            var sendList = []
            for (var key in this.animationDict) {
                if (key.indexOf(this.searchContent.toLowerCase().replace(/\s*/g, "")) != -1) {
                    sendList.push(this.animationDict[key])
                }
            }
            if (!sendList.toString()) {
                this.data = {}
                this.empty = true
                return
            }
            $.ajax({
                type: "post",
                url: this.protocol + "://" + this.url + "/animationlist/getListFromId",
                data: { 'data': sendList.toString() },
                success: (result) => {
                    for(let i in result) {
                        result[i]['path'] = result[i]['path'].replace('&', '&amp;')
                        console.log(result[i])
                    }
                    this.data = result
                }
            })
        }
    }
}
</script>
 
<style>

</style>