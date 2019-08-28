var mainHead = document.createElement('div');

var mainButtonStop = document.createElement('button');
mainButtonStop.textContent = 'Stop images'
mainButtonStop.onclick = mainIntervalStop
mainHead.appendChild(mainButtonStop)

var mainButtonStart = document.createElement('button');
mainButtonStart.textContent = 'Start images'
mainButtonStart.onclick = mainIntervalStart
mainHead.appendChild(mainButtonStart)

document.body.prepend(mainHead)

var listd = [...document.getElementsByClassName('file')]
	.filter(e=>e.href.toLowerCase().includes('.dxf')||e.href.toLowerCase().includes('.tap')||e.href.toLowerCase().includes('.zip')).reverse()
	
function nextImage() {
	let listdPOP= listd.pop()
	if(!listdPOP){mainIntervalStop();console.log('reached the end of the list of files');return;}
		
	if(listdPOP.href.toLowerCase().includes('.dxf')){
		fetchAsync(listdPOP.href, listdPOP,'dxf')	
	}
	if(listdPOP.href.toLowerCase().includes('.tap')){
		fetchAsync(listdPOP.href, listdPOP,'tap')	
	}
	if(listdPOP.href.toLowerCase().includes('.zip')){
		fetchAsync(listdPOP.href, listdPOP,'zip')	
	}
}

var mainIntervalID;
function mainIntervalStart() {
	window.clearInterval(mainIntervalID);
	mainIntervalID = window.setInterval(nextImage, 200);
}
mainIntervalStart() //autoplay best way
function mainIntervalStop() {
	window.clearInterval(mainIntervalID);
}