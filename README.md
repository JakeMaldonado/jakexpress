# Jakexpress

### Install with NPM

`npm i jakexpress`

#### Require Jakexpress

``` javascript
const Jakexpress = require('jakexpress');
```

### Create your server params

The server params can take in 6 parameters: `localport`,`use`,`paths`, `bp`, `listenaction`, `cors`.

#### localport

`localport` is the port you want to host on if the environment is not development.  
If no `localport` is defined then it is automatically set to `3000`.

###### example

`localport: 3000,`

#### use

`use` is what you want to add to express, it will be added in express like:
`app.use(YOUR PARAM);`

`use` should be an array.

###### example

``` javascript
use: [
    express.static('public')
]
```

#### cors

`cors` set cors as true if you want to allow cross-origin resource sharing

###### example

``` javascript
cors: true
```

#### paths

##### `paths` is an array of objects - each objects should contain: 
   
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

#### bp

If `true` or `undefined` the server will automatically add  
``` javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

###### example

``` javascript
bp: true
```

#### listenaction

This is a function that will be passed to `app.listen`.  
By default it will just console log the port that the server is running on.

###### example

``` javascript
listenaction: () => console.log('server is up!')
```

### Example usage

Here is an example of jakexpress being used to make a simple server where the get `/test` path responds with 'hi'.

```javascript
const Jakexpress = require('jakexpress');

let serverParams = {
    bp: true,
    cors: true,
    localport: 3000,
    use: [
        middleWare
    ],
    paths: [
        {
            method: 'get',
            path: '/test',
            action: getTest
        }
    ],
    listenaction: () => console.log('server is up!')
};

function getTest(req, res) {
    console.log(req);
    res.send('hi');
}

function middleWare(req, res, next) {
    console.log('Request Type:', req.method);
    next();
}

const server = new Jakexpress();
server.load(serverParams);
```


