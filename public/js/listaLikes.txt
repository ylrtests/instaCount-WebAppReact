
function openAnchor() {
	//document.getElementsByTagName('a')[3].click();
	let anchors = document.getElementsByTagName('a')
	
	for (let element of anchors){
		if(element.getAttribute("href").startsWith("/p/")){
			element.click()
			break
		}
	}
}

var offset = 0;
var tempOffset = 0;
var flag = 0;

openAnchor();

window.onscroll = function () {
	var d = document.documentElement;
	offset = d.scrollTop + window.innerHeight;
};

var intervalo = setInterval(function () {

	if (offset === tempOffset) {
		flag++;
		if (flag >= 20) {
			console.log("Ya obtuve todos los usuarios...")
			clearInterval(intervalo);
			obtenerLista();
		}
	}
	else {
		flag = 0;
	}

	tempOffset = offset;
	window.scrollTo(0, document.body.scrollHeight);
	console.log('Estoy haciendo Scroll... Flag:' + flag);

}, 500);

function obtenerLista() {
	
	var mainarray = document.getElementsByTagName("main")[0];
	var nodos = mainarray.children[0].children[0].children;

	var usersList = [];


	for (let i = 0; i < nodos.length; i++) {
		var temp = nodos[i].children[1].children[0].innerText;
		usersList.push(temp);
	}

	var jsonObject = {
		"id_insta": window.location.pathname.substring(3).split('/liked_by/')[0],
		"fansUsernames": usersList
	}

	jsonObject = JSON.stringify(jsonObject);
	console.log(jsonObject);
}
