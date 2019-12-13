## 基于wepy2.x小程序架构


### 环境

    npm install @wepy/cli -g

### 运行程序

    > npm run dev --watch

---------

### 打包
    > npm run build

---------
### wepy2新特性

#### wsx修饰符 模板函数响应事件

#### 支持状态管理器

    import store from '/store';
    wepy.page({
        store,
        created() {
            console.log(this.$store);
        }
        ....
    })
    用法与Vuex一致

#### 自带事件广播

    import eventHub from '/utils/common/eventHub';
    eventHub.$on('eventName', (...args) => { // 注册事件
      console.log(args);
    });
    eventHub.$emit('eventName', { a: 1 }, { b: 2 }); // 事件触发

### 目录结构

├── app.wpy                         入口文件
├── config.js                       常量配置文件
├── api                             请求接口目录
│   └── index.js
├── assets                          静态资源目录
│   └── styles
│       └── base.less               基础共用样式
├── components                      组件目录
│   ├── modal.wpy
│   └── modal.wpy
├── mixins                          mixins
│   └── test.js
├── pages                           页面文件目录
│   └── index.wpy
├── store                           状态管理目录
│   └── index.js
└── utils                           工具目录
    ├── common
    │   └── eventHub.js
    ├── index.js
    └── wxRequest.js                httpRequest封装

### 其他

vscode创建页面/组件的模板快捷指令

封装httpRequest

补充小程序缺少的自定义modal模态对话框组件(完善中)


