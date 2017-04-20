# nyanfm音乐电台

一个轻量级的网页音乐播放器

### Demo
http://music.nyan.im/

### 历史
* 2014.7 我基于[无名音乐电台](https://github.com/imshuhao/music-fm)修改后制作了这个播放器
* 2015.7 更换了用于背景轮播的库，提升性能。
* 2016.7 使用一个单独的python脚本将播放列表与我的网易云音乐歌单同步

### 使用
* 播放列表位于`js/script.js`，每首歌的代码为：
```
{
          title:'Tell Your World',
          artist:'livetune feat.初音ミク',
          album:'「ReDial」',    
          cover:'http://www.lynx.im/cover/redial.jpg',
          mp3:'http://www.lynx.im/mp3/02 Tell Your World.mp3',
          ogg:'http://www.lynx.im/mp3/02 Tell Your World.mp3',
},
```
* 网易云音乐同步脚本：https://github.com/hyriamb/nem-list-sync

### 鸣谢
* [ojeremy.com](https://ojeremy.com/)      天国的无名科技博客，本项目fork自他的无名音乐电台
* [kotori.moe](http://kotori.moe)      参考了不少他的前端代码
* [nmdown](https://github.com/muzuiget/nmdown),[musicbox](https://github.com/darknessomi/musicbox),[backstretch](https://github.com/srobbin/jquery-backstretch)等开源项目
