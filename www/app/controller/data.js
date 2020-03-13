'use strict';

const BaseController = require('./base');

class DataController extends BaseController {
  async dailyNew() {
    const dailyN = {
      kuns: {
        name: '昆山',
        value: [ 326, 111, 99, 99, 88, 168, 304, 269, 82, 73, 97, 155, 185, 247, 271, 83, 70, 83, 93, 167, 253, 370, 114, 579, 129, 82, 127, 220, 233, 98, 205 ],
      },
      chengd: {
        name: '成都',
        value: [ 302, 141, 140, 149, 132, 147, 318, 262, 163, 164, 157, 159, 265, 255, 244, 156, 191, 147, 152, 188, 278, 254, 130, 138, 177, 147, 194, 252, 270, 151, 181 ],
      },
      ganz: {
        name: '赣州',
        value: [ 152, 34, 47, 43, 62, 73, 66, 79, 39, 42, 48, 59, 60, 98, 103, 36, 29, 41, 47, 55, 107, 97, 34, 55, 68, 44, 41, 81, 132, 53, 316 ],
      },
      juyi: {
        name: '巨亿',
        value: [ 11, 5, 6, 7, 21, 15, 16, 22, 7, 11, 7, 16, 202, 75, 50, 61, 46, 36, 116, 125, 127, 75, 50, 39, 28, 72, 17, 16, 17, 200, 33 ],
      },
      liuy: {
        name: '浏阳',
        value: [ 22, 7, 17, 13, 78, 9, 30, 288, 75, 374, 138, 129, 142, 219, 104, 48, 6, 6, 3, 12, 16, 16, 16, 98, 74, 8, 15, 12, 20, 6, 28 ],
      },
      jiuj: {
        name: '九江',
        value: [ 41, 21, 100, 59, 23, 149, 160, 39, 755, 608, 395, 433, 501, 753, 518, 20, 21, 33, 16, 23, 53, 39, 18, 49, 53, 20, 19, 61, 45, 38, 111 ],
      },
    };
    this.success(dailyN);
  }

  async totalMember() {
    const totalM = [
      {
        name: '全部',
        data: [
          {
            type: '全部',
            data: '1079534',
          },
          {
            type: '微卡',
            data: '843686',
          },
          {
            type: 'VIP卡',
            data: '222066',
          },
          {
            type: 'SVIP卡',
            data: '13782',
          },
        ],
      },
      {
        name: '昆山',
        data: [
          {
            type: '全部',
            data: '154919',
          },
          {
            type: '微卡',
            data: '122712',
          },
          {
            type: 'VIP卡',
            data: '27844',
          },
          {
            type: 'SVIP卡',
            data: '4363',
          },
        ],
      },
      {
        name: '成都',
        data: [
          {
            type: '全部',
            data: '165937',
          },
          {
            type: '微卡',
            data: '140997',
          },
          {
            type: 'VIP卡',
            data: '24274',
          },
          {
            type: 'SVIP卡',
            data: '666',
          },
        ],
      },
      {
        name: '赣州',
        data: [
          {
            type: '全部',
            data: '113932',
          },
          {
            type: '微卡',
            data: '91454',
          },
          {
            type: 'VIP卡',
            data: '21381',
          },
          {
            type: 'SVIP卡',
            data: '1097',
          },
        ],
      },
      {
        name: '巨亿',
        data: [
          {
            type: '全部',
            data: '38484',
          },
          {
            type: '微卡',
            data: '36057',
          },
          {
            type: 'VIP卡',
            data: '2180',
          },
          {
            type: 'SVIP卡',
            data: '247',
          },
        ],
      },
      {
        name: '浏阳',
        data: [
          {
            type: '全部',
            data: '22184',
          },
          {
            type: '微卡',
            data: '14487',
          },
          {
            type: 'VIP卡',
            data: '7695',
          },
          {
            type: 'SVIP卡',
            data: '2',
          },
        ],
      },
      {
        name: '九江',
        data: [
          {
            type: '全部',
            data: '53721',
          },
          {
            type: '微卡',
            data: '14919',
          },
          {
            type: 'VIP卡',
            data: '38196',
          },
          {
            type: 'SVIP卡',
            data: '606',
          },
        ],
      },
    ];
    this.success(totalM);
  }

  async totalSum() {
    const totalS = [{
      name: '昆山',
      vip: 4106998.49,
      dz: 3356934.38,
      svip: 2072426.46,
    },
    {
      name: '成都',
      vip: 1282291.88,
      dz: 6084046.61,
      svip: 920226.39,
    },
    {
      name: '赣州',
      vip: 2324300.21,
      svip: 628660.35,
      dz: 3173215.81,
    },
    {
      name: '巨亿',
      vip: 370885.17,
      dz: 388797.45,
      svip: 202660.01,

    },
    {
      name: '浏阳',
      vip: 278208.10,
      dz: 588711.65,
      svip: 0,
    },
    {
      name: '九江',
      vip: 4911928.69,
      dz: 2910348.95,
      svip: 890174.02,
    },
    ];
    this.success(totalS);
  }

}

module.exports = DataController;
