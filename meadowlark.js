var express = require('express');
var number = require('./lib/number');

var app = express();

//设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        number: number.getNumber(),
        pageTestScript: '/qa/tests-about.js'
    });
});

//定制404页面
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

//定制500页面
app.use(function(req, res) {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('express启动');
});