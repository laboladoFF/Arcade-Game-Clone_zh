// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.random() * 100;
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    this.range();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.range = function() {
    if(this.x > 505){
      this.x = -100;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y, num) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    this.num = 0;
};

Player.prototype.update = function() {
    this.checkCollisions();
    this.range();
    setTimeout(function(){
      player.reset();
    },200)
};

// 在屏幕上画出角色，
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
      case 'left':  this.x -= 101;  break;
      case 'right':  this.x += 101;  break;
      case 'up':  this.y -= 83;  break;
      case 'down':  this.y += 83;  break;

    }
};

Player.prototype.checkCollisions = function(){
  for(let i = 0; i < allEnemies.length; i++ ){
      if(Math.abs(this.y - allEnemies[i].y) < 50){
        //console.log(`${this.y} ${allEnemies[i].y}`);
        if(Math.abs(this.x - allEnemies[i].x) < 50){
          this.x = 303;
          this.y = 83 * 3 + 55;
          this.num ++;
          console.log(this.num);
        }else{
          //console.log(`${this.y} ${allEnemies[i].y}`);
        }
      }
  }
};
//
Player.prototype.range = function(){
    if(this.x <= 0 ){
      console.log('chujie0');
      this.x = 0;
    }else if(this.x >= 505){
      console.log('chujie505');
      this.x = 404;
    }

    if(this.y < -10 ){
      console.log('chujie0');
      this.y = -10;
    }else if(this.y >= 430){
      console.log('chujie505');
      this.y = 430;
    }
};

Player.prototype.reset = function(){
  if(player.y <= -9){
    this.x = 303;
    this.y = 83 * 3 + 55;
    celebrate ();
  }
};

//  function celebrate (){
//     if(player.num === 3){
//       if(player.y <= -9){
//         setTimeout(function(){
//             alert('恭喜');
//         },200)
//       }else{
//         alert('失败');
//       }
//       player.reset();
//     }
//
// }

function celebrate (){
           alert('恭喜');
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(0, 83 * 2 + 55),
                  new Enemy(0, 83 * 2 + 55),
                  new Enemy(0, 83 * 1 + 55),
                  new Enemy(0, 55)];
var player = new Player(303, 83 * 3 + 55);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
