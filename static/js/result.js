const options = {
    data() {
        return {
            url: window.location.host,
            data: {}
        };
    },
    mounted: function () {
        this.data = eval('[' + this.$refs.data.innerText + ']')[0]
    },
    methods: {
        confirmClick() {
            html2canvas(document.querySelector("#pic")).then(canvas => {
                var url = canvas.toDataURL()
                document.querySelector('#download').href = url
                document.querySelector('#download').download = "image"
                document.querySelector('#download').click()
            });
        },
    }
}

const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");