'use strict';
const express = require('express');
const bodyParser = require('body-parser');

module.exports = class Jakexpress {
    load(serverParams) {
        const port = process.env.PORT || serverParams.localport ? serverParams.localport : 3000;
        const app = express();

        if(typeof serverParams.bp === 'undefined' || serverParams.bp) {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
        }

        if(serverParams.cors) {
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
                next();
            });
        }

        serverParams.use && serverParams.use.forEach(param => app.use(param));

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
