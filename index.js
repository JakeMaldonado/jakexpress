'use strict';
const express = require('express');
const bodyParser = require('body-parser');

module.exports = class Jakexpress {
    load(serverParams) {
        const port = process.env.PORT || serverParams.localport ? serverParams.localport : 3000;
        const app = express();

        if(typeof serverParams.bp === 'undefined' || serverParams.bp) {
            bodyParser.json();
            bodyParser.urlencoded({ extended: true });
        }

        serverParams.use.forEach(param => app.use(param));

        serverParams.paths.forEach(pathObj => {
            switch(pathObj.method ? pathObj.method.toLowerCase() : '') {
                case 'post':
                    app.post(pathObj.path, pathObj.action);
                    break;
                case 'delete':
                    app.delete(pathObj.path, pathObj.action);
                    break;
                case 'put':
                    app.put(pathObj.path, pathObj.action);
                    break;
                case 'patch':
                    app.patch(pathObj.path, pathObj.action);
                    break;
                default:
                    app.get(pathObj.path, pathObj.action);
            }
        });

        app.listen(
            port, 
            serverParams.listenaction ? serverParams.listenaction : () => console.log(`Server listening on port: ${port}`)
        );
    }
}
