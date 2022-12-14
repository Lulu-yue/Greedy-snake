// 缩小定义，构造函数的作用
// 创建食物的构造函数
(function () {
    var ps = "absolute";
    function Food(option) {
      // 避免传入的参数类型不对，或者没有参数
    option = option instanceof Object ? option : {};
    // 传入的数据可能是类似数组等对象，需要进一步判断
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.color = option.color || "green";
    // 增加一个属性，存储将来这个对象渲染出来的所有div元素
    this.elements = [];
  }

  // 渲染一个元素到页面上，需要添加到原型对象方法中
  Food.prototype.render = function (map) {
    // 创建一个新的div元素
    var ele = document.createElement("div");
    // 每次设置样式之前，都随机获取一个x和y的值
    this.x = Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
    
    // 添加对应的样式
    ele.style.width = this.width + "px";
    ele.style.height = this.height + "px";
    ele.style.left = this.x + "px";
    ele.style.top = this.y + "px";
    ele.style.backgroundColor = this.color;
    ele.style.position = ps;
  // 让新元素添加到指定的父级中
    map.appendChild(ele);
    // 将新元素添加的数组中，方便后期调用使用
    this.elements.push(ele);
  }
  // 删除一个食物div 元素
  Food.prototype.remove = function (map, i) {
    // 获取要被删除的食物的下标
    // 将元素从Html结构中删除
    map.removeChild(this.elements[i]);
    // 将元素从数组中删除
    this.elements.splice(i,1);
  }
  // 利用window对象，暴露food给外部使用
  window.Food = Food;
})();

// 获取父级地图元素 
// var map = document.getElementById("map");

// var food = new Food();
// food.render(map);
