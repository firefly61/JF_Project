<template>
    <div class="add-report">
        <h2>销售填报</h2>
        <table>
            <tr>
                <td class="t-r fwb">项目</td>
                <td>
                    <el-select v-model='mall' placeholder="请选择">
                        <el-option v-for="item in malls" :key="item.code" :label="item.label" :value="item.code"
                            :disabled="item.code!=user.mall">
                        </el-option>
                    </el-select>
                </td>
                <td class="t-r">日期</td>
                <td>
                    <el-date-picker v-model="today" type="date" placeholder="选择日期" @blur="dateBlur">
                    </el-date-picker>
                </td>
                <td class="t-r">时间进度</td>
                <td>{{getTProgress}}</td>
            </tr>
            <tr>
                <td class="t-r c-r">当日总销售额(单位：万元)</td>
                <td>
                    <el-input v-model="todaySale" placeholder="万元" type="number"></el-input>
                </td>
            </tr>
            <tr>
                <td class="t-r">当日客流(单位：人次)</td>
                <td>
                    <el-input v-model="todayCustomer" placeholder="人次" type="number"></el-input>
                </td>
                <td class="t-r" v-if="user.mall==9002">文轩客流(单位：人次)</td>
                <td v-if="user.mall==9002">
                    <el-input v-model="todayWXCustomer" placeholder="人次" type="number"></el-input>
                </td>
            </tr>
            <tr>
                <td class="t-r c-r">本月销售目标<i v-if="user.mall==9001">含天虹</i>(单位：万元)</td>
                <td>
                    <el-input v-model="monthTarget" placeholder="万元" type="number"></el-input>
                </td>
                <td class="t-r c-r">
                    本月销售额<i v-if="user.mall==9001">含天虹</i>(单位：万元)
                </td>
                <td>
                    <el-input placeholder="万元" type="number" v-model="monthSale"></el-input>
                </td>
            </tr>
            <tr>
                <td class="t-r">本月完成</td>
                <td v-if="monthSale && monthTarget">{{((monthSale/monthTarget) * 100).toFixed(2)}}%</td>
            </tr>
            <tr v-if="user.mall==9001">
                <td class="t-r c-r">本月销售目标不含天虹(单位：万元)</td>
                <td>
                    <el-input v-model="monthTargetNoTH" placeholder="万元" type="number"></el-input>
                </td>
                <td class="t-r c-r">
                    本月销售额不含天虹(单位：万元)
                </td>
                <td>
                    <el-input placeholder="万元" type="number" v-model="monthSaleNoTH"></el-input>
                </td>
            </tr>
            <tr v-if="user.mall==9001">
                <td class="t-r">本月完成</td>
                <td v-if="monthSale && monthTarget">{{((monthSale/monthTarget) * 100).toFixed(2)}}%</td>
            </tr>
            <tr>
                <td class="t-r">去年同期 <span>{{getWeek}}</span>(单位：万元)</td>
                <td>
                    <el-input v-model="lastYearWeek" type="number" placeholder="万元"></el-input>
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
                <td class="t-r">环比上周 {{getWeek}} <span>{{getLastWeekDate}}</span></td>
                <td>
                    <el-input v-model="lastWeek" type="number" placeholder="万元"></el-input>
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
        <el-row>
            <el-col :span="18" class="add-floor" @click.native="addFloor">
                <i class="el-icon-thumb"></i>
                <span>添加楼层</span>
            </el-col>
        </el-row>
        <h3>业态明细(单位：万元)</h3>
        <table>
            <thead>
                <th colspan="2">上周{{getWeek}} ({{getLastWeekDate}})</th>
                <th colspan="2">本周{{getWeek}} ({{getToday}})</th>
            </thead>
            <tbody>
                <tr v-if="user.mall==9002">
                    <td>文轩书店</td>
                    <td>
                        <el-input placeholder="万元" type="number" v-model="wxSale.lastVal"></el-input>
                    </td>
                    <td>文轩书店</td>
                    <td>
                        <el-input placeholder="万元" type="number" v-model="wxSale.val"></el-input>
                    </td>
                    <td>环比</td>
                    <td v-if="wxSale.lastVal&&wxSale.val">{{((wxSale.val/wxSale.lastVal-1)*100).toFixed(2)}}%</td>
                </tr>
                <tr v-for='item in format' :key="item.label">
                    <td>{{item.label}}</td>
                    <td>
                        <el-input placeholder="万元" type="number" v-model="item.lastVal"></el-input>
                    </td>
                    <td>{{item.label}}</td>
                    <td>
                        <el-input placeholder="万元" type="number" v-model="item.val"></el-input>
                    </td>
                    <td>环比</td>
                    <td v-if="item.lastVal&&item.val">{{((item.val/item.lastVal-1)*100).toFixed(2)}}%</td>
                </tr>
            </tbody>
        </table>
        <h3>重点商户销售明细(单位：万元)</h3>
        <table>
            <thead>
                <th>店铺属性</th>
                <th>店铺名</th>
                <th>销售额(万元)</th>
            </thead>
            <tr v-for="item in impStore" :key="item.id">
                <td>
                    <el-select v-model="item.storeType" placeholder="请选择">
                        <el-option v-for="item in storeTypes" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </td>
                <td>
                    <el-input :placeholder="item.storeType" v-model="item.storeName"></el-input>
                </td>
                <td>
                    <el-input placeholder="万元" type="number" v-model="item.saleVal"></el-input>
                </td>
            </tr>
            <tr @click="addShop">
                <td colspan="3">
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
                user: {}, // 存储用户信息
                todaySale: '', // 当日销售额
                // tProgress: this.getTProgress(), // 时间进度
                mall: '', // 选中项目
                todayCustomer: '', // 今日客流
                todayWXCustomer: '', // 成都文轩客流
                monthTarget: '', // 本月销售目标
                monthSale: '', // 本月销售额
                monthTargetNoTH: '', // 赣州本月销售目标不含天虹
                monthSaleNoTH: '', // 赣州本月销售额不含天虹
                lastYearWeek: '', // 去年同期销售额
                lastYearDay: '', // 去年同日销售额
                lastWeek: '', // 一周前同日销售额
                malls: [{ // 项目数组
                    code: '9002',
                    label: '成都九方'
                }, {
                    code: '9006',
                    label: '昆山九方'
                }, {
                    code: '9001',
                    label: '赣州九方'
                }, {
                    code: '9010',
                    label: '九方巨亿'
                }, {
                    code: '9009',
                    label: '浏阳九方北正西'
                }, {
                    code: '9005',
                    label: '九江九方'
                }, {
                    code: '9011',
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
                }],
                wxSale: {
                    label: '文轩书店',
                    lastVal: '',
                    val: ''
                },
                format: [{
                    label: '零售',
                    lastVal: '',
                    val: '',
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
                storeTypes: [{
                    label: '主力店',
                    value: 1
                }, {
                    label: '次主力店',
                    value: 2
                }, {
                    label: '新开业',
                    value: 3
                }, {
                    label: '其他',
                    value: 4
                }],
                impStore: [{
                    id: 0,
                    storeType: '主力店',
                    storeName: '',
                    saleVal: ''
                }],
            }
        },
        mounted() {
            let _user = JSON.parse(localStorage.getItem('user'));
            if (_user) {
                this.user = _user;
                this.malls.forEach(element => {
                    if (element.code == _user.mall) {
                        this.mall = element.label;
                        return;
                    }
                });
            } else {
                this.$router.push('login');
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
                if (this.todaySale) {
                    let obj = {
                        mall: this.user.mall,
                        today: Date.parse(this.today), // 提报日期,时间戳
                        todaySale: this.todaySale, // 当日销售总额
                        monthProgress: this.monthProgress,
                        todayCustomer: this.todayCustomer,
                        monthTarget: this.monthTarget, // 本月销售目标
                        monthSale: this.monthSale, // 本月销售额
                        monthTargetNoTH: this.monthTargetNoTH, // 赣州本月销售目标不含天虹
                        monthSaleNoTH: this.monthSaleNoTH, // 赣州本月销售额不含天虹
                        lastYearWeek: this.lastYearWeek,
                        lastYearDay: this.lastYearWeek,
                        lastWeek: this.lastWeek,
                        floors: this.floors, // 楼层
                        format: this.format, // 业态
                        impStore: this.impStore
                    };
                    if (this.mall == 9002 && this.wxSale.val) {
                        obj.wxSale = this.wxSale;
                    }
                    this.$http.post('sale/create', obj).then(() => {
                        this.$message.success("数据提交成功");
                    }, (err) => {
                        this.$message.error(err);
                    })
                }else {
                    this.$message.error ('请填写当日销售总额');
                }

            },
            async addShop() {
                await this.impStore.push({
                    id: this.impStore.length,
                    storeType: '',
                    storeName: '',
                    saleVal: ''
                })
                console.log(this.impStore)
            },
            async addFloor() {
                let _i = this.floors.length;
                let _name = 'F' + _i;
                await this.floors.push({
                    name: _name,
                    value: ''
                })
            },
            async dateBlur() {
                let obj = {
                    date: this.today.getTime(),
                    mall: this.mall
                }
                await this.$http.post('/sale/getSale', obj).then((data) => {
                    if (data.data) {
                        let res = data.data;
                        this.todaySale = res.todaySale;
                        this.todayCustomer = res.todayCustomer;
                        this.monthTarget = res.monthTarget; // 本月销售目标
                        this.monthSale = res.monthSale; // 本月销售额
                        this.monthTargetNoTH = this.user.mall == 9001 ? res.monthTargetNoTH :
                            ''; // 赣州本月销售目标不含天虹
                        this.monthSaleNoTH = this.user.mall == 9001 ? res.monthSaleNoTH : ''; // 赣州本月销售额不含天虹
                        this.lastYearWeek = res.lastYearWeek;
                        this.lastYearDay = res.lastYearDay;
                        this.lastWeek = res.lastWeek;
                        this.floors = res.floors; // 楼层
                        this.format = res.format; // 业态
                        this.impStore = res.impStore;
                    } else {
                        this.todaySale = '';
                        this.todayCustomer = '';
                        this.monthTarget = ''; // 本月销售目标
                        this.monthSale = ''; // 本月销售额
                        this.monthTargetNoTH = ''; // 赣州本月销售目标不含天虹
                        this.monthSaleNoTH = ''; // 赣州本月销售额不含天虹
                        this.lastYearWeek = '';
                        this.lastYearDay = '';
                        this.lastWeek = '';
                        this.floors = [{
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
                        }]; // 楼层
                        this.format = [{
                            label: '零售',
                            lastVal: '',
                            val: '',
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
                        }]; // 业态
                        this.impStore = [{
                            id: 0,
                            storeType: '主力店',
                            storeName: '',
                            saleVal: ''
                        }];
                    }

                })
            }
        }
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
        padding: 25px;
    }

    th {
        text-align: center;
        padding: 7px;
        font-weight: bold;
    }

    tr {
        :nth-child(2n) {
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

    .add-floor {
        cursor: pointer;
        font-size: 14px;
        width: 125px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
        ;
        padding: 8px 21px;
        margin-left: 38px;
        border-radius: 5px;

        i {
            margin-right: 5px;
            border-radius: 50px;
            padding: 2px;
            font-size: 16px;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, .08);
        }

        &:hover {
            color: #409EFF;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
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