# Empty frontend project structure

## Установка npm пакетов

```bash
npm install
```

## Если проект собирается первый раз, выполнять

```bash
gulp init
```

## В последующие разы выполнять

```bash
gulp
```

``` ruby
project/
+--assets/                    # файлы проекта до сборки
   +--img/                    # изображения до сжатия
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
   +--fonts/                  # шрифты
   +--index.html              # index.html
   +--...                     # тут же остальные html файлы после сборки
+--gulpfile.js           
+--package.json
+--.gitignore                 # ignore node_modules | ignore build
```