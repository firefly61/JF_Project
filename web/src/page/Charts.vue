<template>
    <div class="charts-page">
        <total-data></total-data>
        <Echarts></Echarts>
    </div>
</template>

<script>
    import Echarts from '../components/Echarts';
    import TotalData from '../components/totalData/TotalData';
    export default {
        name: 'ChartsPage',
        async mounted() {
            let res = await this.$http.get('userinfo');
            console.log(res)
        },
        components: {
            Echarts,
            TotalData
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .charts-page{
        padding-bottom: 13vh;
        background: #0e2147;
    }
</style>