var express = require('express');

var app = express();

//设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('about页面');
});

//定制404页面
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404了');
});

//定制500页面
app.use(function(req, res) {
    res.type('text/plain');
    res.status(500);
    res.send('500了');
});

app.listen(app.get('port'), function() {
    console.log('express启动');
});