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

  * In general relational theory describes 5 normal forms, each of which eliminate some type of redundency or anomaly. Most real world database lie somewhere between level 1 ~ 3 because it is always a tradeoff between *convenience* and *correctness*
    1. First Normal Form(1NF): Create a separate table for each set of related data, and make sure columns have atomic values. Each row must be unique so duplicate groups must be separated into tables. 
                
    2. Second Normal Form(2NF): Assuming the data is already in First Normal Form, if there are any remaining non-key columns that have data that is dependent on other columns this can be separated out into a separate table. 
    
    3. Third Normal Form(3NF): Assuming the data is compliant up to 2NF, even if no columns depend on anything else, there is no guarantee that they depend explicitly on the primary key. This form requires that all columns depend on nothing *but* the key. This helps reduce redundancies and anolalies by enforcing [referential integrity](https://en.wikipedia.org/wiki/Referential_integrity).

* MySQL 엔진에는 어떤 것들이 있나요?
  * MySQL has a pluggable storage engine architecture that enables the user to select a storage engine without worrying about the low-level implementation details at the storage level. The engine can be set at table creation by including it in the `CREATE TABLE` statement:
  
       ```
        CREATE TABLE t1 (i INT) ENGINE = INNODB;
        CREATE TABLE t2 (i INT) ENGINE = CSV;
        CREATE TABLE t3 (i INT) ENGINE = MEMORY;
       ```
  * `InnoDB` is the default and most general purpose storage engine.
    * Transaction-safe ([ACID](https://en.wikipedia.org/wiki/ACID) compliant)
    * commit, rollback, and crash-recovery capabilities to protect user data
    * Row-level locking and non-locking reads to increase multi-user concurrency
    * Support for `FOREIGN KEY` to enforce referential-integrity constraints
  * `MyISAM` based on older (and no longer available) ISAM storage engine
    * has smaller footprint
    * Table-level locking limits performance in read/write intense scenarios
    * Often used with read-only workloads in web and data warehousing configurations
  * `Memory` stores all data in RAM for fast access to non-critical data.
  * `CSV` stores tables as text files that can be imported or exported easily to different applications.
    * no indexing available, so just use InnoDB and use csv for import/export only. 
  * `Archive` Compact, unindexed tables inteded for storing and retrieving large historical data.
  * `Blackhole` similar to Unix `/dev/null` device, accepts data but does not keep anything. 
  * `NDB` is a **N**etwork **D**ata**B**ase developed for distributed computing applications where uptime and availability are paramount.

* RDBMS에서 테이블의 인덱싱은 무엇인가요? 인덱싱을 하면 어떤 점이 다르며, 어떤 식으로 동작하나요?
  * An index a data structure that helps databases locate rows where a specific value occurs in a given column.
  * Using indexes, databases can find values more quickly than a brute force method.
  * Although indexes have overhead in maintaining (`INSERT`, `UPDATE`, `DELETE` requires updating index), frequent queries that benefit from the boost in lookup speed justify overhead.
  * Most databases have some sort of automatic index creation for primary keys.
  * Additional indexes to columns should be added after carefully examining columns that occur *frequently* in queries.

* DB에 사용자의 암호를 평문으로 저장하지 않고도 사용자의 암호를 인증하는 것이 가능한 이유는 무엇일까요?
  * Some *representation* of user info including the password is usually stored in a database.
  * To prevent sensitive data from being exposed even in read-only scenarios, the data should be encrypted ysing a cryptographic hash function.
  * Even with encryption, the password can be reversed if the hashing algorithm is known using pre-computed hashes.
  * Therefore, a unique salt should be added to each password making the use of pre-computed hash tables prohibitively expensive. 
    <sub><br>(mostly meaning it's prohibitively expensive for your nextdoor teenager... )</sub>
  * The server knowing the hashing algorithm and salt, can validate by generating the hash value and comparing with the stored hash value.

## Quest
* 주어진 MySQL 서버에서 Quest 12~13의 결과물을 MySQL 기반으로 만들어 보고자 합니다.
  * 먼저 테이블이 어떻게 설계되어야 할지, 어떤 정보를 담고 있어야 할지 생각해 보세요
  * 사용자의 암호는 어떤 식으로 저장해야 할까요?
  * Tables:
    * **Users**

      | Column      | type                | key type                 |
      |-------------|---------------------|--------------------------|
      | user_id     | AUTOINCREMENT (INT) | primary                  |
      | name        | VARCHAR             |                          |
      | nickname    | VARCHAR             |                          |
      | email       | VARCHAR             |                          |
      | password    | CHAR                |                          |
      | salt        | CHAR                |                          |
      | last_tab_id | VARCHAR             | foreign to `Notes` table |

    * **Notes**

      | Column  | type                | key type                 |
      |---------|---------------------|--------------------------|
      | note_id | AUTOINCREMENT (INT) | primary                  |
      | user_id | INT                 | foreign to `Users` table |
      | title   | VARCHAR             |                          |
      | body    | MEDIUMTEXT          |                          |    

* **주의: 실제 node.js 프로그래밍을 할 필요는 없습니다. 알맞는 테이블만 생성하시면 됩니다!**
