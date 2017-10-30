# Quest 03. Publishing CSS


## Introduction
* 이번 퀘스트에서는 CSS를 이용해 실제 웹 페이지를 모사해 퍼블리싱하는 것에 도전해볼 예정입니다.

## Topics
* 퍼블리싱을 위해 몇 가지 중요한 속성들
  * `font-*`
  * `text-*`
  * `box-sizing`
  * `:hover`/`:active`

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [모던 웹 디자인을 위한 HTML5+CSS3 입문](http://www.yes24.com/24/Goods/15683538?Acode=101), 한빛미디어
* [웹 디자인 2.0 고급 CSS](http://www.yes24.com/24/Goods/2808075?Acode=101), 에이콘출판사
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Checklist
* CSS 퍼블리싱을 할 때, class와 selector들은 어떤 식으로 정리하는 것이 좋을까요?
   * Might be overkill, but following some sort of object oriented approach might be appropriate for this project.
   * main useful principles to follow:
      1. Separate structure and skin
         * allows clear structure, while also allowing reuse of skins.
      2. Separate container and content
         * avoids container specific selectors to child elements and allows more repeated use of content styles.
   * following OOCSS might lead to some HTML bloat due to multiple classes per element, but not a big issue for this project size.

## Quest
* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](github.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**
* 등장하는 아이콘은 그림파일이 아닌 GitHub에서 만든 [Octicons](https://octicons.github.com/)라는 폰트 파일입니다. 해당 폰트 파일은 폴더에 같이 있으니 링크하여 쓰시면 됩니다.
  * 특정 폰트로 임의의 유니코드 문자를 출력하려면 어떻게 해야 할까요?
