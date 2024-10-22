## 可以配置自动下载github/releases的脚本
- 主要用于在AutoJS中自动下载指定最新版的脚本，得益于github提供的release API来实现最新版本脚本的获取
- release API 格式`https://api.github.com/repos/${github用户名}/${github仓库名}/releases/latest`
## 在AutoJs中的使用说明
```text
“自动下载更新脚本”更新之后需要手动关闭AutoJS
否则新的dex没法覆盖加载。
具体操作以MIUI为例，上划打开后台 长按AutoJS，
设置 选择结束运行，而不仅仅是滑动关闭。
理论上Pro版已经支持覆盖加载，免费版不支持。
但是为了保险起见都进行一遍强制停止。

[“自动下载更新脚本” 更新]指的是 
updateInCurrentPathGui-Dex.js 和
glb.dex 发生了变更，主要是glb.dex发生了变更
如果不关闭AutoJS会导致更新方法没法启用从而报错


运行方式是解压后在AutoJs里面
运行 updateInCurrentPathGui-Dex.js  
默认情况下载的文件在当前目录下，
执行完毕后下拉刷新即可见到新代码

也可以手动修改第23行 
将解压路径修改为你喜欢的文件夹
let targetOutputDir = files.cwd()
比如修改为如下
let targetOutputDir = '/storage/0/脚本/你喜欢的路径'
下载完成后新代码就会到
'/storage/0/脚本/你喜欢的路径'里面

执行完毕后需要在 targetOutputDir中下拉刷新，否则看不到


本 “自动下载更新脚本” 同样适用于
所有github/releases发布的最新脚本
仅仅需要修改21行 
let apiUrl = "目标脚本更新API"
"目标脚本更新API" 需要自己去获取
格式如下：
'https://api.github.com/repos/${github用户名}/${github仓库名}/releases/latest'
当然如果没有发布releases 下载也是无效的
```
