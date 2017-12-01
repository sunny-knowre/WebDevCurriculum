var Notepad = function() {
	var uid = 0;
	var editor = document.querySelector('.editor');
	var filenav = document.querySelector('.file-list');
	
	editor.addEventListener('keydown', function(e) {
		if(e.keyCode == 13 && e.metaKey) {
			var note = new Note("note-"+uid++, this.value);
		}
	});

	document.addEventListener('documentSave', function(e) {
		console.log('saved!');
	});
	document.addEventListener('documentSaveError', function(e) {
		console.log('something went wrong');
	});
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
};
Notepad.prototype.init = function(){
	
}
Notepad.prototype.getAllNotes = function(){

}

var Note = function(id,data){
	this.id = id;
	this.state = null;
	this.title = this.getTitle(data);
	this.sendData(data);
	
}

Note.prototype.createDom = function(){

}
Note.prototype.getTitle = function(data){
	var title = data.split('\n')[0];
	if(title.length > 70)
		title = title.substring(0,70);

	return title;
}
Note.prototype.sendData = function(data){
	var xhttp  = new XMLHttpRequest();
	var params = {
		id   : this.id,
		title: this.title,
		data : data
	};

	xhttp.onreadystatechange = function() {
		var event = document.createEvent('Event');		
		if(xhttp.readyState == 4 && xhttp.status == 200)
			event.initEvent('documentSave', true, true);
		else
			event.initEvent('documentSaveError', true, true);	

		document.dispatchEvent(event);
	}
	
	xhttp.open("POST", "http://localhost:8080/newfile", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(params));
}
