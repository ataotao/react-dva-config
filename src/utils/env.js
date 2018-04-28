let obj = {
    debug: process.env.NODE_ENV !== 'production'
};
switch (window.location.hostname) {
    case '192.168.1.250':
    case '192.168.1.133':
    case 'dev.test.cn':
        obj.appId = 'wxd47a4e2027a28b55';
        break;
    default:
        obj.appId = 'wx26d5d7a9568f7048';
        break;
}

export default obj;
