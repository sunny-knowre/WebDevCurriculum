# Quest 00. Hello, git


## Introduction
* git은 2016년 현재 개발 생태계에서 가장 각광받고 있는 버전 관리 시스템입니다. 이번 퀘스트를 통해 git의 기초적인 사용법을 알아볼 예정입니다.

## Topics
* git
  * `git clone`
  * `git add`
  * `git commit`
  * `git push`
  * `git pull`
  * `git branch`
  * `git stash`
* GitHub

## Resources
* [git, 분산 버전 관리 시스템](http://www.yes24.com/24/goods/3676100?scode=032&OzSrank=1), 인사이트
* [GitHub 사용 설명서](http://www.yes24.com/24/Goods/17638082?Acode=101), 교학사
* https://try.github.io
* http://pcottle.github.io/learnGitBranching

## Checklist
* 버전 관리 시스템은 왜 필요한가요?

To quote [atlassian tutorials](https://www.atlassian.com/git/tutorials/what-is-version-control):

> Version control systems are a category of software tools that help a software team manage changes to source code over time. 
> Version control software keeps track of every modification to the code in a special kind of database. 
> If a mistake is made, developers can turn back the clock and compare earlier versions of the code to help fix the mistake while minimizing disruption to all team members.

* git 외의 버전관리 시스템에는 무엇이 있나요? git은 그 시스템과 어떤 점이 다르며, 어떤 장점을 가지고 있나요?
   * Two main types of version control systems include
      1. Centralized Version Control
         * All information and changes must be sent and received from a _central server_
         * Advantages: easy to understand, more control over users and access, and more GUI and IDE clients.
         * Disadvantages: command requires a connection to the server, branching and merging tools are difficult to use, and backups are sometimes difficult.
         * Most popular examples include: Subversion, SVN
      2. Distributed Version Control
         * Each user has their own copy of the entire repository including history.
         * Advantages: Powerful and detailed change tracking, all actions except sharing done offline, must faster.
         * Disadvantages: Distributed model is harder to understand, newer tech so not as many GUI clients, easier to make mistakes until model is completely understood
         * Most popular examples include: Git, Mercurial, Bazaar

* git의 `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
   * `clone`: clones a repository into new local directory
   * `add`: adds file contents to the index (meaning the file is being tracked now)
   * `commit`: records changes to the repository, useful flags: `-a` automatically stages files that have been modified or deleted, `-m <msg>` adds message to the commit
   * `push`: updates remote references using local ones, while sending necessary objects to complete the task. `-u` "set upstream" option is often used so future push and pull commands can be run argument-less
   * `pull`: Incorporates changes from a remote repository into current branch, actually a shorthand command for `git fetch` followed by `git merge FETCH_HEAD`
   * `branch`: will list existing branches with current branch highlighted with an asterisk. Option `-r` shows remote-tracing branches, `-d` deletes a branch
   * `stash`: will record current state of the working directory and index, but revert the directory back to HEAD. Can see current stashes with `git stash list` and get back previously stashed changed with `git stash apply` (merge might be necessary)

## Quest
* github에 가입한 뒤, [이 커리큘럼의 github 저장소](https://github.com/KnowRe/WebDevCurriculum)의 우상단의 Fork 버튼을 눌러 자신의 저장소에 복사해 둡니다.
* [GitHub Desktop](https://desktop.github.com/)을 다운받아 설치합니다.
* Windows의 경우 같이 설치된 git shell을, MacOSX의 경우 터미널을 실행시켜 커맨드라인에 들어간 뒤, 명령어를 이용하여 복사한 저장소를 clone합니다.
  * 앞으로의 git 작업은 되도록 커맨드라인을 통해 하는 것을 권장합니다.
* 이 문서가 있는 폴더 바로 밑에 있는 sandbox 폴더에 파일을 추가한 후 커밋해 보기도 하고, 파일을 삭제해 보기도 하고, 수정해 보기도 하면서 각각의 단계에서 커밋했을 때 어떤 것들이 저장되는지를 확인합니다.
* `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령을 충분히 익혔다고 생각되면, 자신의 저장소에 이력을 push합니다.
