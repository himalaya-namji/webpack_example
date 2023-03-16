# webpack_example
------
##1. [webpack](https://webpack.kr/)이란
- JavaScript 애플리케이션을 위한 정적 모듈 번들러(번들링 해주는 도구)
- 주로 자바스크립트(JS)를 위한 모듈 번들러이지만 호환 플러그인을 포함하는 경우 
HTML, CSS, 심지어는 이미지와 같은 프론트엔드 자산들을 변환할 수 있다.
- webpack이 애플리케이션을 처리할 때, 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고
 하나 이상의 번들을 생성하는 디펜던시 그래프를 만듭니다.
------
##2. 핵심개념
- Entry(엔트리) 
  - webpack이 내부의 디펜던시 그래프 를 생성하기 위해 사용해야 하는 모듈입니다. 
  Webpack은 엔트리 포인트가 (직간접적으로) 의존하는 다른 모듈과 라이브러리를 찾아냄.
    ```json
    module.exports = {
        entry: './path/to/my/entry/file.js',
    };
    ```
- Output(출력)
  - 생성된 번들을 내보낼 위치와 이 파일의 이름을 지정하는 방법을 webpack에 알려주는 역할
    ```json
    const path = require('path');

    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js',
        },
    };
    ```
- Loaders(로더)
  - webpack은 기본적으로 JavaScript와 JSON 파일만 이해합니다.
  - css, html, ts, jpg 등등 다른 유형의 파일을 처리하기 위해 로더가 필요.
  - 변환이 필요한 파일(들)을 식별하는 **test 속성**
변환을 수행하는데 사용되는 로더를 가리키는 **use 속성**
    
    `webpack.config.js`
    ```json 
    
    const path = require('path');

    module.exports = {
        output: {
            filename: 'my-first-webpack.bundle.js',
        },
        module: {
            rules: [{ test: /\.txt$/, use: 'raw-loader' }],
        },
    };
    ```
    >"이봐 webpack 컴파일러, require ()/import 문 내에서 '.txt' 파일로 확인되는 경로를 발견하면 번들에 추가하기 전에 raw-loader를 사용하여 변환해."
- Plugins(플러그인)
  - 로더는 특정 유형의 모듈을 변환하는 데 사용되지만, 플러그인을 활용하여 번들을 최적화하거나, 애셋을 관리하고, 또 환경 변수 주입등과 같은 광범위한 작업을 수행 할 수 있습니다.
    ```json
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack'); // 내장 plugin에 접근하는 데 사용

    module.exports = {
        module: {
            rules: [{ test: /\.txt$/, use: 'raw-loader' }],
        },
        plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    };
    ```
    >html-webpack-plugin은 생성된 모든 번들을 자동으로 삽입하여 애플리케이션용 HTML 파일을 생성합니다.
- Mode(모드)
  - mode 파라미터를 development, production 또는 none으로 설정하면 webpack에 내장된 환경별 최적화를 활성화 할 수 있습니다. 기본값은 production 입니다.
    ```json
    module.exports = {
        mode: 'production',
    };
    ```
- Browser Compatibility(브라우저 호환성)
  - Webpack은 ES5가 호환되는 모든 브라우저를 지원합니다(IE8 이하는 지원되지 않습니다). Webpack은 import() 및 require.ensure()을 위한 Promise를 요구합니다.
------