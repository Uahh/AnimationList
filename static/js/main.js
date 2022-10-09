const options = {
    data() {
        return {
            protocol: 'http',
            url: window.location.host,
            activeName: 'search',
            drawer: false,
            added: true,
            added_number: 0,
            tableData: [],
            idList: [],
        };
    },
    mounted: function () {
        // this.protocol = this.getProtocol()
        this.idList = []
        this.tableData = []
    },
    methods: {
        handleSelect(key) {
            if (key == 1) {
                location.href = this.protocol + "://" + this.url;
            }
            else if (key == 2) {
                window.open("https://github.com/Uahh/RepoChart")
            }
        },
        onAdd() {
        },
        deleteRow(index, rows) {
            this.tableData.splice(index, 1);
            this.idList.splice(index, 1)
            this.added_number = this.idList.length;
            console.log(this.tableData)
        },
        confirmClick() {
            window.open(this.protocol + "://" + this.url + "/comment?data=" + this.idList.toString())
        },
        updateIdList(result) {
            let flag = false
            for (let name of this.tableData) {
                if (name['date'] == result['name']){
                    flag = true
                    break
                }
            }
            if (!flag) {
                this.tableData.push({ 'date': result['name'] })
                this.idList.push(result['id'])
                this.added = false
                this.added_number = this.tableData.length;
            }
        }
    },
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {
        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {
        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
    components: {
        'search': Vue.defineAsyncComponent(() => loadModule('../static/js/search.vue', options)),
        'list-year-2022': Vue.defineAsyncComponent(() => loadModule('../static/js/listYear2022.vue', options)),
        // 'circle-chart': Vue.defineAsyncComponent(() => loadModule('../static/js/circleChart.vue', options)),
    },
}

const { loadModule } = window['vue3-sfc-loader'];
const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");