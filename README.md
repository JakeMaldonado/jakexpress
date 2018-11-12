# Jakexpress

### Install with NPM

`npm i jakexpress`

#### Require Jakexios

``` javascript
const Jakexpress = require('jakexpress');
```

### Create your server params

The server params take in three parameters: `localport`,`use`,`paths`.

#### localport

`localport` is the port you want to host on if the environment is not development.

###### example

`localport: 3000,`

#### use

`use` is what you want to add to express, it will be added in express like:
`app.use(YOUR PARAM);`

`use` should be an array.

###### example

``` javascript
use: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
]
```

#### paths

###### `paths` is an array of objects - each objects should contain: 
   
`method`: the method of the request  -- defaults to `get` if undefined
`path`: the path of the url  
`action`: a function to do when the path is requested  

###### example

```javascript
paths: [
    {
        method: 'get',
        path: '/test',
        action: (req, res) => {
            res.send('hi')
        }
    }
]
```

### Example usage

Here is an example of jakexpress being used to make a simple server where the get `/test` path responds with 'hi'.

```javascript
const Jakexpress = require('jakexpress');
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
            action: getTest
        }
    ]
};

function getTest(req, res) {
    console.log(req);
    res.send('hi');
}

const server = new Jakexpress();
server.load(serverParams);
```


