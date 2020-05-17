#### 需求
- 实现YForm
  - 指定数据
  - 校验规则
- YformItem
  - 执行校验
  - 显示错误信息
- YInput
  - 维护数据

#### 实现步骤
1. input 
   1. 的双向数据绑定
   2. $attrs 的使用与绑定
   3. 属性继承的设置
2. itemInput
   1. label
   2. 插槽
   3. 错误提示
3. form 数据的隔代传递
4. async-validator
   1. 安装
   2. 获取规则
   3. 初始化 validator
   4. 校验