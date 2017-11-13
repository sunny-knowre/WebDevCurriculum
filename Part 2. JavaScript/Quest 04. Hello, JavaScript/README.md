# Quest 04. Hello, JavaScript


## Introduction
* 이번 퀘스트에서는 자바스크립트의 기본적인 문법에 대해 알아볼 예정입니다.

## Topics
* 기본적인 자바스크립트 문법
  * 원시 데이터 타입과 연산자
  * `var`
  * `if`
  * `for`
  * `function`

## Resources
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 웹 브라우저의 자바스크립트 콘솔은 어떻게 사용할까요?
  * 웹 브라우저(Chrome)에서 자바스크립트 콘솔을 띄우는 단축키는 무엇인가요?
   * cmd+opt+J on mac  / ctrl+shift+ J (Windows and Linux) the browser console is useful because it displays errors and warnings that occur on the page and it can also be used to execute arbitrary javascript commands on the page
* `var`를 이용하여 변수를 선언하는 것은 그렇게 하지 않는 것과 어떤 면에서 다를까요?
   * There are three main differences between variables declared with var and undeclared ones:
      1. using `var` declaration confineds it to the current context (inside function = function / outside function = global). **Undeclared** variables are always global
      2. `var` declarations (and all declarations for that matter) are processed before any code is executed. **Undeclared** variables do not exist until the code assigning them is executed.
         * this can lead to something called [var hoisting](https://www.w3schools.com/js/js_hoisting.asp) so it is recommended to declare at the top of code
      3. declared **var** variables are a _"non-configurable"_ property of their execution context (function or global). **Undeclared** variables are configurable (e.g. can be deleted).
   * because of these differences it is recommended to always declare variables 
* 자바스크립트의 익명 함수는 무엇인가요?
   * Anonymous functions are simply functions that don't have any names. They are often used in javascript to either:
      1. organize code and reduce clutter
      2. manage scope
      3. use in closures or recursive sections.

## Quest
* 초보 프로그래머의 영원한 친구, 별찍기 프로그램입니다.
  * [이 그림](jsStars.png)과 같이, 입력한 숫자만큼 삼각형 모양으로 콘솔에 별을 그리는 퀘스트 입니다.
    * 줄 수를 입력받고 그 줄 수만큼 별을 그리면 됩니다. 위의 그림은 5를 입력받았을 때의 결과입니다.
  * `if`와 `for`와 `function`을 모두 써서 프로그래밍 하면 더 좋은 코드가 나올 수 있을 것 같습니다.
  * 입력은 `prompt()` 함수를 통해 받을 수 있습니다.
  * 출력은 `console.log()` 함수를 통해 할 수 있습니다.
* 워밍업을 위한 퀘스트이므로 Skeleton code는 없습니다!
