<template>
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
    <el-row>
        <el-col :span="24">
            <el-space fill="true" style="width: 100%; height: 100%;">
                <div v-for="(item, key) in this.data">
                    <el-card>
                        <template #header>
                            <div>
                                <el-button @click="onAdd(item['id'], item['title_cn'])" size="small" class="add-button">
                                    +</el-button>
                                <h4>{{ item['title_cn'] }}</h4>
                                <br>
                                <small class="grey">{{ item['title_jp'] }}</small>
                            </div>
                        </template>
                        <div>
                            <el-row>
                                <el-col :span="8" style="max-width: 100px;">
                                    <img :src="`/animationlist/getCover?path=/${ item.path.replace('&', 'and_signal_') }/cover.jpg`" />
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
                </div>
                <el-backtop :right="20" :bottom="60" />
            </el-space>
        </el-col>
    </el-row>
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