'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 通用接口
  router.get('/captcha', controller.user.captcha);
  router.post('/sale/getSale', controller.sale.getDaySale);   // 查看门店具体日期销售数据
  router.post('/sale/saleList', controller.sale.getMallSaleList);  // 查看门店销售数据列表
  router.post('/sale/getMonthSales', controller.sale.getMonthSales);    // 查询门店某月销售数据
  router.post('/sale/target', controller.sale.getTarget);     // 获取某月目标值

  // 移动端接口
  router.get('/', controller.home.index);

  router.get('/userinfo', controller.user.info);

  router.get('/dailyNew', controller.data.dailyNew);

  router.get('/totalMember', controller.data.totalMember);

  router.get('/totalSum', controller.data.totalSum);

  // 后台管理系统接口
  router.post('/user/login', controller.user.login);

  router.post('/sale/create', controller.sale.create);   // 创建销售数据
  router.post('/sale/update', controller.sale.update);   // 更新销售数据

  router.post('/mall/info', controller.mall.getInfo);     // 获取项目信息

};
