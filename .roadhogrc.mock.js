import users from './mock/users';
import info_mine from './mock/info_mine';


export default {
    // 支持值为 Object 和 Array
    'GET /mock/info/mine': (req, res) => { res.send(info_mine)},
  
    // GET POST 可省略
    '/mock/users/1': { id: 1 },
  
    // 支持自定义函数，API 参考 express@4
    'POST /mock/users/create': (req, res) => { res.end('OK')},
  };