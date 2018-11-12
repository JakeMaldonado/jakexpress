# jakexpress

npm i jakexpress

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
            method: 'get',
            path: '/test',
            action: (req, res) => {
                res.send('hi')
            }
        },
        {
            method: 'post',
            path: '/test1',
            action: (req, res) => {
                console.log(req.body);
                res.send('the post boi');
            }
        }
    ]
};


const server = new Jakexpress();
server.load(serverParams);
