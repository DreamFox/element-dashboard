import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'vvliebe',
    password: '123456',
    avatar: 'https://o0p2nwku4.qnssl.com/favicon.ico'
  }
];

const Users = [];
const userCount = 200;

for (let i = 0; i < userCount; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    mobile: '13000001234',
    imgUrl: 'https://o0p2nwku4.qnssl.com/favicon.ico',
    address: Mock.mock('@county(true)'),
    ticket: '无',
    status: '已中奖',
    date: Number(Mock.Random.datetime('T'))
  }));
}

export { LoginUsers, Users };
