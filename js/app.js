var Simptom = /** @class */ (function () {
    function Simptom(naziv) {
        this.naziv = naziv;
    }
    return Simptom;
}());
/// <reference path="Simptom.ts" />
var Pacijent = /** @class */ (function () {
    function Pacijent(id, ime, prezime, telesnaTemperatura, pcrTest) {
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }
    Object.defineProperty(Pacijent.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ime", {
        /**
         * Getter ime
         * @return {string}
         */
        get: function () {
            return this._ime;
        },
        /**
         * Setter ime
         * @param {string} value
         */
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "prezime", {
        /**
         * Getter prezime
         * @return {string}
         */
        get: function () {
            return this._prezime;
        },
        /**
         * Setter prezime
         * @param {string} value
         */
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "telesnaTemperatura", {
        /**
         * Getter telesnaTemperatura
         * @return {number}
         */
        get: function () {
            return this._telesnaTemperatura;
        },
        /**
         * Setter telesnaTemperatura
         * @param {number} value
         */
        set: function (value) {
            this._telesnaTemperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "pcrTest", {
        /**
         * Getter pcrTest
         * @return {string}
         */
        get: function () {
            return this._pcrTest;
        },
        /**
         * Setter pcrTest
         * @param {string} value
         */
        set: function (value) {
            this._pcrTest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ostaliSimptomi", {
        /**
         * Getter ostaliSimptomi
         * @return {Simptom[]}
         */
        get: function () {
            return this._ostaliSimptomi;
        },
        /**
         * Setter ostaliSimptomi
         * @param {Simptom[]} value
         */
        set: function (value) {
            this._ostaliSimptomi = value;
        },
        enumerable: false,
        configurable: true
    });
    Pacijent.prototype.dodajSimptom = function (simptom) {
        this._ostaliSimptomi.push(simptom);
    };
    return Pacijent;
}());
/// <reference path="Pacijent.ts" />
var Bolnica = /** @class */ (function () {
    function Bolnica(naziv, grad) {
        this._naziv = naziv;
        this._grad = grad;
        this._pacijenti = [];
    }
    Object.defineProperty(Bolnica.prototype, "naziv", {
        /**
         * Getter naziv
         * @return {string}
         */
        get: function () {
            return this._naziv;
        },
        /**
         * Setter naziv
         * @param {string} value
         */
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "grad", {
        /**
         * Getter grad
         * @return {string}
         */
        get: function () {
            return this._grad;
        },
        /**
         * Setter grad
         * @param {string} value
         */
        set: function (value) {
            this._grad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "pacijenti", {
        /**
         * Getter pacijenti
         * @return {Pacijent[]}
         */
        get: function () {
            return this._pacijenti;
        },
        /**
         * Setter pacijenti
         * @param {Pacijent[]} value
         */
        set: function (value) {
            this._pacijenti = value;
        },
        enumerable: false,
        configurable: true
    });
    Bolnica.prototype.refreshHTML = function () {
        var outString = "";
        for (var i = 0; i < this._pacijenti.length; i++) {
            outString += "<tr>";
            outString += "<td>" + this._pacijenti[i].id + "</td?>";
            outString += "<td>" + this._pacijenti[i].ime + "</td?>";
            outString += "<td>" + this._pacijenti[i].prezime + "</td?>";
            outString += "<td>" + this._pacijenti[i].telesnaTemperatura + "</td?>";
            outString += "<td>" + this._pacijenti[i].pcrTest + "</td?>";
            outString += "<td><ul>";
            for (var j = 0; j < this._pacijenti[i].ostaliSimptomi.length; j++) {
                outString += "<li>" + this._pacijenti[i].ostaliSimptomi[j].naziv + "</li>";
            }
            outString += "</ul></td>";
            outString += "</tr>";
        }
        document.getElementById("tbody").innerHTML = outString;
    };
    Bolnica.prototype.dodajPacijenta = function (value) {
        this._pacijenti.push(value);
    };
    Bolnica.prototype.procentualnoObolelih = function () {
        var oboleli = this._pacijenti.filter(function (el) { return el.pcrTest == "Pozitivan"; });
        var prosek = (oboleli.length / this._pacijenti.length) * 100;
        return prosek;
    };
    Bolnica.prototype.oboleliBezSimptoma = function () {
        var oboleli = this._pacijenti.filter(function (el) { return el.pcrTest == "Pozitivan" && el.ostaliSimptomi.length == 0; });
        var procenat = (oboleli.length / this._pacijenti.length) * 100;
        return procenat;
    };
    return Bolnica;
}());
/// <reference path="Bolnica.ts" />
var bolnice = [];
var aktivnaBolnica = null;
function promeniAktivnu(selekt) {
    aktivnaBolnica = bolnice.filter(function (el) { return el.naziv == selekt.value; })[0];
    aktivnaBolnica.refreshHTML();
}
function wireEvents() {
    document.getElementById("dodajSimptom").addEventListener("click", function () {
        var id = Number(document.getElementById("ids").value);
        var simptom = document.getElementById("simptom").value;
        var s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(function (el) { return el.id == id; })[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });
    //TODO "Dodaj pacijenta"
    document.getElementById("dodajPacijenta").addEventListener("click", function () {
        var id = aktivnaBolnica.pacijenti.length + 1;
        var ime = document.getElementById("ime").value;
        var prezime = document.getElementById("prezime").value;
        var temperatura = document.getElementById("temperatura").value;
        var test = document.getElementById("test").value;
        var noviPacijent = new Pacijent(id, ime, prezime, Number(temperatura), test);
        aktivnaBolnica.dodajPacijenta(noviPacijent);
        aktivnaBolnica.refreshHTML();
    });
    //TODO "Procentualno obolelih"
    document.getElementById("procenat").addEventListener("click", function () {
        var podaci = document.getElementById("podaci");
        podaci.innerHTML = "<h2>Procenutalan broj obolelih u bolnici " + aktivnaBolnica.naziv + " je " + aktivnaBolnica.procentualnoObolelih().toFixed(2) + "%<h2>";
    });
    //TODO "Procentualno obolelih koji nemaju simptome"
    document.getElementById("bezSimptoma").addEventListener("click", function () {
        var sviPacijenti = [];
        for (var i in bolnice) {
            for (var j in bolnice[i].pacijenti) {
                sviPacijenti.push(bolnice[i].pacijenti[j]);
            }
        }
        var oboleli = sviPacijenti.filter(function (el) { return el.pcrTest == "Pozitivan"; });
        var oboleliBez = sviPacijenti.filter(function (el) { return el.pcrTest == "Pozitivan" && el.ostaliSimptomi.length == 0; });
        var procenat = (oboleliBez.length / oboleli.length) * 100;
        var podaci = document.getElementById("podaci");
        podaci.innerHTML = "<h2>Procentualan broj obolelih koji nemaju simptome je: " + procenat.toFixed(2) + "%</h2>";
    });
    //TODO "Grad sa najvise pozitivnih"
    document.getElementById("gradPozitivni").addEventListener("click", function () {
        //lista svih gradova
        var sviGradovi = [];
        for (var i in bolnice) {
            sviGradovi.push(bolnice[i].grad);
        }
        //pozitivni pacijenti i izlistavamo samo grad u kojem se nalazi 
        var pozitivni = [];
        for (var i = 0; i < bolnice.length; i++) {
            for (var j in bolnice[i].pacijenti) {
                if (bolnice[i].pacijenti[j].pcrTest == "Pozitivan") {
                    pozitivni.push(bolnice[i].grad);
                }
            }
        }
        //sortirani 
        pozitivni.sort();
        //prolazak kroz listu pozitivnih kako bih nasla koji grad se najvise pojavljuje
        var itemsMap = {};
        var maxValue = 0;
        var maxCount = 0;
        for (var _i = 0, pozitivni_1 = pozitivni; _i < pozitivni_1.length; _i++) {
            var i = pozitivni_1[_i];
            if (itemsMap[i] == null) {
                itemsMap[i] = 1;
            }
            else {
                itemsMap[i]++;
            }
            if (itemsMap[i] > maxCount) {
                maxValue = i;
                maxCount = itemsMap[i];
            }
        }
        var podaci = document.getElementById("podaci");
        podaci.innerHTML = "<h2>Grad sa najvise pozitivnih pacijenata je:  " + maxValue + "!</h2>";
    });
}
window.onload = function () {
    //KOD TESTIRATI OVDE
    //^^^^^^^^^^^^^^^^^^
    //Po potrebi zakomentarisati initializeData();
    initializeData();
    wireEvents();
};
function initializeData() {
    var bol = window.bol;
    var selekt = document.getElementById("bolnica");
    for (var i = 0; i < bol.length; i++) {
        var naziv = bol[i].naziv;
        var grad = bol[i].grad;
        var pacijenti = [];
        for (var j = 0; j < bol[i].pacijenti.length; j++) {
            var id = Number(bol[i].pacijenti[j].id);
            var ime = bol[i].pacijenti[j].ime;
            var prezime = bol[i].pacijenti[j].prezime;
            var temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            var pcrTest = bol[i].pacijenti[j].pcrTest;
            var simptomi = [];
            for (var k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                var s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }
            var p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        var b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        var option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}
//# sourceMappingURL=app.js.map