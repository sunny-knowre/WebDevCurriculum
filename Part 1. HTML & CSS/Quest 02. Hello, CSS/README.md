# Quest 02. Hello, CSS


## Introduction
* CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃 작성법을 알아볼 예정입니다.

## Topics
* CSS 기초 문법
* CSS를 HTML에 적용하는 세 가지 방법
  * Inline Style
  * `<style>`
  * `<link rel="stylesheet" href="...">`
* 레이아웃을 위해 몇 가지 중요한 속성들
  * `position`
  * `left`/`top`
  * `display`
  * `width`/`height`
  * `display: flex;`
  * CSS Box Model
* 브라우저별 Developer tools

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [모던 웹 디자인을 위한 HTML5+CSS3 입문](http://www.yes24.com/24/Goods/15683538?Acode=101), 한빛미디어
* [웹 디자인 2.0 고급 CSS](http://www.yes24.com/24/Goods/2808075?Acode=101), 에이콘출판사
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Checklist
* CSS를 HTML에 적용하는 세 가지 방법의 장단점은 무엇인가요?
   1. Inline: adding `style="css:prop"` inside a single element.
      * Advantage: useful for quick fixes, useful in contexts where loading of external css files is not allowed.
      * Disadvantage: Not reusable across pages, takes up space, makes HTML look messy, have to fix everywhere if repeated in multiple elements.

   2. Embedded css: adding `<style></style>` inside an HTML document
      * Advantage: also useful for quick fixes, and easier to move later to a seperate document. Don't have to look between files while developing
      * Disadvantage: Can't reuse across pages, gets loaded every time page loads

   3. External css: moving all css to a separate file and liking from HTML page.
      * Advantage: Easy to maintain, can use across multiple pages, only load once for multiple pages
      * Disadvantage: sometimes external files get removed? not many downsides...

* 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?
   * [Cascade and Inheritance](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance) determine which rule "wins" in this scenario.
   * These 3 factors, listed in order of importance, determine which selectors cascade to apply to an element: 
      1. Importance: `!important` syntax will always win over others
      2. Specificity: or how many elements the rule can match. 
         * element selectors < class selectors < ID selector
         * ex: `#outer div ul li a` is less specific than `#outer div ul .nav a` so the second rule would apply.
      3. Source order: if competing selectors have same importance _and_ specificity, later rules will win over earlier ones. 
   * Chilren will naturally inherit parent properties such as `color`, `font-family` (usually common sense). Things like `border`, `margin` and `padding` are not inherited.
   * You can control inheritance explicitly by using special property values:
      * `inherit`: always inherit from parent element
      * `initial`: sets value to browser default, inherits if no browser default present
      * `unset`: resets to default browser behavior, sets it to inherit if it was naturally inheriting, initial if not.

* 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?
   * an element with absolute positioning will be adjusted according to the top, left, bottom, right values relative to the closest containing element.
   * The containing element is the closest parent element a position value that is not "static". If no such element is found, the <html> element will be used.
   * absolutely positioned elements do not affect other elements and are removed from the flow of the page.

* 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?
   * give elements a float value and set the width of the variable box.
   * use a flexbox container and set the flex-grow property for the variable box

* `float` 속성은 왜 좋지 않을까요?
   * floats have difficulty with containment where the parent element might suddenly have a height of 0
   * difficult to deal with columns that need to have equal background but have different amount of content
   * fixes are awkward (clearfix, overflow:auto), and need extra work to work on some IE versions.
   * content centering is more difficult than it should be
   * Source-code order dependence - The layout is HTML source dependent, diffucult to adapt for different media types.

* Flexbox(Flexible box)를 사용할 때의 한계점은 무엇인가요?
   * Flexbox is great for managing content in one dimention, but difficult to use for times when element need to line up in 2 dimentions (row, column)

## Quest
* 아래의 그림들은 모두 전체적으로 창의 크기에 꽉 차야 하며, 창의 크기가 일정 크기 이상일 경우 전체 창 크기가 어떻게 바뀌되더라도 그림에 맞게 각 박스의 크기가 조절되어야 합니다.
* **주의사항**
  * HTML 파일은 수정하면 안됩니다.
  * `float` 속성과 `calc()`함수를 사용하지 않고 해 보세요!
* [이 그림](layout1.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout1.html` 파일에 링크된 `skeletons/layout1.css` 파일을 수정하면 됩니다.
* [이 그림](layout2.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout2.html` 파일에 링크된 `skeletons/layout2.css` 파일을 수정하면 됩니다.
* [이 그림](layout3.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout3.html` 파일에 링크된 `skeletons/layout3.css` 파일을 수정하면 됩니다.
* 위와 같은 그림을 flexbox를 써서 구현해 보세요. `skeletons/layout4.html` 파일에 링크된 `skeletons/layout4.css` 파일을 수정하면 됩니다.
