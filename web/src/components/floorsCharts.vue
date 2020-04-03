<template>
    <div class="floors-chart">
        <div id="fChart" :style="{width: ewidth, height: eheight}"></div>
    </div>
</template>

<script>
    export default {
        props: ['floors'],
        data() {
            return {
                ewidth: '100%',
                eheight: '100%'
            }
        },
        mounted() {
            let xData = [],
                yData = [];
            this.floors.forEach(element => {
                xData.push(element.name);
                yData.push(element.value);
            });
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '10%',
                    right: '5%'
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    name: '(单位:万元)'
                },
                legend: {
                    top: '16px',
                    data: xData
                },
                series: [{
                    data: yData,
                    type: 'bar',
                    barMaxWidth: '60%'
                }]
            };

            const fChart = document.getElementById('fChart');
            let f_c = this.$echarts.init(fChart);
            f_c.setOption(option);
        }
    }
</script>

<style lang="scss">
    .floors-chart {
        width: 97vw;
        height: 91vw;
        margin: 0 auto;
    }
</style>