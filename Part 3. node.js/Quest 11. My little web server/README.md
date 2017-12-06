# Quest 11. My little web server


## Introduction
* 이번 퀘스트에서는 간단한 웹서버를 만들어 보겠습니다.

## Topics
* GET/POST
* node.js `http` module
  * `req`와 `res` 객체

## Resources
* [HTTP Node.js v5.3.0 Manual & Documentation](https://nodejs.org/api/http.html)
* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

## Checklist
* HTTP의 GET과 POST 메소드는 어떻게 다른가요?
  * `GET` requests data from a specified resource
  * `POST` submits data to be processed to a specified resource
  * 다른 HTTP 메소드에는 무엇이 있나요?
    * `DELETE`, `HEAD`, `OPTIONS`
* HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?
  * Compose correct header and send to host ([source](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data))
  * `GET`: Encodes query data in key=value pairs into the URL, so it is visible to everyone and saved in browser history. The length of the request is also limited by the URL length (Max 2048 characters)
  
        GET /?say=Hi&to=Mom HTTP/1.1
        Host: foo.com

  * `POST`: Submits data in the body with aplication/x-www-form-urlencoded(for shorter data) or multipart/form-data(for longer / encoded binary data). The parameters are not visible in the url so nothing saved in the browser history.

        POST / HTTP/1.1
        Host: foo.com
        Content-Type: application/x-www-form-urlencoded
        Content-Length: 13

        say=Hi&to=Mom

## Quest
* 다음의 동작을 하는 서버를 만들어 보세요.
  * 브라우저의 주소창에 `http://localhost:8080`을 치면 `Hello World!`를 응답하여 브라우저에 출력하는 서버를 만들어 보세요.
  * 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 GET 메소드로 보내면, `Hello, [문자열]`을 출력하는 서버를 만들어 보세요.
  * 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 POST 메소드로 보내면, `Hello, [문자열]`을 출력하는 서버를 만들어 보세요.
* express.JS와 같은 외부 프레임워크를 사용하지 않고 만들어 보세요.
