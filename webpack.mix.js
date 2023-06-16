let mix = require('laravel-mix');

//in below method there are two parameters
//1. which file to compile
//2. where to store after compilation
// '.js' for javacript and '.sass' for scss file
mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss' , 'public/css/app.css');