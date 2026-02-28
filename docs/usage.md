# 四、使用指南

## **（一）常用本地路径**

**1.xiaoya配置目录**

xiaoya alist必备基础目录，目录中包含子文件夹“data”，目录中很多txt，目录中txt的变动需要重启xiaoya才能生效

查看小雅配置文件目录路径的命令：

```jsx
docker inspect xiaoya | grep "/data" |head -n1
```

**2.媒体库目录**

xiaoya emby必备路径，安装xiaoya emby时候已在脚本2-4中设置，目录中包含“config”、“temp”、“xiaoya”三个子文件夹，其中，“config”是emby配置文件夹，“temp”是元数据包存放文件夹，里面除了config.mp4，其余的均可删除，“xiaoya”是元数据文件夹。

查看小雅媒体库目录路径的命令：

```jsx
cat  /etc/DDSRem/xiaoya_alist_media_dir.txt
```

**3.常用命令**

①显示每个容器的使用情况：

```jsx
docker stats
```

②重启名为xiaoya容器：

```jsx
docker restart xiaoya
```

③持续查看名为xiaoya容器的日志：

```jsx
docker logs -f xiaoya
```

④查看emby日志（包括入库、播放等）：

```jsx
docker exec emby tail -f /config/logs/embyserver.txt
```

⑤查看xiaoya容器的环境变量：

```jsx
docker inspect xiaoya
```

⑥查看外网访问时间和路径（xx.xx.xx.xx替换为外网ip）：

```jsx
docker exec xiaoya cat /var/log/nginx/access.log | grep xx.xx.xx.xx
```

```jsx
docker exec xiaoya cat /opt/alist/log/alist.log | grep xx.xx.xx.xx
```

⑦查看转存的资源是什么应用发起的（abc替换为日志中资源全文件名）：

```jsx
docker exec -i xiaoya cat /var/log/nginx/access.log |grep abc
```

⑧查看所有下载mp4（可根据需要自行替换成其他）的ip记录：

```jsx
docker exec -i xiaoya cat log/alist.log |grep mp4
```

⑨查看外网请求ip的时间和状态：

```jsx
docker exec -i xiaoya grep --no-line-number '/d/' /var/log/nginx/access.log |awk '{print $1, "\t", $9, "\t", $4, $12}' |grep -E -v "172.17|127.0|192.168"|sort |uniq -c
```

第一栏统计数 第二栏ip 第三栏状态码 第四栏时间 第五栏UA

状态码是403或者401的都是没授权，签名错误的是403，是有嫌疑的连接

## **（二）xiaoya相关账号密码**

**1.xiaoya alist/tvbox账号密码（用户名不支持修改）**

【懒人版】

用户名：dav

密码：用这个↓命令查看

```jsx
docker exec -i xiaoya cat /data/guestpass.txt
```

【认真版】

注意：推荐使用配置①，即两个txt都配置，其余配置存在账号安全风险！！！（是否有配置txt，需自行查看xiaoya配置目录，每次配置后需要重启xiaoya生效）

①配置了guestlogin.txt（空文件）+guestpass.txt（填入无任何格式的明文密码）：用户名dav，密码见guestpass.txt

②仅配置guestlogin.txt（空文件）：用户名guest，密码guest_Api789

③仅配置guestpass.txt（填入无任何格式的明文密码）：用户名guest，密码见guestpass.txt

**2.xiaoya emby账号密码**

用户名：xiaoya/kid 密码：1234

上述默认账号自带播放记录，如果不喜欢，可以在emby设置里自建自己的账号

## **（三）播放器推荐**

**1.Windows PC端：**

小雅alist：5678网页调用potplayer、vlc（可播原盘）等第三方播放器

小雅emby：Hills Lite（[https://t.me/xiaoyaliu00/1119303](https://t.me/xiaoyaliu00/1119303)、 [https://apps.microsoft.com/detail/9nxnzfrllwzx?hl=en-US&gl=US](https://apps.microsoft.com/detail/9nxnzfrllwzx?hl=en-US&gl=US) ）

**2.安卓手机：**

小雅emby：爆米花（可播原盘）、afusekt（支持聚合）、vidhub （在线匹配字幕）、yamby

**3.安卓电视：**

小雅emby：爆米花（可播原盘）、vidhub（在线匹配字幕）、afusektv（收费，需搭配安卓手机使用）、yamby（免费，适配少量电视、投影）

**4.ios：**

小雅alist & emby：senplayer（可播原盘）、vidhub（在线匹配字幕，可播原盘，挂载5678后需要长按选禁用）

小雅emby：infuse（可播原盘、效果好，需要关闭媒体库模式）、爆米花（可播原盘、免费）

**5.Apple Tv：**

小雅alist & emby：senplayer（可播原盘）

小雅emby：infuse（可播原盘，效果好，需要关闭媒体库模式）、vidhub（可播原盘）、爆米花（可播原盘、免费）

各种支持webdav、emby且不刮削的app均可挂载小雅，以上仅为常用推荐！

## **（四）播放器挂载xiaoya alist**

①通讯协议选择webdav

②主机：部署xiaoya alist的设备ip

③路径：/dav

④端口：5678

⑤用户名：dav或guest，具体见上文

⑥密码：guestpass.txt的内容

注意，不要开任何刮削选项（包括但不限于预缓存图像、媒体库模式等），如果你不确定，截图发群里

## **（五）播放器挂载xiaoya tvbox**

配置http://xxxx:5678/tvbox/my_ext_jar.json到壳子里。壳子建议用ok影视

## **（六）播放器挂载xiaoya emby**

①通讯协议选择emby

②协议：http

③主机：部署xiaoya alist的设备ip

④端口：2345

⑤用户名：xiaoya或你自己设置的

⑥密码：1234或你自己设置的

## **（七）爆米花挂载xiaoya alist的strm**

**1.爆米花挂载strm优缺点**

缺点：无演员关联的电影信息。海量媒体入库慢，20万以上频繁失败，10万以内没问题

优点：无需硬件设备去支撑emby。搜索啥的比emby快

**2.使用方法**

推荐：用木木模拟器运行爆米花导入，全部导入仅需6小时，约52万strm文件（"刮削失败"除外），可一次性成功

①更新爆米花2.9.4版本或以上，添加webdav，“位置”填xiaoya服务端ip地址，“端口”填“5678”，“用户名”“密码”如不清楚见上文，“路径”填“/dav/strm”，选择“保存”

②不要勾选“刮削失败”“音乐”“测试”“短剧”“画质演示测试”

③尽可能选择一个相对小的目录（如“每日更新”）来尝试，不要全部导入！！因为strm文件非常多，导入时间很很长！！爆米花识别的准确率会低一些！！

④爆米花中播放使用

**3.常见问题**

①已更新但5678没有出现“strm”目录：

[https://t.me/xiaoyaliu00/1380918](https://t.me/xiaoyaliu00/1380918)

②其他app能用吗：

不清楚，需要自行挖掘，目前反馈vidhub可用（但挂载多了会卡死）

## **（八）软件播放xiaoya alist音乐**

详见 [https://t.me/xiaoyaliu00/760695](https://t.me/xiaoyaliu00/760695)
