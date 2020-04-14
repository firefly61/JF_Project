<template>
    <div class="home-page">
        <van-cell title="选择日期" :value="date" @click="showCalendar = true" />
        <van-calendar v-model="showCalendar" :min-date="minDate" :max-date="maxDate" :default-date="defaultDate"
            @confirm="onConfirm" />
        <van-cell title="选择项目" :value="mall.name" @click="showMall = true" />
        <van-action-sheet v-model="showMall" :actions="actions" @select="onSelect" />

        <van-loading v-if="loadingFlag" color="#1989fa" />
        <div v-if="resFlag" class="add-report">
            <h2>{{f_date}} ({{getWeek}})
                <tr />
                <span class="c-red">{{mall.name}}</span> 销售报告
            </h2>
            <table>
                <tr>
                    <td class="c-red">当日总销售额</td>
                    <td>
                        {{todaySale}} 万元
                    </td>
                    <td>时间进度</td>
                    <td>{{getTProgress}}</td>
                </tr>
                <tr>
                    <td class="c-red">当日客流</td>
                    <td>
                        {{todayCustomer}}人次
                    </td>
                    <td v-if="mall.code==9002" class="c-red">文轩客流</td>
                    <td v-if="mall.code==9002">
                        {{todayCustomer}}人次
                    </td>
                </tr>
                <tr>
                    <td class="c-red">本月销售目标<i v-if="mall.code==9001">含天虹</i>{{monthTarget}}万元</td>
                    <td>
                        {{monthTarget}}万元
                    </td>
                    <td>
                        完成
                    </td>
                    <td>
                        {{((monthSale/monthTarget) * 100).toFixed(2)}}%
                    </td>
                </tr>
                <tr v-if="mall.code==9001">
                    <td class="c-red">本月销售目标不含天虹{{monthTargetNoTH}}万元</td>
                    <td>
                        {{monthTargetNoTH}}万元
                    </td>
                    <td>
                        完成
                    </td>
                    <td>
                        {{((monthSaleNoTH/monthTargetNoTH) * 100).toFixed(2)}}%
                    </td>
                </tr>
                <tr>
                    <td>去年同期 <span>{{getWeek}}</span><span>(12月31日)</span></td>
                    <td>{{lastYearWeek}}万元</td>
                    <td>同比</td>
                    <td>{{((todaySale/lastYearWeek - 1) * 100).toFixed(2)}}%</td>
                </tr>
                <tr>
                    <td>去年同日 <span>{{getLastDay}}</span></td>
                    <td> {{lastYearDay}}万元</td>
                    <td>同比</td>
                    <td>{{((todaySale/lastYearDay -1)*100).toFixed(2)}}%</td>
                </tr>
                <tr>
                    <td>环比上周 <span>{{getWeek}}</span><span>{{getLastWeekDate}}</span></td>
                    <td>{{lastWeek}}万元</td>
                    <td>环比</td>
                    <td>{{((todaySale/lastWeek -1)*100).toFixed(2)}}%</td>
                </tr>
            </table>
            <h3>当日楼层销售</h3>
            <!-- <table>
                <tr v-for="item in floors" :key="item.name">
                    <td>{{item.name}}层</td>
                    <td>{{item.value}}万元</td>
                </tr>
            </table> -->
            <floors-charts :floors="floors"></floors-charts>
            <h3>环比上周 {{getLastWeekDate}} ({{getWeek}}) 业态明细</h3>
            <table>
                <thead>
                    <th colspan="2">上周{{getWeek}} ({{getLastWeekDate}})</th>
                    <th colspan="2">本周{{getWeek}} ({{getToday}})</th>
                </thead>
                <tbody>
                    <tr v-if="mall.code==9002 && wxSale">
                        <td>文轩书店</td>
                        <td>
                            {{wxSale.lastVal}}万元
                        </td>
                        <td>文轩书店</td>
                        <td>
                            {{wxSale.val}}万元
                        </td>
                        <td>环比</td>
                        <td>{{((wxSale.val/wxSale.lastVal-1)*100).toFixed(2)}}%</td>
                    </tr>
                    <tr v-for="item in format" :key="item.label">
                        <td>{{item.label}}</td>
                        <td>
                            {{item.lastVal}}万元
                        </td>
                        <td>零售</td>
                        <td>
                            {{item.val}}万元
                        </td>
                        <td>环比</td>
                        <td v-if="item.val!=0 || item.lastVal!=0">{{((item.val/item.lastVal-1)*100).toFixed(2)}}%</td>
                        <td v-else>0</td>
                    </tr>
                </tbody>
            </table>
            <h3>重点商户销售明细</h3>
            <table>
                <thead>
                    <th></th>
                    <th>店铺名</th>
                    <th>销售额(万元)</th>
                </thead>
                <tr v-for="item in impStore" :key="item.id">
                    <td>{{item.storeType}}</td>
                    <td>
                        {{item.storeName}}
                    </td>
                    <td>
                        {{item.saleVal}}万元
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import FloorsCharts from '../components/floorsCharts';
    export default {
        data() {
            return {
                date: '',
                f_date: '',
                today: new Date(),
                showCalendar: false,
                showMall: false,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2020, 11, 30),
                defaultDate: new Date(),
                loadingFlag: false, // loading...
                resFlag: false, // 数据展示
                mall: {
                    code: 9002,
                    name: '成都九方'
                },
                actions: [{
                    code: 9002,
                    name: '成都九方'
                }, {
                    code: 9006,
                    name: '昆山九方'
                }, {
                    code: 9001,
                    name: '赣州九方'
                }, {
                    code: 9010,
                    name: '九方巨亿'
                }, {
                    code: 9009,
                    name: '浏阳九方北正西'
                }, {
                    code: 9005,
                    name: '九江九方'
                }, {
                    code: 9011,
                    name: '侨城坊九方荟'
                }],
                weeks: ['天', '一', '二', '三', '四', '五', '六'],
                todaySale: '', // 当日销售额
                todayCustomer: '', // 今日客流
                todayWXCustomer: '', // 成都文轩客流
                monthTarget: '', // 本月销售目标
                monthSale: '', // 本月销售额
                monthTargetNoTH: '', // 赣州本月销售目标不含天虹
                monthSaleNoTH: '', // 赣州本月销售额不含天虹
                lastYearWeek: '', // 去年同期销售额
                lastYearDay: '', // 去年同日销售额
                lastWeek: '', // 一周前同日销售额,
                impStore: [],
                format: [],
                floors: [],
                wxSale: {}
            }
        },
        async mounted() {
            this.defaultDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
            this.date = this.formatDate(this.defaultDate);
            this.getData();
        },
        computed: {
            getToday() {
                let year = this.today.getFullYear(),
                    month = this.today.getMonth() + 1,
                    day = this.today.getDate();

                return year + '.' + month + '.' + day;
            },
            getLastWeekDate() {
                let newD = new Date(this.today.getTime() - 7 * 24 * 60 * 60 * 1000),
                    year = newD.getFullYear(),
                    month = newD.getMonth() + 1,
                    day = newD.getDate();

                return year + '.' + month + '.' + day;
            },
            getLastDay() {
                let year = this.today.getFullYear() - 1,
                    month = this.today.getMonth() + 1,
                    day = this.today.getDate();

                let lastWeek = new Date(year, month - 1, day).getDay();

                return '周' + this.weeks[lastWeek] + ' ' + year + '.' + month + '.' + day;
            },
            getWeek() {
                let i = this.today.getDay()
                return '周' + this.weeks[i];
            },
            getTProgress() {
                let arr = [1, 2, 3, 5, 7, 8, 10, 12];
                let week = this.today.getMonth() + 1,
                    day = this.today.getDate();
                let days = arr.indexOf(week)>0 ? 31 : 30;
                return (day / days * 100).toFixed(2) + '%';
            }
        },
        methods: {
            formatDate(date, type = 'default') {
                if (type == 'char') {
                    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                } else {
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                }
            },
            async onConfirm(d) {
                this.showCalendar = false;
                this.date = this.formatDate(d);
                this.f_date = this.formatDate(d, 'char');
                this.today = d;
                await this.getData();
            },
            async onSelect(item) {
                this.showMall = false;
                this.mall = item;
                this.loadingFlag = true;
                await this.getData();
            },
            async getData() {
                let obj = {
                    mall: this.mall.code,
                    date: new Date(this.date).getTime()
                }
                await this.$http.post('sale/getSale', obj).then(
                    (data) => {
                        this.loadingFlag = false;
                        if (data.data) {
                            this.resFlag = true;
                            let res = data.data;
                            this.todaySale = res.todaySale;
                            this.todayCustomer = res.todayCustomer;
                            this.monthTarget = res.monthTarget;
                            this.monthSale = res.monthSale;
                            this.monthTargetNoTH = res.monthTargetNoTH;
                            this.monthSaleNoTH = res.monthSaleNoTH;
                            this.lastYearWeek = res.lastYearWeek;
                            this.lastYearDay = res.lastYearDay;
                            this.lastWeek = res.lastWeek;
                            this.floors = res.floors;
                            this.format = res.format;
                            this.impStore = res.impStore;
                            this.wxSale = res.wxSale;
                        } else {
                            this.resFlag = false;
                            this.todaySale = '';
                            this.todayCustomer = '';
                            this.monthTarget = '';
                            this.monthSale = '';
                            this.monthTargetNoTH = '';
                            this.monthSaleNoTH = '';
                            this.lastYearWeek = '';
                            this.lastYearDay = '';
                            this.lastWeek = '';
                            this.floors = [];
                            this.format = [];
                            this.impStore = [];
                            this.$notify({
                                type: 'danger',
                                message: data.message
                            });
                        }
                    }, (err) => {
                        this.$notify({
                            type: 'danger',
                            message: err.message
                        });
                    }
                )
            }
        },
        components: {
            FloorsCharts
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
    .van-loading {
        padding: 60px;
    }

    .add-report {
        padding: 0 15px 60px;

        h2 {
            font-size: 18px;
            line-height: 22px;
            background: #deedff;
            padding: 8px;
            border-radius: 5px;
        }

        h3 {
            font-size: 16px;
            background: #deedff;
            padding: 8px;
            border-radius: 8px;
        }

        table {
            font-size: 13px;
            margin: 10px 0 15px;

            tr {
                td {
                    text-align: left;
                    padding: 5px 9px 5px 9px;
                }
            }

            thead {
                th {
                    font-weight: bold;
                    padding: 10px 5px;
                    ;
                }
            }
        }
    }

    .van-cell__title {
        text-align: left;
    }
</style>