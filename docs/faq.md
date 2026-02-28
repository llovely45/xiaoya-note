# 六、常见问题

## **（一）启动问题**

**1.xiaoya启动后，页面只有failed get storage: please add a storage first，或者只有版本号的：**

都是因为没有下载到数据导致，目前数据下载地址已经更换到github，需要翻墙才能下载，不会翻墙自行解决，确保xiaoya已经升级到最新版本（必须是原版xiaoya，非原版的有任何问题都不管），并翻墙后运行以下命令即可

```jsx
docker exec xiaoya rm -rf /www/data/version.txt  && docker restart xiaoya && docker logs -f -n 100 xiaoya
```

不要说什么已经翻墙之类的话，只要下载不到github数据，或日志出现 “curl: (7) Failed to connect to raw.githubusercontent.com port 443 after 30 ms: Could not connect to server” 或 “Parse error near line 1: no such table: x_storages” 就是百分百没翻墙或翻墙设置有问题，自行处理解决

PS:如果你安装的是飞牛NAS里面的小雅alist套件，请自行卸载该套件，该套件不可用

**2.访问alipan-tv-token.pages.dev出错：**

安装自建tvtoken容器（脚本5-5），如已安装过则卸载重装，并执行以下命令（以下是一整条命令，别分割为多段命令）

```jsx
docker exec xiaoya sh -c "echo 'http://172.17.0.1:34278/oauth/alipan/token' > /data/open_tv_token_url.txt"
```

最后需要重启xiaoya

**3.TV容器访问报错：**

详见 [https://t.me/xiaoyaliu00/1231846](https://t.me/xiaoyaliu00/1231846)

[https://t.me/xiaoyaliu00/1231849](https://t.me/xiaoyaliu00/1231849)

**4.2345端口显示500、502：**

①用[https://t.me/xiaoyaliu00/1330129](https://t.me/xiaoyaliu00/1330129)替换你xiaoya配置目录里的同名文件，然后重启xiaoya、emby。

②如果还是不行就把这个txt中的ip字段（也就是前后的都别动）改成局域网ip，然后重启xiaoya、emby。

③如果如果仍然不行，ssh并获取root权限后，使用 netstat -ltnp 命令，查看2345、6908等端口是否有被监听

④若6908没监听：emby安装有问题，脚本2-2-7重新解压config.mp4，然后删除docker中的emby，脚本2-3单独重装emby（需先配置好2-4）。若6908有监听：用https://t.me/xiaoyaliu00/1330145（容器外操作）图中命令curl三次，如果均无返回，你的防火墙有问题。openwrt类的软路由系统的防火墙是针对接口的，有些默认配置是会拦截docker网络接口，自行操作放行2345、2346、2347、5678、6908。

拓展知识：

根本性原理就是xiaoya容器用哪个ip能访问到emby容器，emby_server.txt就用哪个ip就行。用curl测一下就知道，操作如下：

[https://t.me/xiaoyaliu00/1330145](https://t.me/xiaoyaliu00/1330145) （容器外操作）

[https://t.me/xiaoyaliu00/1330139](https://t.me/xiaoyaliu00/1330139) （容器内操作）

以上例子是host模式的xiaoya，所以三种curl均有效。如果是bridge模式的xiaoya，第一种就不会有效，下面的才会有效。

**5.脚本镜像拉取不了、token获取验证失败、启动不成功：**

！！！确保你部署xiaoya的设备/服务端翻墙正确！！！

xiaoya项目的网络最佳设置是把翻墙24小时开启，并且模式设置为绕过大陆模式，也就是大陆IP和站点全部走直连，大陆以外的全部走代理，代理别用fake ip，别用ipv6，在这个基础上再添加规则，爬虫站点全部走直连:

https://emby.8.net.co/

https://emby.raydoom.tk/

https://embyxiaoya.laogl.top/

https://emby-data.poxi1221.eu.org/

https://emby-data.bdbd.fun/

https://emby-data.ymschh.top/

https://emby-data.r2s.site

https://emby-data.neversay.eu.org

https://emby-data.800686.xyz

https://emby-data.xn--yetq23gxma.org

https://emby-data.younv.at

https://emby.kaiserver.uk

https://emby-data.ermaokj.cn

https://emby-data.wwwh.eu.org

https://emby-data.f1rst.top

https://emby-data.wx1.us.kg

https://emby-data.xnn.ee

[https://emby-data.800686.xyz](https://emby-data.800686.xyz/)

![image.png](image-7.png)

翻墙是否成功可通过脚本6-6进行验证，调好的状态如图，只要docker.io走了代理ipv4且使用的ip没有达到限制次数，就没问题，不接受其他任何解释和反驳。

附：

检查能否拉取镜像 --> [https://t.me/xiaoyaliu00/1338183](https://t.me/xiaoyaliu00/1338183)

检查xiaoya是否在翻墙环境 --> [https://t.me/xiaoyaliu00/1170514](https://t.me/xiaoyaliu00/1170514)

**6.xiaoya alist启动时有效地址有问题：**

把[https://t.me/xiaoyaliu00/1363655](https://t.me/xiaoyaliu00/1363655)里的txt文件放到你的xiaoya配置目录，执行以下命令：

```jsx
docker exec xiaoya rm -rf /www/data/version.txt  && docker restart xiaoya && docker logs -f -n 100 xiaoya
```

**7.提示“refresh_token is not valid…”：**

脚本1-4，重新配置阿里的两个token。如用了tvtoken，另外脚本5-5，卸载tv容器后，脚本首页输入fuckaliyun重新配置tvtoken

## **（二）账号问题**

**1.提示client_id错误：**

alist和openlist的第三方授权，跟xiaoya没关系，xiaoya这边用xiaoya的第三方授权，token不通用

凡提示client_id错误的，都是用了别的第三方授权接口的token，token与授权不对应就会提示client_id错误

请正确翻墙，然后运行脚本后先选1再选4，“账号管理”界面扫码获取对应token

**2.提示“请重新登录”：**

整合安装脚本1-4，重新配置1，全部用默认，配置完后重启xiaoya生效

## **（三）播放问题**

**1.windows电脑如何调用VLC播放：**

VLC全默认设置安装好后，运行[https://t.me/xiaoyaliu00/821727](https://t.me/xiaoyaliu00/821727)中的reg即可

**2.内网emby app播放显示无兼容的流：**

不要用网页直接播放，也不要用emby app，换其他app播放

**3.emby控制台的活动日志不更新：**

数据库和emby版本不兼容导致，执行以下命令删除活动数据库并重启emby即可恢复

```jsx
docker exec emby sh -c "rm /config/data/activitylog*" && docker restart emby
```

数据库和emby版本不兼容导致，执行以下命令删除活动数据库并重启emby即可恢复

**4.alist网页播放出现了“Bad Request：xxx”，日志里出现了 fild id失败：**

①看看自己网盘是不是满了，满了就删，无需重启

②替换folder id，记得是“资源库”里的目录（如果你 folder_type.txt 选了b，那么要选对应“备份盘”里的目录）

③替换 mytoken.txt 里的token（最好长短2个都换掉），重启

④一键升级

⑤如果上述都做了还是出现这个现象，那么说明你的账号有问题了，被限制或者被封

无需知道原因，按照次序试，这4招基本包好，2，3，4可以合并一起操作，这样无需重启3次了

**5.emby播放出现404：**

你可以自己排查一下，方法如下：

①2345网页点开你这个片子这一集详情页拉到最下面

②找到strm内部路径

③去5678网页找上述路径

如果能打开目录，但没视频文件，被和谐了，截图5678路径发群里

如果能打开目录，但视频文件名称跟strm里对不上，去本地媒体库对应路径找到strm文件，然后去emby.xiaoya.pro找到同名strm比对内部路径。如果跟云服务器上的一样，单独扫描片子所在媒体库，如果跟云服务器上不一样，检查你的爬虫，确保爬下来正确的strm

如果打不开目录，那可能你的小雅配置有问题，截图5678路径发群里

**6.ali2115没有转存成功：**

按照下面逐一排查：

①没有115会员

②你的115网盘满了，那也无法转存

③115不存在对应的资源所以无法秒存，但是会退回到用阿里直链（试试播放元数据，能否获取115链接）

④cookie失效（整合安装脚本1-5重新配置）

⑤dir_id错误，转存目录不存在自然也无法秒存（整合安装脚本1-7重新配置，都用默认）

**7.播放出现黑天鹅片段：**

详见 [https://t.me/xiaoyaliu00/751619](https://t.me/xiaoyaliu00/751619)

**8.xiaoya alist播放115失败：**

按照下面逐一排查

①是否有会员，没会员放弃播放

②调用第三方播放器

③查看日志，是否提示“请重新登录”

④如日志有获取到115链接，尝试网页下载视频

⑤如网页无法下载，尝试115客户端下载

⑥如115客户端也无法下载，你的115被封了，停止违规操作，联系115客服

**9.xiaoya alist/emby网页播放失败或没有声音：**

不要用网页播放，调用第三方播放器，网页兼容性很差

**10.播放画面偏色（紫色、绿色等）：**

该资源为杜比资源，需要播放器、播放设备均支持杜比，哪个不支持换哪个

**11.xiaoya alist网页能播放，调用第三方播放器无法播放：**

是否没有会员？无会员网盘限速100-500k，播放器是原码的，速度不够导致播放失败，网页是转码低清的，所以没会员也能播放

## **（四）其他问题**

**1.emby自建的媒体库在首页没找到：**

emby设置，用户，访问，然后勾选你自己新建的这个媒体库

**2.emby入库不正常：**

①检查爬虫是否运行正常

②如爬虫有问题，截图爬虫日志发群里

③如爬虫正常，ssh到xiaoya设备后，执行以下命令后，观察一段时间

```jsx
docker stop emby && echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && echo fs.inotify.max_user_instances=524288 | tee -a /etc/sysctl.conf && sysctl -p && docker start emby
```

④如执行命令1-2天还是入库不正常，2345网页右上角“设置”，左边栏“计划任务”，选择“Scan media library”，设置每日扫库计划任务（最好设置在后半夜）

**3.提示没有配置emby_server.txt：**

要么你还没装emby，要么你安装emby时设置的xiaoya配置目录不正确

这文件是自动生成的，如果你没生成，那肯定是你安装的时候有毛病

**4.网盘不停地在缓存xiaoya里的文件：**

执行命令

```jsx
docker exec xiaoya tail -f /var/log/nginx/access.log
```

看日志分析

**5.想看的综艺、电视剧、电影、动漫xiaoya搜不到：**

①豆瓣评分大于6.5分，或新出无评分但确实好评如潮的，可以群里求片

②豆瓣评分低于6.5分，或无评分评价一般的，手动在xiaoya alist的“每日更新-同步更新中”寻找

**6.脚本中两个爬虫有什么区别：**

“小雅元数据定时爬虫”是实时资源，爬起来会慢一些，无直观界面，通过查看日志观看运行状态。“小雅元数据爬虫（Web 版本）”的web爬虫非实时，但会爬得快些，有web界面

**7.115清理助手安装失败：**

115清理助手需要配置了ali2115.txt才能正常安装，否则安装不成功，如果不需要ali2115.txt的话也必须先配置一下（脚本1-4-7），装完115清理助手后再删除ali2115.txt

**8.爬虫不正常，提示“/media…”：**

脚本2-2重新下载解压all.mp4。不要随意删除“本地媒体库路径/xiaoya”中的子文件夹，除非置顶告诉你需要或可以删除

**9.爬虫不正常，提示“Error Path is invalid…”：**

脚本2-5-5，选101，然后保存应用。爬虫仅需要爬取“每日更新”、“纪录片（已刮削）”，其他的目录没有更新，不要爬取，会增加服务器压力

**10.emby有无封面的重复片子：**

如果用的是xiaoya-emd，脚本2-5-7，重置爬虫数据库。这种问题属于数据库列表与现实文件不匹配，数据库里面已经删掉了，文件没删掉，导致后面都不会再去删，重置数据库之后，下一次爬虫就会重新扫描所有元数据，多余的就会删掉了

**11.已是最新版但5678没有出现“NAS”目录：**

执行命令 

```jsx
docker exec -i xiaoya cat /data/local_dir.txt 
```

确认是否存在local_dir.txt，如有显示，那么说明文件可以正常打开，参考 [https://t.me/xiaoyaliu00/1381200](https://t.me/xiaoyaliu00/1381200)或用一键脚本重建一下，因为一键脚本识别到这个文件会添加一个目录映射到容器，同时在 local_dir.txt 加一个空行，避免文本编辑的编码问题

**12.xxx.txt没有生效：**

按照下面逐一排查

①是否有重启xiaoya

②txt是否放对地方，要放在xiaoya配置目录

④txt确保是 unix格式，utf-8编码

![image.png](image-8.png)

**13.如果我布署在vps上会不会消耗我的流量：**

xiaoya alist的5678端口、xiaoya emby的2345端口均支持302重定向，直接使用，无需设置，播放端直连播放资源所在网盘，不消耗部署xiaoya设备的流量

**14.怎么开启xiaoya emby硬解：**

不要用硬解，硬解不能规避播放端的解码。如在外流量不够，请直接网上找个低清的看，如电视、盒子播放卡顿，请尝试不同的播放器，还是卡顿，请升级盒子

**15.115清理助手报“创建并获取 最近接收 文件夹ID失败 [Errno 17] {'state': False, 'error': '该目录名称已存在。', 'errno': 20004, 'errtype': 'war'}“错误：**

因115接口风控更改等原因，暂时无法修复，请严格按照以下步骤操作：
①脚本卸载115清理助手 ②删除你的115网盘里”最近接收“文件夹 ③脚本安装115清理助手

**16.115清理助手报“ERROR - 获取 最近接收 文件夹文件列表失败：code=405”错误：**

尝试脚本卸载115清理助手（选删除配置），脚本重新安装115清理助手。如果还是不行，请耐心等待大佬修复
