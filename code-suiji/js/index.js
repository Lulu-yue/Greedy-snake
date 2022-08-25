var stage = document.getElementById("stage");
// 通过一个空数组，记录添加的所有方块对象
var arr = [];
// 生成一个实例
// var block = new Block(stage);
// block.render();
for (var i = 1; i <= 10; i++) {
  var block = new Block(stage,{backgroundColor: Tools.getColor()});
  block.render();
  // 初始阶段就让元素随机位置
  block.positionRandom();
  // 数组中添加一项纪录
  arr.push(block);
}
// 开启定时器，每隔一段时间让位置再次随机变化
setInterval(function () {
  for(var i = 0; i<arr.length; i++){
    arr[i].positionRandom();
  }
},1000)
