var express = require('express');

var app = express();

//设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    res.render('about', { number: randomNumber });
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