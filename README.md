# cic

iframe通信框架

<!-- MarkdownTOC -->

- API
  - CicOutsideIframe 对象
    - 类方法：CicOutsideIframe.createConnection\(iframeWindow:HTMLIFrameElement\):Connection;
  - Connection类，只有实例方法
    - connectionInstance.destroy\(\);
    - connectionInstance.onDisconnect\(fn:(connectionInstance:Connection\)=>void):void;
    - connectionInstance.offDisconnect\(fn:(connectionInstance:Connection\)=>void):void;
    - connectionInstance.onConnect\(fn:(connectionInstance:Connection\)=>void):void;
    - connectionInstance.offConnect\(fn:(connectionInstance:Connection\)=>void):void;
    - connectionInstance.onMessage\(fn:(msg: string\)=>void):void;
    - connectionInstance.offMessage\(fn:(msg: string\)=>void):void;
    - connectionInstance.connectIframe\(\):void;
    - connectionInstance.disconnectIframe\(\):void;
    - connectionInstance.postMessageToIframe\(data: any\):void;
  - CicInsideIframe对象
    - 类方法：CicInsideIframe.createListener\(\):Listener;
  - Listener类
    - listenerInstance.start\(\):void;
    - listenerInstance.destroy\(\):void;
    - listenerInstance.onDisconnect\(fn:(\)=>void):void;
    - listenerInstance.offDisconnect\(fn:(\)=>void):void;
    - listenerInstance.onConnect\(fn:(\)=>void):void;
    - listenerInstance.offConnect\(fn:(\)=>void):void;
    - listenerInstance.onMessage\(fn:(data:any\)=>void):void;
    - listenerInstance.offMessage\(fn:(data:any\)=>void):void;
    - listenerInstance.disconnectParent\(\);
    - listenerInstance.postMessageToParent\(data:any\):void;
- 用法
  - module形式引入
  - 浏览器内直接引入
  - 举例说明

<!-- /MarkdownTOC -->


## API

### CicOutsideIframe 对象

iframe的父页面使用的连接对象

#### 类方法：CicOutsideIframe.createConnection(iframeWindow:HTMLIFrameElement):Connection;

---

### Connection类，只有实例方法

#### connectionInstance.destroy();

销毁连接实例

#### connectionInstance.onDisconnect(fn:(connectionInstance:Connection)=>void):void;

为 当前实例的断开事件 添加回调方法

#### connectionInstance.offDisconnect(fn:(connectionInstance:Connection)=>void):void;

移除 当前实例断开时的 回调方法

#### connectionInstance.onConnect(fn:(connectionInstance:Connection)=>void):void;

为 当前实例的连接事件 添加回调方法

#### connectionInstance.offConnect(fn:(connectionInstance:Connection)=>void):void;

移除 当前实例建立连接时的 回调方法

#### connectionInstance.onMessage(fn:(msg: string)=>void):void;

为消息事件添加回调方法

#### connectionInstance.offMessage(fn:(msg: string)=>void):void;

移除消息事件的回调方法

#### connectionInstance.connectIframe():void;

当连接实例添加完 消息/连接/断开连接 后，发起连接行为

#### connectionInstance.disconnectIframe():void;

主动断开连接iframe

#### connectionInstance.postMessageToIframe(data: any):void;

向iframe发送数据


---

### CicInsideIframe对象

内嵌页面使用的通信对象

#### 类方法：CicInsideIframe.createListener():Listener;

---

### Listener类

Listener类的实例方法说明如下

#### listenerInstance.start():void;

listener实例添加完针对 connect/disconnect/message 的事件后，开始接收父页面的连接请求。

#### listenerInstance.destroy():void;

销毁listener实例，并触发disconnect事件

#### listenerInstance.onDisconnect(fn:()=>void):void;

添加'disconnect'事件的回调方法

#### listenerInstance.offDisconnect(fn:()=>void):void;

移除'disconnect'事件的回调方法

#### listenerInstance.onConnect(fn:()=>void):void;

添加'connect'事件的回调方法

#### listenerInstance.offConnect(fn:()=>void):void;

移除'connect'事件的回调方法

#### listenerInstance.onMessage(fn:(data:any)=>void):void;

添加消息事件的回调方法

#### listenerInstance.offMessage(fn:(data:any)=>void):void;

添加消息事件的回调方法

#### listenerInstance.disconnectParent();

主动断开父页面

#### listenerInstance.postMessageToParent(data:any):void;

向父页面发送消息

## 用法

### module形式引入

首先安装`cic`模块。

`npm i -D cic`;

在父页面中引入`CicOutsideIframe`对象。

`import CicOutsideIframe from 'cic/dist/cici-outside-iframe.js'`

在内嵌页中引入`CicInsideIframe`对象。

`import CicInsideIframe from 'cic/dist/cici-inside-iframe.js'`

### 浏览器内直接引入

https://unpkg.com/cic@1.0.1/dist/cic-inside-iframe.js

可以直接使用 window.CicInsideIframe 对象

---

https://unpkg.com/cic@1.0.1/dist/cic-outside-iframe.js

可以直接使用 window.CicOutsideIframe 对象



### 举例说明

首先在`index.html`中签入需要通信的`内嵌页.html`。比如：

```
<script type="text/javascript" src="https://unpkg.com/cic@1.0.1/dist/cic-outside-iframe.js"></script>

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

`iframe.html`代码如下:

```
<script type="text/javascript" src="https://unpkg.com/cic@1.0.1/dist/cic-inside-iframe.js"></script>
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
