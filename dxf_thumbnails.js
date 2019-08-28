var mainStyle = document.createElement('style');
mainStyle.textContent = `
	svg.dxf {
		max-width:100px;
		max-height:100px;
	}
	path {
		stroke-width:2%;
	}
	img.gcode {
		margin:auto;
		max-width:100px;
		max-height:100px;
	}
	a {
		white-space:normal;
	}
	`
document.body.appendChild(mainStyle)

async function fetchAsync (url,elem,type) {
	let response = await fetch(url);
	let file = await response.blob();
	if (type === "zip" || file.type==="application/x-zip-compressed"){
		await fileZipRe(file,elem);
	}else{
		await fileRe(file,elem,type);
	}
}

async function fileZipRe (ii,elem) {
	let unzip = await JSZip.loadAsync(ii);
	let dxfList = await unzip.file(/\.dxf$/i);
	let tapList = await unzip.file(/\.tap$/i);
	dxfList.map(e=> e.async('text').then((text)=>convertDataDXF(text,elem)))
	tapList.map(e=> e.async('text').then((text)=>convertDataTAP(text,elem)))
}

function fileRe(ii,elem,type) {
	var reader = new FileReader();
	reader.onloadend = function () {
		if(type==='dxf'){convertDataDXF(reader.result,elem)}
		if(type==='tap'){convertDataTAP(reader.result,elem)}
	}
	if (ii) {reader.readAsText(ii)}
};

function convertDataTAP(data,elem){
	let gparsed = gcodetogeometry.parse(data)
	let imgEle= document.createElement('img')
	imgEle.src = getBase64Jpeg80(gparsed.gcode.join('\n'),{G1:'#001122',G2G3:"#001122"},gparsed.size.max.x*10,gparsed.size.max.y*10)
	imgEle.setAttribute('class','gcode')
	elem.appendChild(imgEle)
}

function convertDataDXF(data,elem){
	let dxfString= dxf.parseString(data)
	let svgString= dxf.toSVG(dxfString).slice(22)
	let svgEle=	new window.DOMParser().parseFromString(svgString, "text/xml").documentElement
	svgEle.setAttribute('class','dxf')
	elem.appendChild(svgEle)
}

window.addEventListener("contextmenu", function(e){
	if(e.ctrlKey && e.button ==2){
		if(e.target.href.toLowerCase().includes('.dxf')){
			fetchAsync(e.target.href, e.target,'dxf')	
		}
		if(e.target.href.toLowerCase().includes('.tap')){
			fetchAsync(e.target.href, e.target,'tap')	
		}
		if(e.target.href.toLowerCase().includes('.zip')){
			fetchAsync(e.target.href, e.target,'zip')	
		}
	};
});

