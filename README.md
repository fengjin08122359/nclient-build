# nclient-build
## 久科新建工程类

###install
npm install --g nclient-build

###usage
1. nclient-build workspace <name> (创建工作区)
1. nclient-build class <name> (创建js文件,用于类创建)
2. nclient-build component <name> (创建vue和js类)
3. nclient-build vue <name> (创建vue文件)
4. nclient-build project <name> --dir=./project (创建项目)
5. nclient-build version (版本号)
6. nclient-build help (帮助)
7. nclient-build fast-config (vue项目快捷设置)

##工程将分成两种开发模式
### 敏捷开发 
    目标是完成快节奏的开发任务,针对任务多,时间短的情况,需要能够快速完成开发工作,包含
1.  http请求
2.  逻辑架构
3.  代码分离
4.  多语言根据需求导入
5.  单页数据对应单一对象

不需要vuex作为状态管理,可以直接以调用接口的形式使用
|-- A.vue->包含created,mounted,两个方法
|-- a.js->包含data和handle(created,mounted,两个方法)两个类以及 class A


#####增加一个方法在增加一个vue的时候同时增加一个数据处理的js包含功能(构造一个class,包含初始化init,)

### 迭代开发
    目标是完成中长期的开发任务,对整个开发任务有一个明确的定义,包含
1.  http请求
2.  结果输出    
3.  逻辑架构
4.  代码分离
5.  多语言根据需求导入
6.  vuex状态管理

使用命令行 增加 对象

首先需要定义出一个标准的目录结构

|--public 
|   |--images
|   |--index.html
|--src
|   |--asset
|   |--components


1. 创建工程(多项目启动)
2. 创建项目(简单项目或复杂项目)
3. 创建类(全部或者仅数据)
##目标
(x) 创建一个命令行控制需要输入的指令
(x) 创建一个页面管理工程
(x) 需要可以新建项目,删除项目?
(x) 创建一个工程启动程序
(x) 工程中同时启动多个项目
(x) 创建项目,简单或复杂,目录结构不一致
(x) 在每个项目中创建类
(?) 选择在创建时是否包含vuex,vue router,elementui




(x) project文件夹安装为空
(x) component的js文件命名
(x) pm2需要全局安装

