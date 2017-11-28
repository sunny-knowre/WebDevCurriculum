
var _pubsub = (function(){
    var cache = {};
    return {
        cache: cache,
        pub: function (id) {
            var args = [].slice.call(arguments, 1);

            if (!cache[id]) {
                cache[id] = {
                    callbacks: [],
                    args: [args]
                };
            } else {
                cache[id].args.push(args);
            }

            for (var i = 0, il = cache[id].callbacks.length; i < il; i++) {
                cache[id].callbacks[i].apply(null, args);
            }
        },
        sub: function (id, fn) {
            if (!cache[id]) {
                cache[id] = {
                    callbacks: [fn],
                    args: []
                };
            } else {
                cache[id].callbacks.push(fn);

                for (var i = 0, il = cache[id].args.length; i < il; i++) {
                    fn.apply(null, cache[id].args[i]);
                }
            }
        },
        unsub: function (id, fn) {
            var index;
            if (!cache[id]) {
                return;
            }

            if (!fn) {
                cache[id] = {
                    callbacks: [],
                    args: []
                };
            } else {
                index = cache[id].callbacks.indexOf(fn);
                if (index > -1) {
                    cache[id].callbacks = cache[id].callbacks.slice(0, index).concat(cache[id].callbacks.slice(index + 1));
                }
            }
        }
    };
})();

var PomodoroApp = function(dom){
    var self = this;
    this.totalBreaks = 0;
    this.uid = 0;
    this.tasks = [];
    this.currentTimer = null;
    this.isPaused = false;
    this.tasksDom = document.getElementById("task-list");
    this.addTask("Task 1", 2);
    this.addTask("Task 2", 1);

    var startBtn = document.querySelector("button.start");
    var skip = document.querySelector("button.skip");
    var form = document.addTask;
    this.notifications = new NotificationHandler(form, document.getElementById("info-bar") );
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        self.addTask(this.name.value, this.poms.value);
        this.reset();
    });
    
    startBtn.addEventListener('click', function (e){
        e.preventDefault();
        if(self.tasks.length == 0){
            _pubsub.pub("notification", {type:"form-error", message: "can't start with no tasks"});
            return;
        }

        if(self.currentTimer == null){    
            self.startNext();
            self.notifications.clear();
            this.innerHTML = "Pause";
        }else{
            if(self.isPaused){
                self.isPaused = false;
                this.innerHTML = "Pause";  
                self.currentTimer.resume(); 
            }else{
                self.isPaused = true;
                this.innerHTML = "Resume";
                self.currentTimer.pause();
            }
        }
    });

    skip.addEventListener('click', function (e){
        e.preventDefault();
        if(self.currentTimer != null )
            self.currentTimer.finished();
        else
            _pubsub.pub('notification', {type:"error", message:"need to start pomodoros first", target:e.target});
    });

    _pubsub.sub('finished-pomo', function (task){
        task.decrement();
        task.highlight();
        if(task.count < 1){
            self.removeTask(task);
            self.takeBreak();
        }else{
            self.takeBreak();
        }
    });
    _pubsub.sub('finished-break',function(){
        self.notifications.clear();
        self.startNext();
    })

};
PomodoroApp.prototype = {
    work       : 25 * 60,   //25 min
    smBreak    : 5  * 60,   //5 min
    lgBreak    : 15 * 60,   //15 min 
    lgInterval : 4,         // take long break every 4th break
    addTask    : function( name , num){
        if(isNaN(num) || num < 1 || num > 50){
            _pubsub.pub('notification',{ type: "form-error", message:"not a valid number of pomodoros"} )
            return;
        }
        if(name.length == 0 ){
            _pubsub.pub('notification',{ type: "form-error", message:"need to input a name"} )
            return;
        }
        var id   = "task-" + this.uid++;
        var task = new ListItem(id, name, num);
        this.tasks.push(task);
        this.tasksDom.appendChild(task.dom);
    },
    removeTask : function(task) {
        task.dom.remove();
        var index = this.tasks.indexOf(task);
        if (index > -1)
            this.tasks.splice(index, 1);
    },
    startNext  : function() {
        if(this.tasks.length > 0){
            var task = this.tasks[0];
            task.highlight();
            this.currentTimer = task.timer;
            if(!this.isPaused)
                task.timer.init();
            else
                task.timer.init().pause();
            
        }
    },
    takeBreak  : function() {
        this.totalBreaks++;
        var timer;
        var msg = null;
        if( this.tasks.length == 0){
            _pubsub.pub("notification", {type:"info", message: "done with all tasks!"});
            this.reset();
            return;
        }

        if( (this.totalBreaks % this.lgInterval) == 0 ){
            timer = new Timer(this.lgBreak, "break");
            msg = "take a long break";
        }else{
            timer = new Timer(this.smBreak, "break");
            msg = "take a short break";
            
        }
        this.currentTimer = timer;
        _pubsub.pub("notification",{type:"info", message: msg } );
        if(!this.isPaused)
            timer.init();
        else
            timer.init().pause();
    },
    reset : function(){
        this.totalBreaks = 0;
        this.uid = 0;
        this.tasks = [];
        this.currentTimer = null;
        this.isPaused = false;
        var button = document.querySelector('button.start');
        button.innerHTML = 'Start';
    }
};  

var ListItem = function(id, name, count){
    this.id = id;
    this.name = name;
    this.count = count;
    this.timer = new Timer(this.work, this);
    this.dom = null;
    this.countDom = null;
    this.createDom();
    
}; 
ListItem.prototype = Object.create(PomodoroApp.prototype);
ListItem.prototype.constructor = ListItem;
ListItem.prototype.createDom = function(){
    var taskDiv  = document.createElement('div');
    var countDiv = document.createElement('div');
    var countSpan  = document.createElement('span');
    taskDiv.classList.add("task_item");
    countDiv.classList.add("count");
    taskDiv.innerHTML   = this.name;
    countSpan.innerHTML = this.count;
    countDiv.appendChild(countSpan);
    taskDiv.appendChild(countDiv);
    this.dom = taskDiv;
    this.countDom = countSpan;
};
ListItem.prototype.decrement = function(){
    this.countDom.innerHTML = --this.count;
};
ListItem.prototype.highlight = function(){
    this.dom.classList.toggle("highlight");
};

var NotificationHandler = function(form, messageDom){
    var self = this;
    this.messageDom = messageDom;
    this.form = form;
    this.background = document.querySelector('.display');
    _pubsub.sub('notification', function(noti){
        switch(noti.type){
            case "form-error":
                self.showFormError(noti.message);
                break;
            case "info":
                self.showInfo(noti.message);
                break;
            case "error":
                self.handleError(noti.message, noti.target);
                break;
        }
    });
}
NotificationHandler.prototype.flash = function(time, element, flashClass){
    setTimeout(function(){
        element.classList.remove(flashClass);
    }, time);
};
NotificationHandler.prototype.showFormError = function(m){
    var errorClass = "error";
    console.log("Error: " + m);
    this.form.classList.add(errorClass);
    this.flash(500, this.form, errorClass);
};
NotificationHandler.prototype.handleError = function(m, target){
    var errorClass = "error";
    console.log("Error: " + m);
    target.classList.add(errorClass);
    this.flash(500, target, errorClass);
};
NotificationHandler.prototype.showInfo = function(m){
    this.background.classList.add('notice');
    this.messageDom.innerHTML = m;;
};
NotificationHandler.prototype.clear = function(){
    this.messageDom.innerHTML = "";
    this.background.classList.remove('notice');
}

var Timer = function (seconds,task){
    this.display = document.querySelector('.timer-area');
    this.seconds = seconds;
    this.remaining = seconds;
    this.start = null;
    this.end = null;
    this.counter = null;
    this.task = task;
    
};
Timer.prototype.init = function(){
    if(this.task){
        this.displayTime();
        this.start = Date.now();
        this.end = this.start + this.seconds * 1000;
        this.countdown();
    }
    else
        console.log('set task first');

    return this;
    
};
Timer.prototype.countdown = function(){
    var self = this;
    this.counter = setInterval(function(){
        var timeLeft = Math.round( (self.end - Date.now()) / 1000 );
        self.remaining = timeLeft;
        if( timeLeft < 0 ){
            clearInterval(self.counter);
            self.finished();
            return;
        }
        self.displayTime();
    }, 1000);
};
Timer.prototype.finished = function(){
    this.reset();
    if(this.task == "break")
        _pubsub.pub("finished-break");
    else
        _pubsub.pub("finished-pomo", this.task);
};
Timer.prototype.pause = function(){
    clearInterval(this.counter);
};
Timer.prototype.resume = function(){
    this.start = Date.now();
    this.end = this.start + this.remaining * 1000;
    this.countdown();
};
Timer.prototype.reset = function(){
    clearInterval(this.counter);
    this.remaining = this.seconds;
    this.start = null;
    this.end = null;
    this.counter = null;
    this.display.innerHTML = "";
};
Timer.prototype.displayTime = function(){
    var min = Math.floor(this.remaining / 60);
    var seconds = this.remaining % 60;
    this.display.innerHTML = min + ":" + (seconds < 10 ? "0" : "") + seconds; 
}