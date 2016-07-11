#1、submodule
适用场景：当我们在开发某个项目的时候，需要引入另外一个项目，而且这个项目可以在多个项目中共享，并且我们希望同时分开管理这两个项目。这种时候，我们就需要了解 git submodule.
#2、子模块使用教程
首先我们需要准备两个项目A、B。A 项目作为开发项目，而 B 项目作为共同引用项目，也就是说回作为 A 项目的子模块。
### 2.1、给 A 项目添加子模块 B
命令：`git submodule add <url> [file]`
把 url 上的项目拷贝到指定的 file 路劲下。如果省略 file 路径，默认会直接拷贝到 A 项目的根目录下。
```javascript
git submodule add https://github.com/Minskyb/bolt.git src/bolt
```
git bash 执行效果:
![](https://github.com/Minskyb/huazhi/blob/master/doc/images/addsubmodule.png)

项目目录情况：
![](https://github.com/Minskyb/huazhi/blob/master/doc/images/projectfile.png)
>项目中除了子模块目录外，还会多出一个 .gitmodules 文件，此文件主要记录 A 项目中，所有子模块源地址及在此项目的对应地址。内容结构如下：

```javascript
[submodule "src/bolt"]
   path = src/bolt
   url = https://github.com/Minskyb/bolt.git
```
###2.2、拷贝带有子模块的项目
方法1：先拷贝主项目，在初始化子模块
 1. `git clone <url> [file]`：把 url 上的主目录拷贝到 file 中。
 2. `cd file` ：进入主项目根目录
 3. `git submodule init` ：初始化子模块本地配置文件
 4. `git submodule update`：拉取子模块

方法2：主项目和子模块一起拷贝，只需加入 --recursive 命令。

 1.`git clone --recursive <url> [file]`

拷贝完后，当我们首次进入子模块根目录的时候，git 显示分支为一个 commit id 。这个时候我们需要手动创建一个分支，并拉取最新代码。
![](https://github.com/Minskyb/huazhi/blob/master/doc/images/clonesubmodule.png)

###2.3、子模块的更新
如果我们没有对子模块做过任何改变，那么我们只需要进入子模块目录并执行一个简单的命令即可：`git submodule update` 类似于住项目中的 **git pull** 此命令同样也可以拆分为 `git fetch <shortname> <branch>` 和 `git merge <shortname> <branch>`

>注意：在执行 git submodule update 命令的时候，如果我们忘记添加 --rebase 或者 --merge 参数，那么本地子模块会被更新为服务器上的状态（就是说，服务器上的代码，并不是和本地的进行合并，而是类似于直接覆盖），并且本地子模块会处于一个游离的 HEAD 状态。

###2.3、子模块的提交
和住项目的提交一样：
```javascript
git status
git add
git commit
```
###2.4、子模块的推送
大致流程一样，先拉取服务器代码并合并，然后在推送
```javascript
// 进入子模块根目录
git submodule update --remote --merge  // 这步好像可以不要
git pull <shortname> <branch>
git push <shortname> <branch>
```
###2.5、主项目推送（push）时检测子模块是否已推送
命令：`git push origin master --recurse-submodules=check`
当检测到有子模块没有推送时，终止此操作。
命令：`git push origin master --recurse-submodules=on-demand`
如果设置为 on-demand 值，那么 git 会尝试帮你推送子模块，如果出现错误，则终止此操作。

