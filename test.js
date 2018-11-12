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
            action: getTest
        }
    ]
};

function getTest(req, res) {
    res.send('hi');
}

const server = new Jakexpress();
server.load(serverParams);