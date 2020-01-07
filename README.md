# cic

简单易用的iframe通信库

### 索引

- [浏览器兼容性](#浏览器兼容性)
- [使用方法](#使用方法)
- [库引入方法](#引入方法)
- [API](#api)
- [示例代码](#示例代码)

##  浏览器兼容性

- 兼容IE8+

## 使用方法

1. 在`parent`和`iframe`中都使用`var connection = createConnection():Connection`初始化连接对象
1. 为`connection`实例添加监听方法:`onMessage`,`onConnect`,`onDisconnect`
1. 接下来需要其中一方发起通信连接请求`connection.connect(domWindow)`
1. 注意
    1. **`onConnection`**在回调执行后，才可以`connection.sendMsg(msg)`进行消息传输
    1. 或者在执行`connection.sendMsg(msg)`前判断`connection.connected`为`true`
1. 如果通信连接已建立
    1. 那么iframe窗口内部页面刷新或者跳转到新的url地址之前，都会出发`disconnect`事件
    1. 重新连接需要其中一方再次主动调用`connection.connect(domWindow)`方法

## 库引入方法

引入库代库后执行一个工厂方法，生产一个`Connection`类的实例

### 第一种 直接全局引入`cic.js`文件

```
<script src="https://unpkg.com/cic@2.0.9/dist/cic.min.js" type="text/script"></script>

<script type="text/script">
  var connection = window.Cic.createConnection();
</script>
```

### 第二种 module形式引入

```
import { createConnection } from 'cic';
var connection = createConnection();
```

## API

### 1. 静态工厂方法`Cic.createConnection():Connection`

返回一个`Connection`类实例

### 2. `Connection` 类

#### 2.1 实例属性`connection.connected:Boolean`

跨iframe通信是否已连通

#### 2.2 实例属性`connection.destroyed:Boolean`

如果实例已销毁，那么当前实例不可再次发起连接请求

#### 2.3 `connection.onConnect(callback)`

添加通信连接成功时的回调方法

#### 2.4 `connection.offConnect(callback)`

移除通信连接成功时的回调方法

注意：**其中`callback`和传入`onConnect`的回调方法是同一个。**如果无法理解可参考[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

#### 2.5 `connection.onDisconnect(callback)`

添加通信断开连接时的回调方法

#### 2.6 `connection.offDisconnect(callback)`

移除通信断开连接时的回调方法

注意：**其中`callback`和传入`onDisconnect`的回调方法是同一个。**如果无法理解可参考[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

#### 2.7 `connection.onMessage(callback:(msg:any)=>void)`

添加接收消息的回调方法

#### 2.8 `connection.offMessage(callback:(msg:any)=>void)`

移除接收消息的回调方法。

注意：**其中`callback`和传入`onMessage`的回调方法是同一个。**如果无法理解可参考[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)


#### 2.9 `connection.destroy()`

资源回收。如果连接已建立那么触发`disconnect`事件，通知对方连接断开

#### 2.10 `connection.connect(domWindow)`

- 说明：发起连接请求
- 参数：`domWindow`表示需要连接的window对象
- `parent`或`iframe内部`都可以主动建立连接，主动建立连接的一方需要传入`domWindow`

#### 2.11 `connection.sendMsg(msg:any)`

- 说明：发送消息
- 参数：`msg`可以是任意对象
- 注意：发送消息前需要确定在`onConnect`回调执行以后


## 示例代码

`parent`窗口代码，文件名`index.html`

```
<iframe id="iframeWindow" src="./inside.html"></iframe>
<script type="text/javascript" src="https://unpkg.com/cic@2.0.9/dist/cic.js"></script>
<script type="text/javascript">
    var connection = window.Cic.createConnection();

    connection.onMessage(function(dataFromIframe) {
        console.log('< parent: dataFromIframe =');
        console.log(dataFromIframe);
        if (dataFromIframe.text === 'world') {
            //console.log('< 外层窗口 主动发起断开连接');
            //connection.disconnect();
        }
    });

    connection.onConnect(function() {
        connection.sendMsg({
            text: 'hello'
        })
    });

    connection.onDisconnect(function() {
        console.log('内部断开链接，可能是内部网址发生变化。');
        
    });

    // 发起连接
    connection.connect(document.getElementById('iframeWindow'));
</script>

```

`iframe`窗口代码，文件名`inside.html`

```
  <script type="text/javascript" src="https://unpkg.com/cic@2.0.9/dist/cic.js"></script>
  <script type="text/javascript">
  // 用setTimeout故意延迟几秒，等待重试连接
  setTimeout(function() {
    var connection = window.Cic.createConnection();

    connection.onConnect(function() {
      console.log('> 连接已建立');
    });

    connection.onMessage(function(dataFromParent) {
      console.log('> dataFromParent =');
      console.log(dataFromParent);

      if (dataFromParent.text === 'hello') {
        connection.sendMsg({
          text: 'world'
        });
      }
    });

    connection.onDisconnect(function() {
      console.log('> iframe 收到断开链接的请求。然后执行链接销毁功能');
      connection.destroy();
    });
  }, 1000);

  setTimeout(function() {
    location.href = "https://baidu.com";
  }, 3000);
  </script>

```
