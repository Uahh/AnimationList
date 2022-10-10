const options = {
    data() {
        return {
            protocol: 'http',
            url: window.location.host,
            id: "",
            title: "",
            content: "",
            idList: window.location.href,
            data: {}
        };
    },
    mounted: function () {
        this.data = eval('[' + this.$refs.data.innerText + ']')[0]
    },
    methods: {
        confirmClick() {
            // console.log(this.id)
            if (this.id == "" || this.title == "" || this.content == "") {
                this.$message({
                    message: '请填写空缺内容',
                    type: 'warning'
                })
                return;
            }
            idList = this.idList.split('=')[1]
            window.open(this.protocol + "://" + this.url + "/AnimationList/result?data=" + idList + "&&title=" + this.title + "&&content=" + this.content + "&&id=" + this.id)
        },
    }
}

const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");