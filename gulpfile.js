//IMPORTAÇÕES
const gulp = require('gulp'); //importando gulp
const sass = require('gulp-sass')(require('sass')); //importando gulp-sass e sass
const cleanCSS = require('gulp-clean-css'); // Importa o gulp-clean-css para minificação

//FUNÇÕES
// Função para compilar e minificar arquivos SCSS
function styles() {
    return gulp.src('./src/styles/**/*.scss') // Seleciona todos os arquivos .scss
        .pipe(sass().on('error', sass.logError)) // Compila os arquivos SCSS
        .pipe(cleanCSS({ level: 2 })) // Minifica o CSS gerado
        .pipe(gulp.dest('./dist/css')); // Salva na pasta dist/css
}

exports.default = styles; // Exporta a função styles como padrão

//FUNÇÕES DE OBSERVAÇÃO
// Observa mudanças nos arquivos SCSS
exports.watch = function() {
    gulp.watch('./src/styles/**/*.scss', // Chama a função styles quando há mudanças
        gulp.parallel(styles)); //método gulp.parallel para executar tarefas em paralelo
}