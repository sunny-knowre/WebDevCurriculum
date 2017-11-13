# Quest 06. JavaScript OOP - Design


## Introduction
* 이번 퀘스트에서는 자바스크립트의 객체지향 프로그래밍에 대해 알아볼 예정입니다.

## Topics
* Prototype
  * `Foo.prototype = ...`
* 생성자
  * 멤버 함수
  * 멤버 변수
* 상속

## Resources
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?
  * In _prototype-based inheritance_, each object has a prototype object, which acts as a template object that it inherits methods and properties from. An object's prototype object may also have a prototype object, which it inherits methods and properties from, and so on. This is often referred to as a **prototype chain,** 
  * 클래스 기반의 객체지향 프로그래밍과 어떤 점이 다를까요?
    * In classic OOP classes act like blueprints and instances of the object get copies of the defined properties and objects. In prototype-based inheriance, properties and methods defined in the template, prototype object are not copied over but merely linked. This gives the appearance that objects may have properties that are actually found by walking up the chain of prototypes. 
* 객체의 프로토타입 함수는 무엇일까요?
  * An object can have it's own `prototype` property and a `[[prototype]]` pointer to its parent prototype object
    * `Object.prototype` refers to the prototype property
    * `[[prototype]]` is diffucult to read or change after object creation so you have to use `Object.getPropertyOf(o)` to follow the `[[prototype]]` link to find `o`'s prototype object
    * Many modern browsers support `__proto__` method to get and set the `[[prototype]]` attribute, but this is discouraged and using `Object.getPropoertyOf()` and `Object.create()` is recommended
* JavaScript에서 `private`한 멤버 변수를 구현하려면 어떤 식으로 해야 할까요?
  * use closures to make a declare a private variable inside a function or constructor:
    ``` 
    // Container has a public `member` variable and a private `secret` variable.
    function Container(param) {
      this.member = param;
      var secret = 3;
    }

    var a = new Container("foo");
    a.member;     // "foo"
    a.secret;     // undefined 
    ```
* 자바스크립트에서 클래스간에 상속을 하려면 어떤 식으로 구현해야 할까요?
  * Many ways to create inheritance using the prototype model:
    1. using `Object.create()`
        ```
        var p = {
          a: 1,
            m: function() {
            return this.a+1;
            }
          }; 
        var c = Object.create(p);
        // c inherits from p 
        c.a;    // 1
        c.m();  // 2
        c.hasOwnProperty("a");  // false
        c.myFunction = function(){};  // subclass's own function
        
        ```
    2. using constructors
        ```
        function Person(firstName, lastName) {
          this.firstName = firstName;
          this.lastName = lastName;
        } 
        Person.prototype.getFullName = function() {
          return this.firstName + " " + this.lastName;
        }

        function Teacher(firstName, lastName, school) {
          Person.call(this,firstName, lastName);
          this.school = school;
        }
        Teacher.prototype = Object.create(Person.prototype);
        var teacher = new Teacher("Sunny","Chung","Knowre");
        
        teacher.getFullName();  // outputs "Sunny Chung"
        ```    
    3. Using `class` keyword (introduced in ES2015)
        ```
        class Person {
          constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
          }
          
          getFullName() {
            return this.firstName + " " + this.lastName;
          }
        }

        class Teacher extends Person {
          constructor(firstName, lastName, school) {
            super(firstName, lastName);
            this.school = school;
          }
        }
        
        var teacher = new Teacher("Sunny","Chung","Knowre");

        teacher.getFullName();  // outputs "Sunny Chung"
        ```  

## Quest
* Quest 06 ~ Quest 07 을 통해, 웹 상에서 동작하는 간단한 바탕화면 시스템을 만들 예정입니다.
* 요구사항은 다음과 같습니다:
  * 아이콘은 폴더와 일반 아이콘, 두 가지의 종류가 있습니다.
  * 아이콘들을 드래그를 통해 움직일 수 있어야 합니다.
  * 폴더 아이콘은 더블클릭하면 해당 폴더가 창으로 열리며, 열린 폴더의 창 역시 드래그를 통해 움직일 수 있어야 합니다.
  * 처음에는 세 개의 아이콘이 있으며, 그 중 두 개는 폴더입니다.
* 이번 퀘스트에서는 바탕화면 시스템을 만들기 위한 준비작업을 할 예정입니다.
  * 어떤 클래스들이 필요할지 생각해 보세요.
  * 각 클래스들의 멤버변수와 멤버함수는 어떤 것이 있을지 설계해 보세요.
  * 각 클래스들의 생성자에는 무엇이 들어가야 할지 설계해 보세요.
  * <u>**실제 동작하는 함수를 짤 필요는 없습니다**</u>. 빈 함수로 정의만 해 보세요!
