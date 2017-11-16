var Desktop = function(dom, iconCount, folderCount) {			
	this.dom = dom;
	var dragging = null;	// keep track of dragging object
	this.windowList = [];   // keep list of folder windows hidden

	function addItem(item,name){
		// add item to desktop	
	}

	function initialize(iconCount,folderCount){
		for(var i=0; i<iconCount; i++){
			addItem("icon","icon-"+i);
		}
		for(var i=0; i<folderCount; i++){
			addItem("folder","folder-"+i);
		}
		// use counts to set up desktop
	};
		
	// event handler
	function handleEvent(event){
		var target = event.target;
		switch(event.type){
			case "mousedown":
				// handle mouse down event set dragging to target
				break;

			case "mousemove":
				if (dragging !== null){
					//assign location
				} 
				break;

			case "mouseup":
				dragging = null;	// reset dragging
				break;

			case "dblclick":
				// fire opening window event
			
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

var Icon = function(name) {
	var newDom = // make html element
	this.name = name ? name : "";
	this.dom = newDom;
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};

var Folder = function(name) {
	var newDom = // make html element
	this.name = name ? name : "";
	this.dom = newDom;		
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};

var Window = function(name) {
	var newDom = // make html element
	this.name = name ? name : "";
	this.dom = newDom;
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Window.prototype.showWindow(){
	// do stuff to show window
}