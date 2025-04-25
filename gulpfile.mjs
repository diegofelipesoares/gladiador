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

// Observa mudanças nos arquivos SCSS
function watch() {
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles, images)); // Observa mudanças e executa tarefas
}

export default gulp.series(styles, images); // Exporta a tarefa padrão
export { styles, images, watch }; // Exporta as outras funções