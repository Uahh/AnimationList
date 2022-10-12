const options = {
    data() {
        return {
            protocol: 'http',
            url: window.location.host,
            activeName: 'search',
            drawer: false,
            added: true,
            added_number: 0,
            overNum: false,
            tableData: [],
            idList: [],
        };
    },
    mounted: function () {
        this.idList = []
        this.tableData = []
    },
    methods: {
        handleSelect(key) {
            if (key == 1) {
                location.href = this.protocol + "://" + this.url;
            }
            else if (key == 2) {
                window.open("https://github.com/Uahh/animationlist")
            }
        },
        isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        onTipConfirm() {
            this.overNum = false
            window.open(this.protocol + "://" + this.url + "/animationlist/comment?data=" + this.idList.toString())
        },
        deleteRow(index, rows) {
            this.tableData.splice(index, 1);
            this.idList.splice(index, 1)
            this.added_number = this.idList.length;
        },
        confirmClick() {
            if (this.isMobile() && this.idList.length > 15) {
                this.overNum = true
            } else {
                window.open(this.protocol + "://" + this.url + "/animationlist/comment?data=" + this.idList.toString())
            }
        },
        updateIdList(result) {
            let flag = false
            for (let name of this.tableData) {
                if (name['date'] == result['name']) {
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
        'search': Vue.defineAsyncComponent(() => loadModule('../static_animationlist/js/search.vue', options)),
        'list-year': Vue.defineAsyncComponent(() => loadModule('../static_animationlist/js/listYear.vue', options)),
    },
}

const { loadModule } = window['vue3-sfc-loader'];
const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");