/// <reference path="Bolnica.ts" />


let bolnice: Bolnica[] = [];
let aktivnaBolnica: Bolnica = null;

function promeniAktivnu(selekt: HTMLSelectElement): void {
    aktivnaBolnica = bolnice.filter(el => el.naziv == selekt.value)[0];
    aktivnaBolnica.refreshHTML();
}

function wireEvents(): void {

    document.getElementById("dodajSimptom").addEventListener("click", () => {
        let id = Number((document.getElementById("ids") as HTMLInputElement).value);
        let simptom = (document.getElementById("simptom") as HTMLSelectElement).value;
        let s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(el => el.id == id)[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });

    //TODO "Dodaj pacijenta"

    document.getElementById("dodajPacijenta").addEventListener("click", () => {
        let id = aktivnaBolnica.pacijenti.length + 1;
        let ime = (document.getElementById("ime") as HTMLInputElement).value;
        let prezime = (document.getElementById("prezime") as HTMLInputElement).value;
        let temperatura = (document.getElementById("temperatura") as HTMLInputElement).value;
        let test = (document.getElementById("test") as HTMLSelectElement).value;

        let noviPacijent: Pacijent = new Pacijent(id, ime, prezime, Number(temperatura), test);
        aktivnaBolnica.dodajPacijenta(noviPacijent);
        aktivnaBolnica.refreshHTML();
    });



    //TODO "Procentualno obolelih"

    document.getElementById("procenat").addEventListener("click", () => {
        let podaci = document.getElementById("podaci") as HTMLDivElement;
        podaci.innerHTML = `<h2>Procenutalan broj obolelih u bolnici ${aktivnaBolnica.naziv} je ${aktivnaBolnica.procentualnoObolelih().toFixed(2)}%<h2>`
    });

    //TODO "Procentualno obolelih koji nemaju simptome"

    document.getElementById("bezSimptoma").addEventListener("click", () => { 
        let sviPacijenti: Pacijent[] = [];
        for(let i in bolnice){
            for(let j in bolnice[i].pacijenti){
                sviPacijenti.push(bolnice[i].pacijenti[j]);
            }
        }

        let oboleli = sviPacijenti.filter(el => el.pcrTest == "Pozitivan");
        let oboleliBez = sviPacijenti.filter(el => el.pcrTest == "Pozitivan" && el.ostaliSimptomi.length == 0);
        let procenat = (oboleliBez.length / oboleli.length)* 100;

        let podaci = document.getElementById("podaci") as HTMLDivElement;
        podaci.innerHTML =`<h2>Procentualan broj obolelih koji nemaju simptome je: ${procenat.toFixed(2)}%</h2>`;
    });

    //TODO "Grad sa najvise pozitivnih"

    document.getElementById("gradPozitivni").addEventListener("click", () => {
        //lista svih gradova
        let sviGradovi = [];
        for(let i in bolnice){
            sviGradovi.push(bolnice[i].grad)
        }
        //pozitivni pacijenti i izlistavamo samo grad u kojem se nalazi 
        let pozitivni = [];
        for(let i = 0; i < bolnice.length; i++){
            for(let j in bolnice[i].pacijenti){
                if(bolnice[i].pacijenti[j].pcrTest == "Pozitivan"){
                    pozitivni.push(bolnice[i].grad)
                }
            }

        }
        //sortirani 
        pozitivni.sort()
        //prolazak kroz listu pozitivnih kako bih nasla koji grad se najvise pojavljuje

        let itemsMap = {};
        let maxValue = 0;
        let maxCount = 0;
        for (let i of pozitivni) {
            if (itemsMap[i] == null) {
                itemsMap[i] = 1;
            } else {
                itemsMap[i]++;
            }
            if (itemsMap[i] > maxCount) {
                maxValue = i;
                maxCount = itemsMap[i];
            }
        }
        let podaci = document.getElementById("podaci") as HTMLDivElement;
        podaci.innerHTML = `<h2>Grad sa najvise pozitivnih pacijenata je:  ${maxValue}!</h2>`

    });
}


window.onload = () => {
    //KOD TESTIRATI OVDE




    //^^^^^^^^^^^^^^^^^^
    //Po potrebi zakomentarisati initializeData();
    initializeData();
    wireEvents();
}

function initializeData() {
    let bol = (window as any).bol;
    let selekt = document.getElementById("bolnica") as HTMLSelectElement;
    for (let i = 0; i < bol.length; i++) {
        let naziv = bol[i].naziv;
        let grad = bol[i].grad;
        let pacijenti: Pacijent[] = [];
        for (let j = 0; j < bol[i].pacijenti.length; j++) {
            let id = Number(bol[i].pacijenti[j].id);
            let ime = bol[i].pacijenti[j].ime;
            let prezime = bol[i].pacijenti[j].prezime;
            let temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            let pcrTest = bol[i].pacijenti[j].pcrTest;
            let simptomi: Simptom[] = [];

            for (let k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                let s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }

            let p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        let b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        let option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}