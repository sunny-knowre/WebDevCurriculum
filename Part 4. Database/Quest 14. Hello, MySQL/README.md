# Quest 14. Hello, MySQL


## Introduction
* 이번 퀘스트에서는 DB가 무엇인지, 어떻게 사용하는 것인지 등을 알아보겠습니다.

## Topics
* RDBMS
  * MySQL
* 각종 쿼리
  * `CREATE`, `SELECT`, `UPDATE`, `DELETE`
* Hash
  * SHA256

## Resources
* [Head First PHP & MySQL](http://www.yes24.com/24/Goods/3831680?Acode=101), 한빛미디어
* [Real MySQL : 개발자와 DBA를 위한](http://www.yes24.com/24/Goods/6960931?Acode=101), 위키북스

## Checklist
* RDBMS에 길이를 알 수 없는 배열을 저장하려면 어떻게 설계해야 할까요?
  * When dealing with a variable number of attirbutes, there are two ways to store the relationships: 
    1. `TableA` has a `primary key` column and a `foreign keys` field of VARCHAR or TEXT type and a comma separated list of keys to `TableB` is stored here. This way a varaible number of rows from `TableB` can be associated with `TableA`
        * This method is a quick and easy solution, best for cases where the CSV list is being used wholesale. If there are frequent searches within the list of foreign keys or a need to sort items however, searching through text and concatenating strings might get expensive.
    2. Making a third table `TableC` as an intersection-table to store both the `TableA` & `TableB`'s primary keys allows multiple rows for the same `TableA` id with different `TableB` ids. 
        * This method allows for easier querrying using joins and edits to the variable relationships can be done with actualy SQL inserts or deletes.

* RDBMS 테이블의 정규화는 무엇인가요?
  * Normalization is a way of organizing data in a database to meet these goals:
    1. To minimize redundancy of data (all data is stored in only one place) 
    2. To support integrity constraints (no inconsistent or anomalous data, logical dependencies upheld)
    3. To represent facts about the real world in an understandable way. (related items are stored together)

  * In general relational theory describes 5 normal forms, each of which eliminate some type of redundency or anomaly. Real world database will vary between levels of normalization because it is always a tradeoff between *convenience* and *correctness*
    1. First Normal Form: Create a separate table for each set of related data, and make sure columns have atomic values. Each row must have a unique primary key so duplicate groups must be separated into tables. 
    2. Second Normal Form: Assuming the data is already in First Normal Form, if there are any remaining columns that have data that is dependent on other columns, this can be separated out into a separate table.
    3. 
* MySQL 엔진에는 어떤 것들이 있나요?
* RDBMS에서 테이블의 인덱싱은 무엇인가요? 인덱싱을 하면 어떤 점이 다르며, 어떤 식으로 동작하나요?
* DB에 사용자의 암호를 평문으로 저장하지 않고도 사용자의 암호를 인증하는 것이 가능한 이유는 무엇일까요?

## Quest
* 주어진 MySQL 서버에서 Quest 12~13의 결과물을 MySQL 기반으로 만들어 보고자 합니다.
  * 먼저 테이블이 어떻게 설계되어야 할지, 어떤 정보를 담고 있어야 할지 생각해 보세요
  * 사용자의 암호는 어떤 식으로 저장해야 할까요?
* **주의: 실제 node.js 프로그래밍을 할 필요는 없습니다. 알맞는 테이블만 생성하시면 됩니다!**
