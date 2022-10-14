const options = {
    data() {
        return {
            url: window.location.host,
            onDialog: false,
            loading: false,
            base64ImageSrc: null,
            data: {},
            groupNum: 6,
            scale: 1, // 渲染尺寸 2x 会有bug
        };
    },
    computed: {
        bangumiGrunps(){
            const { data, groupNum } = this;
            if(!data) return [];

            const b = Object.values(data)
            const c = [];
            while(1){
                c.push(b.splice(0,groupNum));
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
            // const boxs = [...document.querySelectorAll('.result-head,.bangumis-group,.result-footer')];
            const boxs = [...document.querySelectorAll('.box')];
            const canvasList = [];
            let width;
            let allHeight = 0;

            const { scale } = this;


            for(let i = 0;boxs.length > i;i++){
                const box = boxs[i];
                const canvas = await html2canvas(box,{
                    width: 400,
                    scale
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
            return canvas.toDataURL();
            // URL.createObjectURL
        },
        async confirmClick() {
            document.documentElement.setAttribute('data-loading', true);

            this.loading = true
            this.base64ImageSrc = await this.createImg();

            document.documentElement.setAttribute('data-loading', false);

            this.onDialog = true
            window.pageYoffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            this.loading = false
        },
    }
}

const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");