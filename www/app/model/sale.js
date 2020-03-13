module.export = app => {
    const Sale = {
        mall: { type: String, require: true },
        today: { type: String, require: true },
        todaySale: { type: String, require: true },
        monthProgress: { type: String, require: true },
        todayCustomer: { type: String, require: true },
        monthTarget: { type: String, require: true },
        monthSale: { type: String, require: true },
        lastYearWeek: { type: String, require: true },
        lastYearDay: { type: String, require: true },
        lastWeek: { type: String, require: true },
        floors: { type: Array, require: true },
        format: { type: Array, require: true },
        mainStore: { type: Object, require: true },
        subMainStore: { type: Object, require: true },
        newStore: { type: Object, require: true },
        otherImpStore: { type: Array, require: true }
    }
}