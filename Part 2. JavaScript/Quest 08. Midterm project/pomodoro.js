
var PomodoroApp = function(dom){
    this.dom = dom;
    this.timer = new Timer(10);
    this.timer.show = true;
    this.timer.init(dom);
};
PomodoroApp.prototype = {
    getDom     : function(){ return this.dom; },
    work       : 25,
    smBreak    : 5,
    lgBreak    : 15,
    lgInterval : 4
};
var Timer = function (seconds){
    this.seconds = seconds;
    this.start = null;
    this.end = null;
    this.counter = null;
    this.show = false;
    this.dom = null;
};
Timer.prototype.init = function(dom){
    this.dom = dom;
    this.displayTime();
    this.start = Date.now();
    this.end = this.start + this.seconds * 1000;
    this.countdown();
};
Timer.prototype.countdown = function(){
    var self = this;
    this.counter = setInterval(function(){
        var timeLeft = Math.round( (self.end - Date.now()) / 1000 );
        self.seconds = timeLeft;
        if( timeLeft < 0 ){
            clearInterval(self.counter);
            self.finished();
            return;
        }
        self.displayTime();
    }, 1000);
};
Timer.prototype.finished = function(){
    this.start = null;
    this.end = null;
    console.log('finished');
};
Timer.prototype.pause = function(){
    clearInterval(this.counter);
};
Timer.prototype.resume = function(){
    this.init(this.dom);
};
Timer.prototype.displayTime = function(){
    if(this.show){
        var min = Math.floor(this.seconds / 60);
        var seconds = this.seconds % 60;
        this.dom.innerHTML = min + ":" + seconds < 10 ? "0" : "" + seconds; 
    }
    
};

var List = function(name){
    this.name = name;
    this.listItems = [];
};
List.prototype = Object.create(PomodoroApp.prototype);
List.prototype.constructor = List;

var ListItem = function(name, count){
    this.name = name;
    this.pomoCount = count;
    this.timer = new Timer(this.work * 60 * 1000);
};
ListItem.prototype = Object.create(List.prototype);
ListItem.prototype.constructor = ListItem;

