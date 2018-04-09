import Mock from 'mockjs';

export default Mock.mock({
    'data|3-6': [
        {
            id: '@id',
            name: '@name',
            'age|18-32': 1
        }
    ]
});
