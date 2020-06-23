<template>
    <div class="home">
        <div class="clearfix">
            <el-input class="jf-input" disabled :value='2020'></el-input>
            <el-select class="jf-input" v-model="checkedMonth" @change="askData">
                <el-option v-for="item in monthArr" :key="item.id" :label="item.name" :value="item.id"
                    :disabled="item.id > now">
                </el-option>
            </el-select>
        </div>
        <div class="month-line chart-box">
            <h1 class="chart-title">{{checkedMonth}}月 日销售趋势</h1>
            <div id="monthChart"></div> 
        </div>
        <div class="month-radar chart-box f-l">
            <h1 class="chart-title">{{checkedMonth}}月 业态</h1>
            <div id="monthRadarChart"></div>
        </div>

        <div class="month-radar chart-box f-r">
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                user: {},
                now: new Date().getMonth() + 1,
                checkedMonth: new Date().getMonth() + 1,
                monthArr: [],
                searchResult: [],
                monthData: [],
                xA: [],
                monthChart: {}
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user'));
            // this.askData();
        },
        async mounted() {
            for (let i = 0; i < 12; i++) {
                this.monthArr.push({
                    id: i + 1,
                    name: i + 1 + '月'
                })
            }

            let monthChartDom = document.getElementById('monthChart');
            this.askData();

            let option = {
                grid: {
                    width: '90%',
                    height: '60%',
                    bottom: '13%',
                    left: '7%'
                },
                tooltip: {
                    label: true,
                    formatter: '{b}日: {c}万元'
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    name: '/日',
                    nameLocation: 'end',
                    nameTextStyle: {
                        align: 'left'
                    },
                    nameGap: 3,
                    axisTick: false
                },
                yAxis: {
                    type: 'value',
                    name: '销售总额/万元',
                    axisLine: {
                        show: false
                    },
                    axisTick: false,
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                series: [{
                    data: [],
                    type: 'line',
                    symbol: 'circle',
                    label: {
                        show: true
                    }
                }]
            };
            this.monthChart = this.$echarts.init(monthChartDom);
            this.monthChart.setOption(option);
            window.onresize = this.monthChart.resize;
        },
        methods: {
            async askData() {
                let options = {
                    mall: this.user.mall,
                    year: 2020,
                    month: this.checkedMonth
                }
                await this.$http.post('/sale/getMonthSales', options).then((res) => {
                    if (res.data) {
                        this.searchResult = res.data;
                        this.xA = [];
                        this.monthData = [];
                        for (let i = 0; i < this.searchResult.length; i++) {
                            const element = this.searchResult[i];
                            this.xA.push(element.day);
                            this.monthData.push(element.sale);
                        }
                        this.monthChart.setOption({
                            xAxis: {
                                data: this.xA
                            },
                            series: [{
                                data: this.monthData
                            }]
                        })
                    }

                })
            }
        }
    }
</script>

<style lang="scss">
    .chart-title {
        font-size: 16px !important;
        padding-right: 65px;
    }

    .jf-input {
        float: left;
        width: 75px;
        margin-right: 10px;
    }

    .chart-box {
        background: #fff;
        border-radius: 4px;
        padding: 10px;
        margin-top: 15px;
        display: inline-block;
        position: relative;
    }

    .month-line {
        width: 100%;
        height: 16vw;

        #monthChart {
            width: 93%;
            height: 75%;
            position: absolute;
            bottom: 20px;
        }
    }

    .month-radar {
        width: 49%;
        height: 17vw;
    }
</style>