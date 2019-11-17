# cic

简单易用的iframe通信库

### 索引

- [API](#1-api)
  - [1.1 CicOutsideIframe 对象](#11-cicoutsideiframe-对象)
    - [1.1.1 对象静态方法：CicOutsideIframe.createConnection\(iframeWindow:HTMLIFrameElement\):Connection;](#111-对象静态方法cicoutsideiframecreateconnectioniframewindowhtmliframeelementconnection)
  - [1.2 Connection类的实例属性和实例方法](#12-connection类的实例属性和实例方法)
    - [1.2.1 connectionInstance.destroy\(\);](#121-connectioninstancedestroy)
    - [1.2.2 connectionInstance.onDisconnect\(fn:\(connectionInstance:Connection\)=>void\):void;](#122-connectioninstanceondisconnectfnconnectioninstanceconnectionvoidvoid)
    - [1.2.3 connectionInstance.offDisconnect\(fn:\(connectionInstance:Connection\)=>void\):void;](#123-connectioninstanceoffdisconnectfnconnectioninstanceconnectionvoidvoid)
    - [1.2.4 connectionInstance.onConnect\(fn:\(\)=>void\):void;](#124-connectioninstanceonconnectfnvoidvoid)
    - [1.2.5 connectionInstance.offConnect\(fn:\(\)=>void\):void;](#125-connectioninstanceoffconnectfnvoidvoid)
    - [1.2.6 connectionInstance.onMessage\(fn:\(msg: string\)=>void\):void;](#126-connectioninstanceonmessagefnmsg-stringvoidvoid)
    - [1.2.7 connectionInstance.offMessage\(fn:\(msg: string\)=>void\):void;](#127-connectioninstanceoffmessagefnmsg-stringvoidvoid)
    - [1.2.8 connectionInstance.connectIframe\(\):void;](#128-connectioninstanceconnectiframevoid)
    - [1.2.9 connectionInstance.disconnectIframe\(\):void;](#129-connectioninstancedisconnectiframevoid)
    - [1.2.10 connectionInstance.postMessageToIframe\(data: any\):void;](#1210-connectioninstancepostmessagetoiframedata-anyvoid)
    - [1.2.11 connectionInstance.connected:boolean](#1211-connectioninstanceconnectedboolean)
    - [1.2.12 connectionInstance.isDestroyed:boolean](#1212-connectioninstanceisdestroyedboolean)
  - [1.3 CicInsideIframe对象](#13-cicinsideiframe对象)
    - [1.3.1 对象静态方法：CicInsideIframe.createListener\(\):Listener;](#131-对象静态方法cicinsideiframecreatelistenerlistener)
  - [1.4 Listener类](#14-listener类)
    - [1.4.1 listenerInstance.start\(\):void;](#141-listenerinstancestartvoid)
    - [1.4.2 listenerInstance.destroy\(\):void;](#142-listenerinstancedestroyvoid)
    - [1.4.3 listenerInstance.onDisconnect\(fn:(listenerInstance:Listener\)=>void):void;](#143-listenerinstanceondisconnectfnlistenerinstancelistenervoidvoid)
    - [1.4.4 listenerInstance.offDisconnect\(fn:(listenerInstance:Listener\)=>void):void;](#144-listenerinstanceoffdisconnectfnlistenerinstancelistenervoidvoid)
    - [1.4.5 listenerInstance.onConnect\(fn:(\)=>void):void;](#145-listenerinstanceonconnectfnvoidvoid)
    - [1.4.6 listenerInstance.offConnect\(fn:(\)=>void):void;](#146-listenerinstanceoffconnectfnvoidvoid)
    - [1.4.7 listenerInstance.onMessage\(fn:(data:any\)=>void):void;](#147-listenerinstanceonmessagefndataanyvoidvoid)
    - [1.4.8 listenerInstance.offMessage\(fn:(data:any\)=>void):void;](#148-listenerinstanceoffmessagefndataanyvoidvoid)
    - [1.4.9 listenerInstance.disconnectParent\(\):void;](#149-listenerinstancedisconnectparentvoid)
    - [1.4.10 listenerInstance.postMessageToParent\(data:any\):void;](#1410-listenerinstancepostmessagetoparentdataanyvoid)
    - [1.4.11 listenerInstance.connected:boolean](#1411-listenerinstanceconnectedboolean)
    - [1.4.12 listenerInstance.isDestroyed:boolean](#1412-listenerinstanceisdestroyedboolean)
- [2. 用法](#2-用法)
  - [2.1 module形式引入](#21-module形式引入)
  - [2.2 浏览器内直接引入](#22-浏览器内直接引入)
- [3. 举例](#3-举例)

## 1. API

说明：

- 建立通信连接时由，由 `connectionInstance.connectIframe()` 实例主动发起
- 每秒重试建立一次连接，直到`iframe`内部实例开始接收连接`listenerInstance.start()`

### 1.1 CicOutsideIframe 对象

iframe的父页面使用的连接对象

#### 1.1.1 对象静态方法：CicOutsideIframe.createConnection(iframeWindow:HTMLIFrameElement):Connection;

返回Connection类实例

### 1.2 Connection类的实例属性和实例方法

#### 1.2.1 connectionInstance.destroy();

销毁连接实例

#### 1.2.2 connectionInstance.onDisconnect(fn:(connectionInstance:Connection)=>void):void;

为 当前实例的断开事件 添加回调方法

#### 1.2.3 connectionInstance.offDisconnect(fn:(connectionInstance:Connection)=>void):void;

移除 当前实例断开时的 回调方法

#### 1.2.4 connectionInstance.onConnect(fn:()=>void):void;

为 当前实例的连接事件 添加回调方法

#### 1.2.5 connectionInstance.offConnect(fn:()=>void):void;

移除 当前实例建立连接时的 回调方法

#### 1.2.6 connectionInstance.onMessage(fn:(msg: string)=>void):void;

为消息事件添加回调方法

#### 1.2.7 connectionInstance.offMessage(fn:(msg: string)=>void):void;

移除消息事件的回调方法

#### 1.2.8 connectionInstance.connectIframe():void;

当连接实例添加完 消息/连接/断开连接 后，发起连接行为

#### 1.2.9 connectionInstance.disconnectIframe():void;

主动断开连接iframe

#### 1.2.10 connectionInstance.postMessageToIframe(data: any):void;

向iframe发送数据

#### 1.2.11 connectionInstance.connected:boolean

是否是已连接状态

#### 1.2.12 connectionInstance.isDestroyed:boolean

是否是已销毁状态

### 1.3 CicInsideIframe对象

内嵌页面使用的通信对象

#### 1.3.1 对象静态方法：CicInsideIframe.createListener():Listener;

返回Listener类实例

### 1.4 Listener类

Listener类的实例方法和实例属性说明如下

#### 1.4.1 listenerInstance.start():void;

listener实例添加完针对 connect/disconnect/message 的事件后，开始接收父页面的连接请求

#### 1.4.2 listenerInstance.destroy():void;

销毁listener实例，并触发disconnect事件

#### 1.4.3 listenerInstance.onDisconnect(fn:(listenerInstance:Listener)=>void):void;

添加'disconnect'事件的回调方法

#### 1.4.4 listenerInstance.offDisconnect(fn:(listenerInstance:Listener)=>void):void;

移除'disconnect'事件的回调方法

#### 1.4.5 listenerInstance.onConnect(fn:()=>void):void;

添加'connect'事件的回调方法

#### 1.4.6 listenerInstance.offConnect(fn:()=>void):void;

移除'connect'事件的回调方法

#### 1.4.7 listenerInstance.onMessage(fn:(data:any)=>void):void;

添加消息事件的回调方法

#### 1.4.8 listenerInstance.offMessage(fn:(data:any)=>void):void;

添加消息事件的回调方法

#### 1.4.9 listenerInstance.disconnectParent():void;

主动断开父页面

#### 1.4.10 listenerInstance.postMessageToParent(data:any):void;

向父页面发送消息

#### 1.4.11 listenerInstance.connected:boolean

是否是已连接状态

#### 1.4.12 listenerInstance.isDestroyed:boolean

是否是已销毁状态

## 2. 用法

### 2.1 module形式引入

首先安装 `npm i -S cic`

在父页面中引入`CicOutsideIframe`对象

`import CicOutsideIframe from 'cic/dist/cici-outside-iframe.js'`

在内嵌页中引入`CicInsideIframe`对象

`import CicInsideIframe from 'cic/dist/cici-inside-iframe.js'`

**webpack建议用法**

首先配置 `webpack.config.js`

```js
  resolve: {
    alias: {
      CicInsideIframe: path.resolve(__dirname,
        '../node_modules/cic/dist/cic-inside-iframe.js'),
      CicOutsideIframe: path.resolve(__dirname,
        '../node_modules/cic/dist/cic-outside-iframe.js')
    }
  }
```

然后代码中可以直接使用

```js
import CicInsideIframe from 'CicInsideIframe';

// or

import CicOutsideIframe from 'CicOutsideIframe';
```

### 2.2 浏览器内直接引入

- 使用 window.CicInsideIframe 对象
- https://unpkg.com/cic@1.0.8/dist/cic-inside-iframe.js
- https://unpkg.com/cic@1.0.8/dist/cic-inside-iframe.min.js

- 使用 window.CicOutsideIframe 对象
- https://unpkg.com/cic@1.0.8/dist/cic-outside-iframe.js
- https://unpkg.com/cic@1.0.8/dist/cic-outside-iframe.min.js

## 3. 举例

首先在`index.html`中签入需要通信的`内嵌页.html`

```
<script
  type="text/javascript"
  src="https://unpkg.com/cic@1.0.8/dist/cic-outside-iframe.js"
></script>

<iframe id="iframeWindow" src="http://xxx.com/iframe.html"></iframe>

<script type="text/javascript">
    var connection = window.CicOutsideIframe.createConnection(document.getElementById('iframeWindow'));

    connection.onMessage(function(dataFromIframe) {
        console.log('< parent: dataFromIframe =');
        console.log(dataFromIframe);
    });

    // 监听建立链接时
    connection.onConnect(function() {
        connection.postMessageToIframe({
            text: 'hello'
        })
    });

    // 主动连接iframe内嵌页
    connection.connectIframe();
</script>
```

`iframe.html`内代码如下

```
<script
  type="text/javascript"
  src="https://unpkg.com/cic@1.0.8/dist/cic-inside-iframe.js"
></script>
<script type="text/javascript">
    window.onLoad = function() {
      var listener = window.CicInsideIframe.createListener();

      listener.onConnect(function() {
          console.log('连接已建立');
      });

      listener.onMessage(function(dataFromParent) {
          console.log('> child: dataFromParent =');
          console.log(dataFromParent);
          if(dataFromParent.text === 'hello') {
              listener.postMessageToParent({
                  text: 'world'
              });
          }
      });

      listener.onDisconnect(function() {
          console.log('> 回调disconnect方法')
          listener.destroy();
      });

      listener.start();
    }
</script>
```
