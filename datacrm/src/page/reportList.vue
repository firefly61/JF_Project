<template>
    <div class="report-list">
        <el-table :data="saleTable" stripe style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="daySale" label="当日销售总额" width="180">
            </el-table-column>
            <el-table-column prop="lastYear" label="去年同期" width="180">
            </el-table-column>
            <el-table-column prop="lastDay" label="去年同日" width="180">
            </el-table-column>
            <el-table-column prop="lastWeek" label="环比上周">
            </el-table-column>
        </el-table>

        <el-pagination layout="prev, pager, next" :total="50">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                saleTable: [{
                    date: '2020-04-01',
                    daySale: '52.9',
                    lastYear: '33',
                    lastDay: '29',
                    lastWeek: '36'
                }, {
                    date: '2020-04-02',
                    daySale: '52.9',
                    lastYear: '33',
                    lastDay: '29',
                    lastWeek: '36'
                }, {
                    date: '2020-04-03',
                    daySale: '52.9',
                    lastYear: '33',
                    lastDay: '29',
                    lastWeek: '36'
                }, {
                    date: '2020-04-04',
                    daySale: '52.9',
                    lastYear: '33',
                    lastDay: '29',
                    lastWeek: '36'
                }, ]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>