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
            <el-table-column prop="lastWeek" label="环比上周" width="180">
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="goDetail(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-pagination layout="prev, pager, next" :total="50">
        </el-pagination> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {},
                saleList: [],
                saleTable: []
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user'));
        },
        async mounted() {
            let obj = {
                mall: this.user.mall
            }
            await this.$http.post('/sale/saleList', obj).then(data => {
                this.saleList = data.data;
                console.log(this.saleList)
            })
            this.saleList.forEach(ele => {
                this.saleTable.push({
                    date: this.formatDate(ele.dateStamp),
                    daySale: ele.todaySale,
                    lastYear: ele.lastYearWeek,
                    lastDay: ele.lastYearDay,
                    lastWeek: ele.lastWeek
                })
            });
            console.log(this.saleTable)
        },
        methods: {
            // 查看详情
            goDetail() {

            },
            formatDate(str) {
                str = new Date(str);
                console.log(str)
                let year = str.getFullYear(),
                    month = str.getMonth() + 1 < 10 ? '0' + (str.getMonth() + 1) : str.getMonth() + 1 ,
                    day = str.getDate()< 10 ? '0' + str.getDate() : str.getDate();
                return year + '-' + month + '-' + day;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>