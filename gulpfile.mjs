import gulp from 'gulp'; // Importando gulp
import gulpSass from 'gulp-sass'; // Importando gulp-sass
import sass from 'sass'; // Importando sass
import cleanCSS from 'gulp-clean-css'; // Importa o gulp-clean-css para minificação
import imagemin from 'gulp-imagemin'; // Importa gulp-imagemin como ESM

const sassCompiler = gulpSass(sass);

// Função para compilar e minificar arquivos SCSS
function styles() {
    return gulp.src('./src/styles/**/*.scss') // Seleciona todos os arquivos .scss
        .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compila os arquivos SCSS
        .pipe(cleanCSS({ level: 2 })) // Minifica o CSS gerado
        .pipe(gulp.dest('./dist/css')); // Salva na pasta dist/css
}

// Tarefa para otimizar imagens
function images() {
    return gulp.src('./src/images/**/*') // Seleciona todas as imagens na pasta src/images
        .pipe(imagemin()) // Minifica as imagens
        .pipe(gulp.dest('./dist/images')); // Salva as imagens otimizadas na pasta dist/images
}

// Observa mudanças nos arquivos SCSS e imagens
function watch() {
    gulp.watch('./src/styles/**/*.scss', styles); // Observa mudanças nos arquivos SCSS e executa a tarefa styles
    gulp.watch('./src/images/**/*', images); // Observa mudanças nas imagens e executa a tarefa images
}

// Tarefa padrão que executa apenas o SCSS inicialmente
export default gulp.series(styles); // Exporta a tarefa padrão para compilar apenas SCSS inicialmente

// Exporta as outras funções para uso individual
export { styles, images, watch };