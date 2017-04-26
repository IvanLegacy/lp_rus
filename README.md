# Empty frontend project structure

## Установка npm пакетов

```bash
npm install
```

## При сборке на production выполнить

(Windows)
```bash
set NODE_ENV=prod && gulp 
```

(Linux)
```bash
NODE_ENV=prod && gulp
```

## Для dev сборки выполнить  

```bash
gulp
```

## Если проект пустой, выполнить

```bash
gulp init
```

``` ruby
project/
+--assets/                    # файлы проекта до сборки
   +--img/                    # изображения до сжатия
   +--video/                  # видео
   +--fonts/                  # шрифты
   +--sass/                   # sass        
   ¦  +--vendor/              # библиотеки, reset.css
   ¦  +--components/          # блоки sass, библиотеки
   ¦  +--mixins.scss          # миксины sass
   ¦  +--variables.scss       # переменные sass
   ¦  +--main.scss            # @include components, vendor
   +--js/                     # js
   ¦  +--components/          # плагины
   ¦  +--main.js
   +--svg/
   +--pages/                  # html
   ¦  +--/blocks              # partial блоки (header, footer, etc.)
   ¦     +--demomenu.html     # демо меню со всеми страеницами и uikit
   ¦  +--index.html           # html
   ¦  +--...                 
+--build/                     # файлы проекта после сборки
   +--css/               
   ¦  +--styles.min.css       # min css
   +--js/
   ¦  +--custom.min.js        # min js
   +--img/
   ¦  +--svg/                 # sprite svg
   +--video/                  # видео
   +--fonts/                  # шрифты
   +--index.html              # index.html
   +--...                     # тут же остальные html файлы после сборки
+--gulpfile.js           
+--package.json
+--.gitignore                 # ignore node_modules | ignore build
```