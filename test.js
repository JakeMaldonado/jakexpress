const Jakexpress = require('./index');
const bodyParser = require('body-parser');

let serverParams = {
    localport: 3000,
    use: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ],
    paths: [
        {
            method: 'post',
            path: '/test',
            action: (req, res) => {
                res.send('hi')
            }
        }, {
            method: 'get',
            path: '/test2',
            action: (req, res) => {
                res.send('yo fam')
            }
        }
    ]
};

const server = new Jakexpress();
server.load(serverParams);