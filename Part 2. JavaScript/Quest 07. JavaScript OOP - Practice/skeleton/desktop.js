var Desktop = function(dom, iconCount, folderCount) {
	var uid = 0;
	var dragging = null;
	var zIndex = 100;
	var windowList = [];
	var itemList = [];
	
	var diffX = 0;
	var diffY = 0;
	
	this.dom = dom;

	function addItem(item){
		if(item === "icon"){
			var name = "icon" + uid++;
			var newIcon = new Icon(name,dom);
			itemList[name] = newIcon;
		} else if (item === "folder"){
			var name = "folder" + uid++;
			var newFolder = new Folder(name,dom);
			itemList[name] = newFolder;
		}
		// add item to desktop	
	}	

	function initialize(iconCount,folderCount){
		for(var i=0; i<iconCount; i++){
			addItem("icon");
		}
		for(var i=0; i<folderCount; i++){
			addItem("folder");
		}
		// use counts to set up desktop
	};
		
	// event handler
	function handleEvent(event){
		var target = event.target;
		var item = itemList[target.dataset.id];
		switch(event.type){
			case "mousedown":
				if(target.dataset.id in itemList && target.className.indexOf("draggable") > -1 ){
					dragging = item;
					diffX = (event.clientX+10) - target.offsetLeft;
					diffY = (event.clientY+10) - target.offsetTop;
				}
				break;

			case "mousemove":
				if (dragging !== null){
					//assign location
					dragging.move((event.pageX - diffX), (event.pageY - diffY));
				} 
				break;

			case "mouseup":
				dragging = null;
				break;

			case "dblclick":
				console.log(self.itemList);	
				console.log("dblclick");
				
			break;
		}
	}
	// attach listeners
	this.dom.addEventListener("dblclick",handleEvent,false);
	this.dom.addEventListener("mousedown",handleEvent,false);
	this.dom.addEventListener("mouseup",handleEvent,false);
	this.dom.addEventListener("mousemove",handleEvent,false);
	initialize(iconCount,folderCount);
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};

var Icon = function(name, desktop) {
	this.type = "icon";
	this.name = name;
	this.desktop = desktop;
	this.dom = this.makeDom()

	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Icon.prototype = {
	"makeDom" : function(){
		var newDiv = document.createElement('div'); 
		newDiv.classList.add(this.type);
		newDiv.classList.add("draggable");
		newDiv.style.left = "55px";
		newDiv.innerHTML = this.type;
		newDiv.dataset.id = this.name;		
		this.desktop.appendChild(newDiv);
		return newDiv;
	},
	"move" : function(x,y){
		this.dom.style.position = "absolute";
		this.dom.style.left = x + "px";
		this.dom.style.top = y + "px";
	}
}

var Folder = function(name,desktop) {
	this.type = "folder";
	this.name = name;
	this.desktop = desktop;
	this.dom = this.makeDom();
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Folder.prototype = Object.create(Icon.prototype);
Folder.prototype.constructor = Folder;

var Window = function(name,desktop) {
	this.dom;
	this.name = name;
	this.desktop = desktop;
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Window.prototype = Object.create(Icon.prototype);
Window.prototype.constructor = Window;