**dssss**
pro ~ 错误
https://zhuanlan.zhihu.com/p/362152434

- [] dd
- [] ff

  > > > .D
  > > > Create Table of Contents

  2021.08.31
  新增插件：

- [代码风格统一插件 Prettier](https://prettier.io/)
  - 借助 Pre-commit Hook，在`git commit`时进行代码格式化
- [git commit 规范插件 commitlint](https://github.com/conventional-changelog/commitlint#shared-configuration)
  - 借助 Pre-commit Hook，在`git commit`时对 message 进行校验，目前采用[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)设置，message 格式为`value: message`，其中 value:
  ```javascript
  [
    "build",
    "chore",
    "ci",
    "docs",
    "feat",
    "fix",
    "perf",
    "refactor",
    "revert",
    "style",
    "test",
  ];
  ```
  例如 `"foo: some message" # fails`，`"fix: some message" # passes`
