const options = {
    data() {
        return {
            url: window.location.host,
            onDialog: false,
            loading: false,
            data: {}
        };
    },
    mounted: function () {
        this.data = eval('[' + this.$refs.data.innerText + ']')[0]
    },
    methods: {
        createImg() {
            html2canvas(document.querySelector("#pic")).then(canvas => {
                var img = canvas.toDataURL()
                document.getElementById('base64Img').setAttribute("src", img)
            });
        },
        confirmClick() {
            this.onDialog = true
            this.loading = true
            window.pageYoffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            this.createImg()
            this.loading = false
        },
    }
}

const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");