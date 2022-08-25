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