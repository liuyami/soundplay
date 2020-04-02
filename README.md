# soundplay使用说明
------

该库适用于H5中播放音频，满足绝大多数H5音频播放场景。

## 安装

* ### 使用CDN 方式

```html
<script src="//common.yscase.com/js/soundplay.js"></script>
```

* ### 使用NPM方式

```html
yarn add ys-sound-play # 或 npm i ys-sound-play --save
import SoundPlay from 'ys-sound-play'
```

## new SoundPlay(params);

------

* 用于初始化一个soundplay实例,并提供了一系列方法.
* 实例时参数说明:

| 参数名 | 类型   | 是否必填 | 描述              |
| ------ | ------ | -------- | ----------------- |
| params | object | 必须     | soundplay基本配置 |

* params 对象里的参数说明

| 参数名    | 类型    | 是否必填 | 默认值       | 描述                 |
| --------- | ------- | -------- | ------------ | -------------------- |
| src       | String  | 必须     | 无           | mp3文件地址          |
| autoplay  | Boolean | 可选     | true         | 是否自动开始播放     |
| loop      | Boolean | 可选     | true         | 是否循环播放         |
| icon      | String  | 必须     | 无           | 播放按钮图标         |
| iconPause | String  | 可选     | 无           | 暂停按钮图标         |
| animation | Boolean | 可选     | true         | 音乐图标自动播放动画 |
| x         | Number  | 可选     | 距离右边 100 | 音乐图标所属水平坐标 |
| y         | Number  | 可选     | 距离上边 20  | icon所属垂直坐标     |
| w         | Number  | 可选     | 图片本身宽度 | icon宽度             |
| h         | Number  | 可选     | 图片本身高度 | icon高度             |



## 使用方法示例

------

```

let interface = new SoundPlay({
  src:'http://domain.com/name.mp3',   //mp3文件地址
  autoplay: true,                     // 是否自动开始播放，默认 true
  loop: true,                         //  是否循环播放，默认 true
  icon: 'http://domain.com/name.png', // 播放按钮图标
  iconPause: 'img/icon2.png',         // 暂停按钮图标 
  animation: true,                    // 如果为 true 上面的icon转动，默认true 
  x: 100,                             // x 坐标，可选 ，默认右上角
  y: 20,                              // y 坐标，可选，默认右上角
  w: 50,                              // 图片的宽 默认图片本身宽高
  h: 50,                              // 图片的高 默认图片本身宽高
});

// 方法
interface.pause()   // 暂停播放

interface.play()   // 播放

interface.hide()   // 隐藏 icon

interface.show()   // 显示 icon
```

注意 : 抖音 ， 微博 ，手机浏览器平台暂时无法使用音频自动播放 ，该库已默认设置暂停播放状态 ，需要用户手动触发播放 。