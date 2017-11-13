# Quest 05. Playing with DOM


## Introduction
* 이번 퀘스트에서는 자바스크립트를 통해 브라우저의 실제 DOM 노드를 조작하는 법에 대하여 알아볼 예정입니다.

## Topics
* DOM API
  * `document` 객체
  * `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()` 함수들
  * 기타 DOM 조작을 위한 함수와 속성들
* Closure

## Resources
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  * `element.classList`, supported since IE10 has methods:
    * `add(string)`
    * `remove(string)`
    * `toggle(string)`
    * `replace(oldClass, newClass)`
  * so grab add new class by using `element.classList.add("newClass")` and delete by `element.classList.remove("unwantedClass")`
  * IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
    * For IE9 and before use `element.className = "class"` (will reset classes) or `className += " newClass"` (will append to existing classes)
* 자바스크립트의 Closure는 무엇이며, 어떤 식으로 활용할 수 있나요?
  * A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain.
  * The closure has three scope chains: 
    1. access to its own scope (variables defined between its curly brackets)
    2. access to the outer function's variables
    3. access to the global variables.
## Quest
* Skeleton 디렉토리에 주어진 HTML을 조작하는 스크립트를 완성해 보세요.
  * 첫째 줄에 있는 사각형의 박스들을 클릭할 때마다 배경색이 노란색->흰색으로 바뀌어야 합니다.
  * 둘째 줄에 있는 사각형의 박스들을 클릭할 때마다 `enabled`라는 이름의 CSS Class가 클릭된 DOM 노드에 추가되거나 제거되어야 합니다.
* 구현에는 여러 가지 방법이 있으나, 다른 곳은 건드리지 않고 TODO 부분만 고치는 방향으로 하시는 것을 권장해 드립니다.
