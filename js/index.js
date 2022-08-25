// 将所有的模块代码按照一定的顺序引入
// =================================== Tools ===============================
(function (window,undefined){
  var Tools = {
  // 获取一个范围内部的随机整数
  getRandom: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
// 获取随机颜色的方法
  getColor: function () {
    // rgb(r,g,b)三个颜色的色值0-255
    var r = this.getRandom(0,255);
    var g = this.getRandom(0,255);
    var b = this.getRandom(0,255);
    return "rgb(" + r + "," + g + "," + b +")";
  }
};
window.Tools = Tools;
})(window,undefined);

// =================================== Food  ======================================
(function (window,undefined) {
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
})(window,undefined);

// =================================== Snake ======================================================
(function (window,undefined){
  // 全局变量
  var ps = "absolute";
  // 创建蛇的构造函数
  function Snake(option) {
    option = option instanceof Object ? option : {};
    // 给对象添加属性
    // 设置蛇的宽度和高度属性
    this.width  = option.width || 20;
    this.height = option.height || 20;
    // 设置蛇身的数据
    this.body = [
      {x: 3, y: 2, color: "red"},
      {x: 2, y: 2, color: "blue"},
      {x: 1, y: 2, color: "blue"}
    ]
    // 设置蛇移动的方向，还可以设置left,top,bottom
    this.direction = "right";
    // 添加一个元素的数组，存储所有渲染的div元素
    this.elements = [];
  }
  // 添加一个将元素渲染到页面上的方法
  Snake.prototype.render = function (map) {
    // 生成对应个数的div元素
    // 遍历数组
    for(var i=0, len = this.body.length; i < len; i++) {
      // 根据数组的每一项数据生成一个新的div数据
      var piece = this.body[i];
      // 创建新元素
      var ele = document.createElement("div");
      // 添加样式
      ele.style.width = this.width + "px";
      ele.style.height = this.height + "px";
      ele.style.left = piece.x * this.width + "px";
      ele.style.top = piece.y * this.height + "px";
      ele.style.position = ps;
      ele.style.backgroundColor = piece.color;
      // 渲染到指定的父级内部
      map.appendChild(ele);
      // 将添加的新元素存在数组里
      this.elements.push(ele);
    }
  }
  // 添加蛇运动的方法
  Snake.prototype.move = function () {
    // 蛇身的每一节都要变成上一节的位置
    // 循环需要从最后一节开始，避免前面的数据发生变化
    for (var i = this.body.length-1; i>0; i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    // 存储一下蛇头的数据
    var head = this.body[0];
    // 蛇头要根据方向发生位置变化
    switch (this.direction) {
      case "right":
        head.x +=1;
        break;
      case "left":
        head.x -=1;
        break;
      case "top":
        head.y -=1;
        break;
      case "bottom":
        head.y +=1;
    }
  }
  // 删除上一次渲染的蛇的所有div元素
  Snake.prototype.remove = function (map) {
    // 遍历数组删除所有元素
    // 将元素从html结构中的所有元素
    for (var i = this.elements.length-1; i >= 0; i--) {
      map.removeChild(this.elements[i]);
    }
    // 将数组清空
    this.elements = [];
  }
  window.Snake = Snake;
})(window,undefined);

// ==================================== Game ==========================================================================
(function (window,undefined) {
  // 定义一个全局变量 存储this
  var that;
  function Game (map) {
    // 设置三个属性，存储食物，蛇，地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function () {
    // 1.添加蛇和食物到地图上
    this.food.render(this.map);
    this.food.render(this.map);
    this.food.render(this.map);

    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    // 2.1让蛇自动运动起来
    runSnake();
    // 2.2通过上下左右箭头控制蛇的运动方向
    bindKey();
  }
  // 分装一个私有函数，控制上下左右案件更改的方向
  function bindKey() {
    // 给文档绑定键盘按下事件
    document.onkeydown = function (e) {
      console.log(e.keyCode);
      // 键盘的编码
      // 37--left 38--top 39--right 40--bottom
      switch (e.keyCode) {
        case 37:
          that.snake.direction = "left";
          break;
          case 38:
            that.snake.direction = "top";
            break;
            case 39:
              that.snake.direction = "right";
          break;
          case 40:
            that.snake.direction = "bottom";
            break;
      }
    }
  }
      // 封装一个私有函数,只能在模块内部进行调用
      function runSnake() {
        // 开启定时器，让蛇连续运动起来
        var timer = setInterval(function (){
          // 定时器内部的this，指向的是window
          // 让蛇运动
          that.snake.move();
          // 删除上一次的蛇
          that.snake.remove(that.map);
          // 渲染新位置的蛇
          that.snake.render(that.map);
          // 记录最大的位置
          var maxX = that.map.offsetWidth / that.snake.width;
          var maxY = that.map.offsetHeight / that.snake.height;
          // 找到当前蛇头的位置
          var headX = that.snake.body[0].x;
          var headY = that.snake.body[0].y;
          // 蛇每走一步都要判断，是否吃到食物了，并让自己增加一节
          // 2.3判断蛇头与食物是否相碰，吃掉食物
          var foodX = that.food.x;
          var foodY = that.food.y;
          // 获取蛇头的具体坐标位置，px值
          var hX = headX * that.snake.width;
          var hY = headY * that.snake.height;
          // 判断
          // 将食物数组中每一个都要进行对比，谁被吃掉，删除自己，渲染一个新的元素
          for (var i = 0; i < that.food.elements.length; i++) {
            if (that.food.elements[i].offsetLeft === hX && that.food.elements[i].offsetTop === hY) {
              // 吃到了食物
              // 让食物删除，然后渲染一个新的食物
              that.food.remove(that.map,i);
              that.food.render(that.map);
              // 添加一个新的蛇节
              var last = that.snake.body[that.snake.body.length - 1];
              that.snake.body.push({
                x: last.x,
                y: last.y,
                color: last.color
              })
            }
          }
          // 2.4判断是否超出地图范围，结束游戏
          // 每移动一次都要判断是否超出了地图，游戏是否结束
          // 进行判断
          if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
            clearInterval(timer);
            alert("GameOver");
          }
    },150)
  }
  // 将构造函数通过window暴露
  window.Game = Game;
})(window,undefined);

//  =================================== Main ========================================================
(function (window,undefined) {
  var map = document.getElementById("map");
  var game = new Game(map);
  game.start();
})(window,undefined);