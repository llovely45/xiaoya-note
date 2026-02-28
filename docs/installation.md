# 三、安装指南

## **（一）原版xiaoya安装脚本**

[https://github.com/DDS-Derek/xiaoya-alist](https://github.com/DDS-Derek/xiaoya-alist)

SSH到计划安装xiaoya的设备后，获取root权限（sudo -i），执行上面页面中的脚本，请按以下顺序安装（要有翻墙环境），如遇问题群里截图反馈

## **（二）安装xiaoya alist（包含tvbox）**

1.安装 小雅Alist -> 1 1

注意事项：

①不清楚的选项，全用默认

②token、cookie全用脚本扫码获取，网页获取不了就选命令行扫码

③阿里的转存目录folder id，浏览器打开你的阿里云盘，在根目录新建“xiaoya”文件夹（千万不要删除该文件夹）, 进入新建的“xiaoya“文件夹，浏览器地址栏https://www.aliyundrive.com/drive/folder/640xxxxxxxxxxxxxxxxxxxca8a最后一串就是folder id

![image.png](image-1.png)

2.安装/更新 小雅助手（xiaoyahelper）-> 3 1

3.安装 115清理助手 -> 4 1 （如未配置115，跳过这步）

4.如果你有阿里云盘超级会员，脚本主界面输入“fuckaliyun”，配置TVtoken，否则直接下一步

5.安装好后浏览器打开ip:5678，播放元数据目录下视频，确保可以播放，且115、阿里云盘至少有一个会员后再安装emby（如果只有115会员，需在脚本1-4配置7，并保存重启xiaoya）

## **（三）安装xiaoya emby**

1.图形化编辑 emby_config.txt -> 2 4，其中，①选关闭。②选host模式。③ARM的选iceyheart/embycrk，X86的选amilys/embyserver。④选第三个（4.9.0.42）。⑤填入你磁盘空间充足（剩余空间250g以上）的媒体库目录地址

2.安装 Emby全家桶（一键） -> 2 1

3.安装 小雅元数据定时爬虫 -> 2 5 1 （选项全部用默认），安装后观察爬虫日志，爬虫运行完毕后进行下一步

4.爬虫运行完毕后浏览器打开ip:2345，右上角“设置”，左边栏“计划任务”，启动“Scan media library”，该扫库（第一次）操作耗时很久，期间emby会非常卡，且进度条跟时间不成正比，扫库进行时最好不要对emby进行任何操作，会延长扫库时间，耐心等待
