var express = require('express');
var number = require('./lib/number');

var app = express();

//设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use(require('body-parser')());

function getWeatherData() {
    return {
        locations: [{
                name: '天津',
                forecastUrl: 'https://www.baidu.com',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: '多云',
                temp: '38度'
            },
            {
                name: '北京',
                forecastUrl: 'https://www.baidu.com',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: '多云',
                temp: '39度'
            },
            {
                name: '上海',
                forecastUrl: 'https://www.baidu.com',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: '多云',
                temp: '40度'
            }
        ]
    }
}

app.use(function(req, res, next) {
    if (!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.weather = getWeatherData();
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/jquerytest', function(req, res) {
    res.render('jquerytest');
});

app.get('/about', function(req, res) {
    res.render('about', {
        number: number.getNumber(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
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