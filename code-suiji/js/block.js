// 自定义一个随机方块的构造函数
function Block(parent,option) {
  // 设置方块的属性：宽度，高度，背景颜色，定位位置
  // 确保用户输入的是一个对象
  option = option || {};

  this.width = option.width || 20;
  this.height = option.height || 20;
  this.backgroundColor = option.backgroundColor || "red";
  this.x = option.x || 0;
  this.y = option.y || 0;

  // 存储自己的父级到对象上
  this.parent = parent;

}
// 需要生成的随机方块对象，需要渲染到页面上，设置给原型对象
Block.prototype.render = function () {
  // 创建一个新的元素
  this.ele = document.createElement("div");
  // 需要添加给指定的父级
  this.parent.appendChild(this.ele);
  // 添加css样式
  this.ele.style.width = this.width + "px";
  this.ele.style.height = this.height + "px";
  this.ele.style.backgroundColor = this.backgroundColor;
  this.ele.style.left = this.x + "px";
  this.ele.style.top = this.y + "px";
}
// 随机更改位子的方法
Block.prototype.positionRandom = function () {
  // 获取元素的坐标，随机的
  this.x = Tools.getRandom(0, this.parent.clientWidth / this.width-1) * this.width;
  this.y = Tools.getRandom(0, this.parent.clientHeight / this.height-1) * this.height;
  // 赋值给样式
  // 这个方法内部，不能调用另外一个方法内部的变量
  this.ele.style.left = this.x + "px";
  this.ele.style.top = this.y + "px";

}