# 五、进阶指南

## **（一）xiaoya alist相关**

**1.webdav挂载其他网盘到xiaoya alist：**

详见[https://t.me/xiaoyaliu00/895158](https://t.me/xiaoyaliu00/895158)

**2.xiaoya挂载本地硬盘文件目录**

xiaoya配置目录新建local_dir.txt，就能在“ip:5678/NAS” 目录访问，你可以把本地的视频，音频，甚至其它文件加载到xiaoya，目前暂时仅能挂载1个本地目录

**3.公网安全措施：**

①配置域名，配合下文“公网访问限制”

②如果路由器做端口转发，配置一个30000以上的端口，比如 30283->5678

③配置xiaoya的webdav域名，也就是编辑 guestpass.txt

④定期重启光猫，变更ip详见

**4.外网安全检查：**

详见[https://t.me/xiaoyaliu00/918606](https://t.me/xiaoyaliu00/918606)

**5.公网访问限制：**

详见[https://t.me/xiaoyaliu00/974894](https://t.me/xiaoyaliu00/974894)

**6.签名机制：**

详见[https://t.me/xiaoyaliu00/1091310](https://t.me/xiaoyaliu00/1091310)

**7.查看115网盘目录ID的方法：**

![image.png](image-2.png)

![image.png](image-3.png)

**8.xiaoya alist中添加“我的115”：**

xiaoya配置目录下，配置115_list.txt（具体内容见下），重启xiaoya生效

①如挂根目录，则群文件找一个，txt内容是 “115 0”

②如挂具体内幕，准确的格式是：

挂载名称 [空格] 目录id [空格] 目录密码 [回车]

没有密码就不用填密码，格式里面注明的空格和回车都要补上，例如：

挂载名称 [空格] 目录id [空格] [回车]

**9.xiaoya alist中添加“我的阿里云盘”：**

xiaoya配置目录下，配置show_my_ali.txt（直接群文件找现成的），重启xiaoya生效

**10.xiaoya alist中添加“我的阿里分享”：**

xiaoya配置目录下，配置alishare_list.txt（群文件有模板），准确的格式是：

挂载名称 [空格] 阿里分享ID [空格] 文件folder id [空格] 目录密码 [回车]

没有密码就不用填密码，格式里面注明的空格和回车都要补上，挂载名不能有空格

![image.png](image-4.png)

**11.xiaoya alist中添加“我的115分享”：**

xiaoya配置目录下，配置115share_list.txt（群文件有模板），准确的格式是：

挂载名称 [空格] 115分享ID [空格] 分享目录id提取码 [空格] 目录密码 [回车]

没有密码就不用填密码，格式里面注明的空格和回车都要补上，挂载名不能有空格

**12.设置xiaoya.host映射**

①软路由上设置：也就是全屋通用，比如默认网关和dns都在n1上，然后在n1的/etc/hosts 里配置 xiaoya.host （格式见图）

![image.png](image-5.png)

n1的IP是 192.168.2.8

xiaoya 所在的硬件 IP是 192.168.2.81

每个人的网络环境不一样，配置方法也不一样，如果你的软路由无法修改 /etc/hosts，那么可以用其它dns软件比如smartdns来实现类似的结果

②播放设备上设置：如果实在不会配置路由器上的解析，那么退而求其次，配置播放设备上的解析（只对单台设备起作用，比较麻烦，手机要配置，PC要配置，电视盒子要配置）

安卓手机：[https://github.com/x-falcon/Virtual-Hosts](https://github.com/x-falcon/Virtual-Hosts)

苹果 mac，ios应该也有类似的工具

③windows设置：编辑C:\Windows\System32\drivers\etc\hosts,添加xiaoya.host 及对应ip

**13.设置xiaoya alist定时重启：**

装好xiaoyakeeper（xiaoyahelper）,xiaoya配置目录下，配置myruntime.txt（模板群文件有），myruntime.txt中定义的时间点会做三件事：一是重启小雅；二是如果小雅有更新就更新小雅（如不想更新，则在mycmd.txt用“#”注释update_xiaoya那一行）；三是做一次清理。如果没有myruntime.txt这个文件，则默认xiaoyakeeper的启动/重启时干这三件事

**14.alist套娃xiaoya alist：**

通过v3驱动方式套娃，把令牌填到 Authorization（令牌见xiaoya配置目录中alist_auth_token.txt），Server填部署xiaoya的设备内网ip，不要填账号和密码

请注意，套webdav驱动无302，套openlist驱动可以302。套娃会丧失搜索功能和阿里转码播放功能

**15.xiaoya alist套娃alist：**

xiaoya配置目录下，配置alist_list.txt（群文件有模板），可以挂载挂载一个或多个 Alist 套娃，txt内容最下面需要留一个空行，重启xiaoya生效

**16.建立自己的索引：**

①把alist挂到本地硬盘，可以用rclone和davfs2 来实现，小雅是用轻量级的dafs2，配置非常简单，安装davfs2后，执行以下命令

```jsx
mkdir /mnt/xiaoya
```

```jsx
mount.davfs http://xxx:5678/dav  /mnt/xiaoya
```

然后输入用户名、密码，然后执行命令

```jsx
cd /mnt/xiaoya
```

```jsx
find ./元数据
```

就是拉了个“/元数据”目录的清单，其他目录以此类推

②xiaoya配置目录下，新建myindex.txt，把上面生成的索引黏贴进去，最后留一个空行，保存，重启xiaoya生效

## **（二）xiaoya emby相关**

**1.ConverArt插件（emby 115、iso媒体封面标识）：**

详见 [https://t.me/xiaoyaliu00/1220110](https://t.me/xiaoyaliu00/1220110)

**2.将xiaoya alist中的资源添加到emby：**

详见 [https://xiaoyaliu.notion.site/d353c9ceb15444d7b8e21ce6097ed739?v=145044ac8252470a9feef094ff1db520](https://www.notion.so/d353c9ceb15444d7b8e21ce6097ed739?pvs=21)

因115风控收紧，自己拉strm的，把一个大目录拆分成一堆小的子目录，分批执行，中间加插停顿，具体参考[https://t.me/xiaoyaliu00/1361900](https://t.me/xiaoyaliu00/1361900)

**3.安装神医助手（首字母搜索）**

①[https://t.me/xiaoyaliu00/1259686](https://t.me/xiaoyaliu00/1259686)下载后，放入“本地媒体库目录/config/plugins”文件夹中

②重启emby

③如提示“魔改失败”，[https://github.com/sjtuross/StrmAssistant.Releases/blob/main/plugins/MovieDb_10.8.6.0.zip](https://github.com/sjtuross/StrmAssistant.Releases/blob/main/plugins/MovieDb_10.8.6.0.zip)下载解压 MovieDb10.8.6替换同名dll，重启emby

④“中文搜索增强-搜索范围”取消“合集”勾选

![image.png](image-6.png)

注意：不要动任何神医的设置！除非你知道你在做什么！

**4.设置每日定时扫库：**

浏览器打开ip:2345，右上角“设置”，左边栏“计划任务”，点击“Scan media library”，点击“添加触发器”，建议扫库时间设置在后半夜
