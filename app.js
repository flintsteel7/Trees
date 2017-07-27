/**
 * Created by Peter on 7/26/2017.
 */

'use strict';

let express = require('express');
let app = express();


app.use(express.static(`${__dirname}`));

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000);
