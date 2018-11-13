'use strict';
const express = require('express');

module.exports = class Jakexpress {
    load(serverParams) {
        const port = process.env.PORT || serverParams.localport ? serverParams.localport : 3000;
        const app = express();

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
        
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }
}
