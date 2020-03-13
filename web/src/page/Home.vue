<template>
    <div class="home-page">
        <total-data></total-data>
        <Echarts></Echarts>
    </div>
</template>

<script>
    import Echarts from '../components/Echarts';
    import TotalData from '../components/totalData/TotalData';
    export default {
        name: 'HomePage',
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
    .home-page{
        padding-bottom: 13vh;
    }
</style>