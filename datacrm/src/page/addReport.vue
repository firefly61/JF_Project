<template>
    <div class="add-report">
        <h2>销售填报</h2>
        <table>
            <tr>
                <td class="t-r">项目</td>
                <td>
                    <el-select v-model='mall' placeholder="请选择">
                        <el-option v-for="item in malls" :key="item.code" :label="item.lable" :value="item.label">
                        </el-option>
                    </el-select>
                </td>
                <td class="t-r">日期</td>
                <td>
                    <el-date-picker v-model="today" type="date" placeholder="选择日期">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td class="t-r">当日总销售额(单位：万元)</td>
                <td>
                    <el-input v-model="todaySale"></el-input>
                </td>
                <td class="t-r">时间进度</td>
                <td>{{getTProgress}}</td>
            </tr>
            <tr>
                <td class="t-r">当日客流(单位：人次)</td>
                <td>
                    <el-input v-model="todayCustomer" placeholder="人次"></el-input>
                </td>
            </tr>
            <tr>
                <td class="t-r">本月销售目标(单位：万元)</td>
                <td>
                    <el-input v-model="monthTarget"></el-input>
                </td>
                <td class="t-r">
                    本月销售额(单位：万元)
                </td>
                <td>
                    <el-input placeholder="万元" v-model="monthSale"></el-input>
                </td>
            </tr>
            <tr>
                <td class="t-r">本月完成</td>
                <td v-if="monthSale && monthTarget">{{((monthSale/monthTarget) * 100).toFixed(2)}}%</td>
            </tr>
            <tr>
                <td class="t-r">去年同期 <span>{{getWeek}}</span>(单位：万元)</td>
                <td>
                    <el-input v-model="lastYearWeek" placeholder="万元"></el-input>
                </td>
                <td class="t-r">同比</td>
                <td v-if="todaySale & lastYearWeek">{{((todaySale/lastYearWeek - 1) * 100).toFixed(2)}}%</td>
            </tr>
            <tr>
                <td class="t-r">去年同日 <span>{{getLastDay}}</span></td>
                <td>
                    <el-input v-model="lastYearDay" placeholder="万元"></el-input>
                </td>
                <td class="t-r">同比</td>
                <td v-if="todaySale & lastYearDay">{{((todaySale/lastYearDay -1)*100).toFixed(2)}}%</td>
            </tr>
            <tr>
                <td class="t-r">环比上{{getWeek}} <span>{{getLastWeekDate}}</span></td>
                <td>
                    <el-input v-model="lastWeek" placeholder="万元"></el-input>
                </td>
                <td class="t-r">环比</td>
                <td v-if="todaySale & lastWeek">{{((todaySale/lastWeek -1)*100).toFixed(2)}}%</td>
            </tr>
        </table>
        <h3>当日楼层销售(单位：万元)</h3>
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in floors" :key="item.name">
                <el-row>
                    <el-col class="lh-20" :span="4">{{item.name}}层:</el-col>
                    <el-col :span="18">
                        <el-input type="number" v-model="item.value" placeholder="万元"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3>业态明细(单位：万元)</h3>
        <table>
            <thead>
                <th colspan="2">上周{{getWeek}} ({{getLastWeekDate}})</th>
                <th colspan="2">本周{{getWeek}} ({{getToday}})</th>
            </thead>
            <tbody>
                <tr v-for='item in format' :key="item.label">
                    <td>{{item.label}}</td>
                    <td>
                        <el-input placeholder="万元" v-model="item.lastVal"></el-input>
                    </td>
                    <td>零售</td>
                    <td>
                        <el-input placeholder="万元" v-model="item.val"></el-input>
                    </td>
                    <td>环比</td>
                    <td v-if="item.lastVal&&item.val">{{((item.val/item.lastVal-1)*100).toFixed(2)}}%</td>
                </tr>
            </tbody>
        </table>
        <h3>重点商户销售明细(单位：万元)</h3>
        <table>
            <thead>
                <th></th>
                <th>店铺名</th>
                <th>销售额(万元)</th>
            </thead>
            <tr>
                <td>主力店</td>
                <td>
                    <el-input placeholder="主力店铺" v-model="mainStore.storeName"></el-input>
                </td>
                <td>
                    <el-input placeholder="万元" v-model="mainStore.saleVal"></el-input>
                </td>
            </tr>
            <tr>
                <td>次主力店</td>
                <td>
                    <el-input placeholder="次主力店铺" v-model="subMainStore.storeName"></el-input>
                </td>
                <td>
                    <el-input placeholder="万元" v-model="subMainStore.saleVal"></el-input>
                </td>
            </tr>
            <tr>
                <td>新开业品牌</td>
                <td>
                    <el-input placeholder="店铺" v-model="newStore.storeName"></el-input>
                </td>
                <td>
                    <el-input placeholder="万元" v-model="newStore.saleVal"></el-input>
                </td>
            </tr>
            <tr v-for="item in otherImpShop" :key="item.id">
                <td></td>
                <td>
                    <el-input placeholder="店铺" v-model="item.storeName"></el-input>
                </td>
                <td>
                    <el-input placeholder="万元" v-model="item.saleVal"></el-input>
                </td>
            </tr>
            <tr @click="addShop">
                <td></td>
                <td colspan="2">
                    <div class="add-shop">
                        <i class="el-icon-plus"></i>
                        <span>添加店铺销售</span>
                    </div>

                </td>
            </tr>
        </table>
        <div class="btn-footer">
            <el-button @click="commit">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todaySale: '', // 当日销售额
                // tProgress: this.getTProgress(), // 时间进度
                mall: '', // 选中项目
                todayCustomer: '',
                monthTarget: '', // 本月销售目标
                monthSale: '', // 本月销售额
                lastYearWeek: '', // 去年同期销售额
                lastYearDay: '', // 去年同日销售额
                lastWeek: '', // 一周前同日销售额
                malls: [{ // 项目数组
                    code: 9002,
                    label: '成都九方'
                }, {
                    code: 9006,
                    label: '昆山九方'
                }, {
                    code: 9001,
                    label: '赣州九方'
                }, {
                    code: 9010,
                    label: '九方巨亿'
                }, {
                    code: 9009,
                    label: '浏阳九方北正西'
                }, {
                    code: 9005,
                    label: '九江九方'
                }, {
                    code: 9011,
                    label: '侨城坊九方荟'
                }],
                today: new Date(),
                weeks: ['天', '一', '二', '三', '四', '五', '六'],
                floors: [{
                    name: 'B1',
                    value: ''
                }, {
                    name: 'F1',
                    value: ''
                }, {
                    name: 'F2',
                    value: ''
                }, {
                    name: 'F3',
                    value: ''
                }, {
                    name: 'F4',
                    value: ''
                }, {
                    name: 'F5',
                    value: ''
                }, {
                    name: 'F6',
                    value: ''
                }],
                format: [{
                    label: '零售',
                    lastVal: '',
                    val: ''
                }, {
                    label: '餐饮',
                    lastVal: '',
                    val: ''
                }, {
                    label: '亲子',
                    lastVal: '',
                    val: ''
                }, {
                    label: '配套',
                    lastVal: '',
                    val: ''
                }],
                otherImpShop: [],
                mainStore: {
                    storeName: '',
                    saleVal: ''
                },
                subMainStore: {
                    storeName: '',
                    saleVal: ''
                },
                newStore: {
                    storeName: '',
                    saleVal: ''
                }
            }
        },
        computed: {
            getWeek() {
                let i = this.today.getDay()
                return '周' + this.weeks[i];
            },
            getToday() {
                let year = this.today.getFullYear(),
                    month = this.today.getMonth() + 1,
                    day = this.today.getDate();

                return year + '.' + month + '.' + day;
            },
            getLastDay() {
                let year = this.today.getFullYear() - 1,
                    month = this.today.getMonth() + 1,
                    day = this.today.getDate();

                let lastWeek = new Date(year, month - 1, day).getDay();

                return '周' + this.weeks[lastWeek] + ' ' + year + '.' + month + '.' + day;
            },
            getLastWeekDate() {
                let newD = new Date(this.today.getTime() - 7 * 24 * 60 * 60 * 1000),
                    year = newD.getFullYear(),
                    month = newD.getMonth() + 1,
                    day = newD.getDate();

                return year + '.' + month + '.' + day;
            },
            getTProgress() {
                let arr = [1, 2, 3, 5, 7, 8, 10, 12];
                let week = this.today.getMonth() + 1,
                    day = this.today.getDate();
                let days = week in arr ? 31 : 30;
                return (day / days * 100).toFixed(2) + '%';
            }
        },
        methods: {
            async commit() {
                let obj = {
                    mall: this.mall,
                    today: this.today, // 提报日期
                    todaySale: this.todaySale, // 当日销售总额
                    monthProgress: this.monthProgress,
                    todayCustomer: this.todayCustomer,
                    monthTarget: this.monthTarget,
                    monthSale: this.monthSale,
                    lastYearWeek: this.lastYearWeek,
                    lastYearDay: this.lastYearWeek,
                    lastWeek: this.lastWeek,
                    floors: this.floors, // 楼层
                    format: this.format, // 业态
                    mainStore: this.mainStore,
                    subMainStore: this.subMainStore,
                    newStore: this.newStore,
                    otherImpStore: this.otherImpShop
                };
                console.log(obj)
            },
            addShop() {
                this.otherImpShop.push({
                    id: this.otherImpShop.length,
                    storeName: '',
                    saleVal: ''
                })
                console.log(this.otherImpShop)
            }
        },
        mounted() {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
    h2 {
        font-size: 18px;
        text-align: left;
        padding: 10px;
    }

    h3 {
        font-size: 16px;
        text-align: left;
        padding: 10px;
    }

    th {
        text-align: center;
        padding: 7px;
        font-weight: bold;
    }

    tr {
        :nth-child(2n) {
            padding-right: 15px;
            text-align: left;
        }
    }

    td {
        padding-bottom: 10px;
        padding-left: 10px;
    }

    .el-col {
        margin-bottom: 5px;
    }

    .add-shop {
        font-size: 13px;
        padding: 7px;
        border-radius: 2px;
        box-shadow: 0px 0px 1px 0px #cecece;
        cursor: pointer;
        text-align: center;

        i {
            font-weight: bold;
            margin-right: 5px;
        }

        &:hover {
            color: #409EFF;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
    }

    .btn-footer {
        // position: sticky;
        // left: -22px;
        // bottom: -20px;
        // width: 100%;
        // background: #e9eef3;
        // padding: 20px;

        .el-button {
            width: 100%;
        }
    }
</style>