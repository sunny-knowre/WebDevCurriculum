var Desktop = function(dom, iconCount, folderCount) {
	var uid = 0;
	var dragging = null;
	var zIndex = 100;
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
			var winName = "window-" + name;
			var newFolder = new Folder(name,dom);
			itemList[name] = newFolder;
			itemList[winName] = newFolder.window;
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
		var item = itemList[target.id];
		
		switch(event.type){
			case "mousedown":
				if( item && target.className.indexOf("draggable") > -1 ){
					dragging = item;
					item.dom.style.zIndex = zIndex++;
					diffX = (event.pageX + item.margin) - item.dom.offsetLeft;
					diffY = (event.pageY + item.margin) - item.dom.offsetTop;
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
				if(!(item.window === "undefined")){
					item.window.dom.style.display = "block";	
					item.window.titleBar.classList.add("draggable");
					item.window.dom.style.zIndex = zIndex++;
				}
			break;
		}
	}
	// attach listeners
	document.addEventListener("dblclick",handleEvent,false);
	document.addEventListener("mousedown",handleEvent,false);
	document.addEventListener("mouseup",handleEvent,false);
	document.addEventListener("mousemove",handleEvent,false);
	initialize(iconCount,folderCount);
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};

var Icon = function(name, desktop) {
	this.type = "icon";
	this.name = name;
	this.desktop = desktop;
	this.dom = this.makeDom();
	this.dom.setAttribute("id",this.name);
	this.dom.innerHTML = this.name;
	this.dom.classList.add("draggable");

	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Icon.prototype = {
	"margin" : 10,
	"makeDom" : function(){
		var newDiv = document.createElement('div'); 
		newDiv.style.margin = this.margin + "px";
		newDiv.classList.add(this.type);
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
	this.dom.setAttribute("id",this.name);
	this.dom.classList.add("draggable");
	this.dom.innerHTML = this.name;
	this.window = new Window(name,desktop);
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Folder.prototype = Object.create(Icon.prototype);
Folder.prototype.constructor = Folder;

var Window = function(name,desktop) {
	this.type = "window";
	this.name = name;
	this.desktop = desktop;
	this.margin = 0;
	this.dom = this.makeDom();
	
	var titleDiv = document.createElement('div');	
	titleDiv.classList.add("title-bar");
	titleDiv.innerHTML = this.name;
	titleDiv.setAttribute("id", "window-" + this.name);		
	this.dom.appendChild(titleDiv);
	this.titleBar = titleDiv;
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Window.prototype = Object.create(Icon.prototype);
Window.prototype.constructor = Window;