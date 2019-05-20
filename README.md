## 开发需知  


    我们的开发不是在master主分支上的，是在dev（develop）上，主分支上主要保存各版本稳定的代码，
    我们不希望把主分支弄坏，所以在dev分支上开发，每个版本的开发也可以从dev分支上打出小的功能
    （feature）分支，开发完每个feature分支后再合并到dev分支上。

#### 步骤：<br>

>  1，查看分支 `git branch`<br>
>  2，创建dev分支 `git branch dev`<br>
>  3，将dev分支提交到仓库 `git push -u origin dev`<br>
>  4，切换到dev分支 `git checkout dev`<br>
>  5，也可以从`master`分支创建完`dev`后直接切换过去 `git checkout -b dev master`<br>
>  6，在`dev`上完成相关的编码后就是正常的提交到`dev`分支上啦 `git add .`  `git commit -m""`  `git push origin dev`<br>
>  7，完成这一版开发后将`dev`上的代码合并到`master`分支上，切换到`master`分支上合并代码  `git merge --no-ff dev`<br>
>  8，（–-no–ff 会执行正常合并，同时在`master`分支上生成一个节点纪录，这也是我们希望的）<br>
>  9，确认这一版完成后，我们可以打`tag`作为标记 ` git tag v0.2`  `git push --tags`<br>

#### 简而言之：<br>
   > 1，默认在`dev`进行开发，主分支用于发布版本<br>
   > 2，每次进行发布版本`dev`和`mester` 需要  `merge`。 <br>
   > 3，发布完版本需要为版本打上`tag`。

 主分支：   `master` <br>
 开发分支： `dev` <br>
