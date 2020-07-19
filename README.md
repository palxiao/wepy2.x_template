## 基于 wepy2.x 小程序架构

### 环境

    npm install @wepy/cli -g

    yarn install 推荐使用yarn进行包管理

### 运行程序

    > yarn dev

---

### 打包

    > yarn build

---

### wepy2 特性

#### wepy.config.js 自定义别名及使用方式

    配置：

```JavaScript
...
resolve: {
    alias: {
        myNameIs: path.join(__dirname, 'src/.../...')
    },
},
```

    页面中使用：

```
<config>
{
    navigationBarTitleText: '',
    usingComponents: {
      componName: '~myNameIs',
    }
}
</config>
```

#### wsx 修饰符 模板函数响应事件

    页面引入：
    <wxs module="module" lang="babel" src="../utils/widget/test.wxs"></wxs>
    页面使用：
    <view> {{module.functionName(value)}} </view>

#### 支持状态管理器

```javaScript
import store from '/store';
wepy.page({
    store,
    created() {
        console.log(this.$store);
    }
    ....
})
// 用法与Vuex一致
  import { mapState, mapActions } from '@wepy/x';

    // computed: mapState([ 'xxx' ]), // 对应 mutations
    // methods: {
    //    ...mapActions(['xxx','xxx']) // 对应 actions
    // }
```

#### 自带事件广播

```javaScript
import eventHub from '/common/eventHub';
// 注册事件
eventHub.$on('eventName', (...args) => {
    console.log(args);
});
// 事件触发
eventHub.$emit('eventName', { a: 1 }, { b: 2 });
```

### 目录结构

    ├── app.wpy                         入口文件
    ├── config.js                       常量配置文件
    ├── api                             请求接口目录
    │   └── index.js
    ├── assets                          静态资源目录
    │   ├── images                      该目录会打包到编译目录
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

vscode 创建页面/组件的模板快捷指令

封装 httpRequest

补充小程序缺少的自定义 modal 模态对话框组件(完善中)

封装小程序保存图片授权逻辑
