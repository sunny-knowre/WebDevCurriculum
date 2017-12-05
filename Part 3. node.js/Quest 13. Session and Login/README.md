# Quest 13. Session and Login


## Introduction
* 이번 퀘스트에서는 로그인 기능이 어떻게 구현되는지를 알아보겠습니다.

## Topics
* Cookie
* Session
* Chrome developer tools > 'Resources' tab

## Resources
* [Express Framework](http://expressjs.com/)
  * [express-session](https://github.com/expressjs/session)
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 쿠키란 무엇일까요?
  * *Cookies are small files that allow a server and browser communicating via HTTP to maintain some type of state such as a user's session info, user preferences and settings, and tracking information.*
  * 쿠키는 어떤 식으로 동작하나요?
    * The server will send the visiting client some data in the form of a cookie. If the visitor accepts, the browser stores the cookie as plain text on the visitor's drive. The next time the visitor arrives at the site, the same cookie is sent back to ther server and thus the servers knows what was stored earlier.
  * 쿠키는 어떤 식으로 서버와 클라이언트 사이에 정보를 주고받나요?
    * Cookies can be set using http headers. Servers cookies using the `Set-Cookie` HTTP header response and clients will send this cookie back in requests afterwards.
      * Some values are set in key-value pairs, ex: `Set-Cookie: Expires=<Date>`, other common attributes are:
        * `Max-Age`: Instead of a specific date, Max-Age can set an interval of seconds in the future.
        * `Domain`: domain of your site
        * `Path`: The path to the webpage that set the cookie, leave blank if retrieving cookie from any directory/page
        * `SameSite`: set to `Strict` or `Lax`, when strict only allows requests for cookies originating from the same origin as the `Domain`, mitigates some risk of [XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)    
      * Other attributes require no value but have meaning just with their presence:
        * `Secure`: only secure servers(HTTPS) may retrieve the cookie.
        * `HttpOnly`: Client-side javascript not allowed to retrieve cookies via `Document.cookie`, mitigates [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks
  

* 웹 어플리케이션의 세션이란 무엇일까요?
  * 세션의 내용은 어디에, 어떤 식으로 저장되나요?

## Quest
* Quest 12에서 수행했던 메모장에 로그인 기능을 넣고자 합니다.
  * 사용자는 딱 세 명만 존재한다고 가정하고, 아이디와 비밀번호, 사용자의 닉네임은 하드코딩해도 무방합니다.
  * 로그인했을 때 해당 사용자가 이전에 작업했던 탭들과 상태가 로딩 되어야 합니다.
