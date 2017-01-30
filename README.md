# Empty frontent project structure

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
   ¦  +--vendor/              # e.g. JQuery
   ¦  +--components/          # прочие плагины
   ¦  +--main.js
   +--svg/
   +--pages/                  # html
   ¦  +--/blocks              # повторяющиеся блоки (header, footer, ...)
   ¦     +--demomenu.html     # демо меню со всеми страеницами и ui kit
   ¦  +--index.html           # html
   ¦  +--...                 
+--build/                     # файлы проекта после сборки
   +--css/               
   ¦  +--styles.min.css       # минимизированный css
   +--js/
   ¦  +--custom.min.js        # минимизированный js
   +--img/
   ¦  +--svg/                 # цельный файл svg
   +--fonts/                  # шрифты
   +--index.html              # index.html
   +--...                     # тут же остальные html файлы после сборки
+--gulpfile.js           
+--package.json
+--.gitignore                 # ignore node_modules | ignore build
```