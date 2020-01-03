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

- 在`parent`和`iframe`中都使用`var connection = createConnection():Connection`创建和初始化通信
- 为`connection`实例添加监听方法，包括：`onMessage`,`onConnect`,`onDisconnect`
- 注意：1. **`onConnection`**在回调执行后，才可以`connection.sendMsg(msg)`进行消息传输； 2. 在执行`connection.sendMsg(msg)`前判断`connection.connected为true`
- 如果iframe内部窗口已和parent建立通信连接，那么iframe窗口内部页面刷新或者跳转到新的url地址之前 都会出发`disconnect`事件

## 库引入方法

引入库代库后执行一个工厂方法，生产一个`Connection`类的实例

### 第一种 直接全局引入`cic.js`文件

```
<script src="https://unpkg.com/cic@2.0.2/dist/cic.js" type="text/script"></script>

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

#### 2.1 `connection.onConnect(callback)`

添加通信连接成功时的回调方法

#### 2.1 `connection.offConnect(callback)`

移除通信连接成功时的回调方法

#### 2.3 `connection.onDisconnect(callback)`

添加通信断开连接时的回调方法

#### 2.4 `connection.offDisconnect(callback)`

移除通信断开连接时的回调方法


#### 2.5 `connection.onMessage(callback)`

添加接收消息的回调方法

#### 2.6 `connection.offMessage(callback)`

移除接收消息的回调方法


#### 2.7 `connection.destroy()`

资源回收 并 如果连接已建立那么触发`disconnect`事件

#### 2.8 `connection.connect(domWindow)`

- 说明：初始化完成后，调用该方法发起连接请求
- 参数：`domWindow`表示和哪个window对象建立连接
- `parent`和`iframe内部`都可以主动建立连接，主动建立连接的一方需要传入`domWindow`

#### 2.9 `connection.sendMsg(msg:any)`

- 说明：发送消息到`parent`或者`iframe`窗口
- 参数：`msg`可以是任意对象
- 注意：发送消息前需要判断 连接是否已建立 `connection.connected === true`


## 示例代码

`parent`窗口代码，文件名`index.html`

```
<iframe id="iframeWindow" src="./inside.html"></iframe>
<script type="text/javascript" src="https://unpkg.com/cic@2.0.2/dist/cic.js"></script>
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
  <script type="text/javascript" src="https://unpkg.com/cic@2.0.2/dist/cic.js"></script>
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
