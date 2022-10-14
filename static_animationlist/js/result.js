const options = {
    data() {
        return {
            url: window.location.host,
            onDialog: false,
            loading: false,
            data: {}
        };
    },
    computed: {
        bangumiGrunps(){
            const { data } = this;
            if(!data) return [];

            const b = Object.values(data)
            const c = [];
            while(1){
                c.push(b.splice(0,10));
                if(!b.length) break;
            }
            return c;
        }
    },
    mounted: function () {
        this.data = eval('[' + this.$refs.data.innerText + ']')[0]
    },
    methods: {
        imageError(e){
            e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';
        },
        // createImg() {
        //     html2canvas(document.querySelector("#pic")).then(canvas => {
        //         var img = canvas.toDataURL()
        //         document.getElementById('base64Img').setAttribute("src", img)
        //     },{
        //         scale: 2
        //     });
        // },
        async createImg() {
            const boxs = [...document.querySelectorAll('.result-head,.bangumis-group,.result-footer')];
            const canvasList = [];
            let width;
            let allHeight = 0;

            console.log(boxs)

            for(let i = 0;boxs.length > i;i++){
                const box = boxs[i];
                const canvas = await html2canvas(box,{
                    scale: 2
                });
                console.log(box,i,canvas);

                canvasList.push(canvas);

                width = canvas.width;
                allHeight = allHeight + canvas.height;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = allHeight;
            const ctx = canvas.getContext('2d');

            let top = 0;
            canvasList.forEach(canvas=>{
                ctx.drawImage(canvas,0,top,canvas.width,canvas.height);
                top += canvas.height;
            });
            document.getElementById('base64Img').setAttribute('src', canvas.toDataURL());

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