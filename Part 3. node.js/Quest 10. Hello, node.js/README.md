# Quest 10. Hello, node.js


## Introduction
* 이번 퀘스트에서는 node.js의 기본적인 구조와 개념에 대해 알아 보겠습니다.

## Topics
* 꼭 알아야 하는 것들
  * node.js
  * npm
  * `require()` 함수
  * module.exports

## Resources
* [Node.js 노드제이에스 프로그래밍](http://www.yes24.com/24/Goods/6271069?Acode=101), 에이콘출판사
* [모던 웹을 위한 Node.js 프로그래밍](http://www.yes24.com/24/Goods/10991708?Acode=101), 한빛미디어

## Checklist
* node.js는 어떤 식으로 동작하나요?
  * `require()` 함수는 어떻게 쓰는 것인가요?
    * `var bar = require('foo')` will load foo.js file and assigns it to a variable for use. Anything exported by foo.js can be accessed through the bar variable.
    * modules might export variables or functions, even classes
    * Different sources for require:
      1. pre-packaged: `'fs'`, `'http'`, `'crypto'`, `'os'`
      2. project files: `'./file1'`,  `'./subdir/file2'`, `'../parent/lib/bar'`
      3. 3rd Party modules: installed with npm install, loads modules into `node_modules`, require without `./` like built in modules: `require('request')` 

  * `module.exports`와 `exports` 변수는 어떻게 다른가요?
    * exports just points to module.exports, so if exports is assigned something else with a `=` the link is broken. 
    * better to export by setting module.exports directly to avoid confusion.

* npm이 무엇인가요?
  * npm 패키지를 `-g` 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?
    * some modules provide command line utilities (ex: mocha, express, etc..), since these utilities are used outside of the project scope they need to be installed with the global flag `-g`
    * `npx` no need to install with -g 

## Quest
* node.js를 PC에 설치해 보세요. 버전은 5.x 버전이 적당합니다!
* 커맨드 라인에서 다음과 같은 명령을 쳤을 때 위 파일들의 내용이 나타나도록 해 보세요.
  * `$ node app.js 1`
    ```
    {
        name: 'Config1',
        var1: 'aaa',
        var2: [1, 2, 3, 4]
    }
    ```

  * `$ node app.js 2`
      ```
      {
          name: 'Config2',
          var1: 'bbb',
          var2: [2, 3, 4, 5]
      }
      ```
* 단, 주어진 스켈레톤 코드에서 app.js는 변경할 수 없습니다.
