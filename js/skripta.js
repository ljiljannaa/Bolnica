var boje = {
	rucak: "Crimson",
	pice: "Teal"
};
var osobe = [{ime: "Pera", prezime: "Peric"}, {ime: "Marko", prezime: "Markovic"}, 
					{ime: "Jovo", prezime:"Jovic"}];
function proveraForme(forma){
	retVal = true;

	let ime = forma.ime.value.trim();
	if (ime == "" || ime.charAt(0) != ime.charAt(0).toUpperCase()){
			retVal = false;
			alert("Moraju biti popunjena sva polja. Ime mora poceti velikim slovom.")
	}

	let prezime = forma.prezime.value.trim();
	if (prezime == "" || prezime.charAt(0) != prezime.charAt(0).toUpperCase()){
		retVal = false;
		alert("Moraju biti popunjena sva polja. Prezime mora poceti velikim slovom.")
	}
	let osoba = false;
	for(let i in osobe){
		if(osobe[i].ime == ime && osobe[i].prezime == prezime){
		osoba= true;	
		}	
	}
	
	if(osoba == false){
		retVal = false;
		alert("Ime i prezime moraju biti iz niza.")
	}

	return retVal;

}


function membership(premium){
	var sel1 = document.getElementById("sel1");
	var sel2 = document.getElementById("sel2");
	var poruka = document.getElementById("poruka");
	var paragraf = document.getElementById("select_paragraf");
	var btn = document.getElementById("submitbtn");
	if(premium.checked){
		sel1.disabled = false;
		
	} else{
		sel1.disabled = true;
		sel2.disabled =true;
		sel2.style.visibility = "hidden";
		poruka.innerHTML = "";
		paragraf.style.backgroundColor = 'initial';
		btn.style.backgroundColor = 'initial';	
	}
	platinum();
	
}

function platinum(select){
	var sel2 = document.getElementById("sel2");
	var poruka = document.getElementById("poruka");
	var paragraf = document.getElementById("select_paragraf");
	var btn = document.getElementById("submitbtn");
	if(select.value == "3"){
			sel2.disabled = false;
			sel2.style.visibility = "visible";
			poruka.innerHTML = "";
			selektovano(sel2);
	} else {
		sel2.disabled = true;
		sel2.style.visibility = "hidden";			
		poruka.innerHTML = "";
		paragraf.style.backgroundColor = 'initial';
		btn.style.backgroundColor = 'initial';		
	}	
}

function selektovano(sel){
	var poruka = document.getElementById("poruka");
	var paragraf = document.getElementById("select_paragraf");
	var btn = document.getElementById("submitbtn");
	if(sel.value == "rucak"){
		poruka.textContent = sel.value;
		paragraf.style.backgroundColor = boje.rucak;
		btn.style.backgroundColor = boje.rucak;
	} else if(sel.value == "pice"){
		poruka.textContent = sel.value;
		paragraf.style.backgroundColor = boje.pice;
		btn.style.backgroundColor = boje.pice;
	} 
}








