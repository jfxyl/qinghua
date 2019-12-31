<template>
    <div class="echart" :id="id"></div>
</template>
<script>
export default {
    name:'cloudChart',
    data(){
         return {
             chart:''
         }
    },
    props: {
        id:{
            type:String
        },
        dataArray: { 
            type: Array | Object
        }
    },
    mounted() {
        let that = this
        that.$nextTick(()=> {
            that.init();
        })
    },
    watch: {
        'dataArray': function (n, o) {
            this.init();
        }
    },
    methods: {
        cloudOption:function(){
            let _this = this;
            
            let option = {
                tooltip: {
                    show: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {},
                //     },
                //     right:_this.cuozu,
                // },
                series: [
                {
                    name: "",
                    type: "wordCloud",
                    size: ["100%", "100%"],
                    textRotation: [0, 45, 90, -45],
                    textPadding: 0,
                    sizeRange: [12, 30],
                    gridSize: 10,
                    autoSize: {
                        enable: true,
                        minSize: 14
                    },
                    textStyle: {
                        normal: {
                            color: function() {
                            return (
                                "rgb(" +
                                Math.round(Math.random() * 195 + 60) +
                                ", " +
                                Math.round(Math.random() * 195 + 60) +
                                ", " +
                                Math.round(Math.random() * 195 + 60) +
                                ")"
                            );
                            }
                        }
                    },
                    data: _this.dataArray
                }
                ]
            };
            return option;
        },
        init(){
            let _this = this;
            _this.$echarts.init(document.getElementById(_this.id)).dispose();
            _this.chart = _this.$echarts.init(document.getElementById(_this.id));
            _this.chart.setOption(_this.cloudOption());
        },
    },
}
</script>
<style>
    .echart{width:140%;height:118%;margin: -9% 0 0 -20%}
</style>