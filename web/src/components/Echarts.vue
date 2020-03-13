<template>
    <div class="eaharts">
        <Title content="十二月销售数据"></Title>
        <div class="wrap">
            <div id="myChart" :style="{width: ewidth, height: eheight}"></div>
        </div>
        <Title content="十二月每日新增会员数"></Title>
        <div class="wrap">
            <div id="myChart2" :style="{width: ewidth, height: eheight}"></div>
        </div>
        <Title content="十二月新增会员汇总"></Title>
        <div class="wrap">
            <div id="myChart3" :style="{width: ewidth, height: eheight}"></div>
        </div>
    </div>
</template>

<script>
    import Title from './util/Title';
    import util from '../util/util';
    // import totalSum from '../data/totalSum.json';

    export default {
        name: 'Echarts',
        data() {
            return {
                ewidth: '100%',
                eheight: '100%'
            }
        },
        async mounted() {
            let xAxisData = [];       // 存储项目名
            let dailyN = await this.$http.get('dailyNew');
            let dailyNew = dailyN.data;
            let tem = Object.values(dailyNew);       // 每日新增会员数量数组
            console.log(tem)
            let dailyTotalArr = [];       // 存储每月新增会员总量
            tem.forEach(v => {
                xAxisData.push(v.name);
                dailyTotalArr.push(util.total(v.value));
            })

            let totalSumArr = {
                'vip': [],
                'svip': [],
                'dz': []
            };

            let totalS = await this.$http.get('totalSum');
            let totalSum = totalS.data;
            console.log()
            totalSum.forEach((v) => {
                totalSumArr.vip.push(v.vip);
                totalSumArr.svip.push(v.svip);
                totalSumArr.dz.push(v.dz);
            })

            let option = {
                color: ['#7c8df7', '#e7ba87', '#fb97c8'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    top: '16px',
                    data: ['微卡', 'VIP卡', 'SVIP卡']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar', 'stack', 'tiled']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: xAxisData
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '微卡',
                        type: 'bar',
                        barGap: 0,
                        // label: labelOption,
                        data: totalSumArr.dz
                    },
                    {
                        name: 'VIP卡',
                        type: 'bar',
                        // label: labelOption,
                        data: totalSumArr.vip
                    },
                    {
                        name: 'SVIP卡',
                        type: 'bar',
                        // label: labelOption,
                        data: totalSumArr.svip
                    }
                ]
            };

            let date = [];

            for (let i = 1; i < 32; i++) {
                date.push([2019, 12, i].join('/'));
            }
            let option2 = {
                color: ['rgb(200, 41, 43)', 'rgb(25, 72, 152)', 'rgb(156, 194, 85)', 'rgb(106, 26, 116)',
                    'rgb(242, 192, 66)', 'rgb(25, 72, 152)'
                ],
                tooltip: {
                    trigger: 'axis',
                    position: 'left'
                },
                legend: {
                    data: xAxisData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date,
                    nameRotate: 45,
                    maxInterval: 3600 * 24 * 1000
                },
                yAxis: {
                    type: 'value'
                },
                dataZoom: [{
                    start: 0,
                    end: 50,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series: [{
                        name: '昆山',
                        type: 'line',
                        data: dailyNew.kuns.value
                    },
                    {
                        name: '成都',
                        type: 'line',
                        data: dailyNew.chengd.value
                    },
                    {
                        name: '赣州',
                        type: 'line',
                        data: dailyNew.ganz.value
                    },
                    {
                        name: '巨亿',
                        type: 'line',
                        data: dailyNew.juyi.value
                    },
                    {
                        name: '浏阳',
                        type: 'line',
                        data: dailyNew.liuy.value
                    },
                    {
                        name: '九江',
                        type: 'line',
                        data: dailyNew.jiuj.value
                    }
                ]
            };

            let option3 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    top: '16px',
                    data: xAxisData
                },
                series: [{
                    data: dailyTotalArr,
                    type: 'bar'
                }]
            };

            const chart = document.getElementById('myChart');
            let myChart = this.$echarts.init(chart);
            const chart2 = document.getElementById('myChart2');
            let myChart2 = this.$echarts.init(chart2);
            const chart3 = document.getElementById('myChart3');
            let myChart3 = this.$echarts.init(chart3);
            myChart.setOption(option);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
        },
        components: {
            Title
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrap {
        width: 91vw;
        height: 91vw;
        background: #fff;
        border-radius: 3px;
        margin: 0 auto;
    }
</style>