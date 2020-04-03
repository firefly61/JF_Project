<template>
    <div class="total-data">
        <Title content="会员数量"></Title>
        <div class="wrap">
            <van-tabs v-bind:active="active" custom-class="c-class">
                <van-tab v-for="item in totalMember" v-bind:title="item.name" v-bind:key="item.name">
                    <TotalDataCom v-bind:data-list="item.data"></TotalDataCom>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Title from '../util/Title';
    import TotalDataCom from './TotalDataCom';
    export default {
        name: 'TotalData',
        data() {
            return {
                totalMember: Object,
                active: 0
            }
        },
        async mounted() {
            let totalM = await this.$http.get('totalMember');
            this.totalMember = totalM.data;
        },
        components: {
            Title,
            TotalDataCom
        }
    }
</script>

<style scoped>
.c-class {
    background: red !important;
}
    .wrap {
        width: 91vw;
        background: #fff;
        border-radius: 3px;
        margin: 0 auto;
    }
</style>