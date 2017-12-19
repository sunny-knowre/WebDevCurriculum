# Quest 17. Playing SVG


## Introduction
* 이번 퀘스트에서는 사각형과 박스 모델 일색인 웹에서 다양한 도형을 그리는 방법을 알아보겠습니다.

## Topics
* 벡터 그래픽
  * SVG 포맷
* 키보드 이벤트
  * `onkeypress`
  * `onkeydown` / `onkeyup`
  * keyCode

## Resources
* [MDN - SVG](https://developer.mozilla.org/ko/docs/Web/SVG)

## Checklist
* SVG 포맷은 JPG, PNG 등의 포맷과 어떤 점이 다른가요?
  * `JPG`: is a lossy format generally useful for diplaying photos where compression is usually not noticed. Because it is a rasterized image file, it doesn't scale well.
  * `PNG`: also a rasterized image formage that supports transparency and is lossless. Good for situations where scaling is not important but transparency is needed.
  * `SVG`: A vector graphic that stores information using gemetric data. Good for simple 2-dimentional elements that need to scale, but things like photographs may be too complex to handle.

* SVG 포맷은 HTML 포맷과 어떤 점이 다른가요?
  * While HTML deals with text objects, SVG is an XML-based markup language used to describe graphics.
* 브라우저 상의 키보드 이벤트에서 keyCode는 어떤 역할을 하나요?
  * the `keyCode` property returns two types of codes depending on the event that triggered it:
    1. `onkeypress` event: will return the actual ASCII charactor code (ex: `w` will return `119`, `W` will return `87`)
    2. `onkeydown` or `onkeyup` events: will return a number key code for the key.

## Quest
* 간단한 스케치보드를 만들어 보려고 합니다.
  * 정해진 크기와 모양의 사각형, 삼각형, 원을 그리는 버튼이 있어야 합니다.
  * 그린 삼각형, 사각형, 원을 이동하고 삭제하는 기능이 있어야 합니다.
    * 키보드의 Arrow 키와 Delete 키를 통해 선택된 도형을 이동하고 삭제할 수 있어야 합니다.
  * 저장 기능은 굳이 구현하지 않아도 됩니다.
