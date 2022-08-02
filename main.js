const options = {
    data() {
        return {
            // url: window.location.host,
            activeName: '2022',
            value: 7.3
            // repoName: window.location.search.split('=')[1],
            // inputRepo: '',
            // largeDialog: false,
            // existenceDialog: false,
            // starDialog: false,
            // startedDialog: false,
            // networkDialog: false,
            // protocol: null,
            // recommendList: [
            //     { "value": "vuejs/vue"},
            //     { "value": "Uahh/ToastFish"},
            //     { "value": "itorr/nbnhhsh"},
            //     { "value": "tianocore/edk2-edkrepo"},
            //     { "value": "nlohmann/json"},
            //     { "value": "apache/echarts"},
            //     { "value": "pallets/flask"}
            // ]
        };
    },
    mounted: function () {
        // this.protocol = this.getProtocol()
        // $.ajax({
        //     type: "get",
        //     url: this.protocol + "://" + this.url + "/repochart/start?repo=" + this.repoName,
        //     success: (result) => {
        //         if (result == 'Without') {
        //             this.existenceDialog = true;
        //         }
        //         else if (result == 'Started') {
        //             this.startedDialog = true;
        //         }
        //         else if (result == 'Large') {
        //             this.largeDialog = true;
        //         }
        //         else if (result == 'Star') {
        //             this.starDialog = true;
        //         }
        //         else if (result == 'Network failed') {
        //             this.networkDialog = true;
        //         }
        //     }
        // })
        // if (!this.inputRepo) {
        //     this.inputRepo = this.repoName
        // }
        // else {
        //     this.inputRepo = 'Uahh/RepoChart'
        // }
    },
    methods: {
        // handleSelect(key) {
        //     if (key == 1) {
        //         location.href = this.protocol + "://" + this.url;
        //     }
        //     else if (key == 2) {
        //         window.open("https://github.com/Uahh/RepoChart")
        //     }
        // },
        // onSearch() {
        //     location.href = this.protocol + "://" + this.url + "/repochart?repo=" + this.inputRepo;
        // },
        // onGithub() {
        //     this.existenceDialog = false;
        //     window.open("https://github.com/Uahh/RepoChart")
        // },
        // handleClick() {
        //     // pass
        // },
        // querySearch(queryString, cb) {
        //     var recommendList = this.recommendList;
        //     var results = queryString ? recommendList.filter(this.createFilter(queryString)) : recommendList;
        //     cb(results);
        // },
        // createFilter(queryString) {
        //     return (recommend) => {
        //         return (recommend.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        //     };
        // },
        // getProtocol() {
        //     return document.getElementById("protocol").getAttribute("type")
        // }
    },
    moduleCache: {
        vue: Vue
    },
    // async getFile(url) {
    //     const res = await fetch(url);
    //     if (!res.ok)
    //         throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    //     return {
    //         getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
    //     }
    // },
    // addStyle(textContent) {
    //     const style = Object.assign(document.createElement('style'), { textContent });
    //     const ref = document.head.getElementsByTagName('style')[0] || null;
    //     document.head.insertBefore(style, ref);
    // },
    // components: {
    //     'circle-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/circleChart.vue', options)),
    //     'square-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/squareChart.vue', options)),
    //     'line-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/starLineChart.vue', options)),
    //     'active-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/activeChart.vue', options)),
    //     'code-of-lines-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/codeOfLinesChart.vue', options)),
    //     'commit-size-line-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/commitSizeLineChart.vue', options)),
    //     'commit-size-pie-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/commitSizePieChart.vue', options)),
    // },
}

// const { loadModule } = window['vue3-sfc-loader'];
const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");