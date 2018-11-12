'use strict';
const express = require('express');

module.exports = class Jserv {
    load(serverParams) {
        let port = process.env.PORT || serverParams.localport;
        const app = express();

        serverParams.use.forEach(param => {
            app.use(param);
        });

        serverParams.paths.map(pathObj => {
            let expressPath = {
                'get': app.get(pathObj.path, pathObj.action),
                'post': app.post(pathObj.path, pathObj.action),
                'delete': app.delete(pathObj.path, pathObj.action),
                'put': app.put(pathObj.path, pathObj.action),
                'patch': app.patch(pathObj.path, pathObj.action)
            };
            return expressPath[pathObj.method];
        });
        
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }
}

