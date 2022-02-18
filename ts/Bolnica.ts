/// <reference path="Pacijent.ts" />

class Bolnica {
    private _naziv: string;
    private _grad: string;
    private _pacijenti: Pacijent[];

	constructor(naziv: string, grad: string) {
		this._naziv = naziv;
		this._grad = grad;
		this._pacijenti = [];
	}

    /**
     * Getter naziv
     * @return {string}
     */
	public get naziv(): string {
		return this._naziv;
	}

    /**
     * Getter grad
     * @return {string}
     */
	public get grad(): string {
		return this._grad;
	}

    /**
     * Getter pacijenti
     * @return {Pacijent[]}
     */
	public get pacijenti(): Pacijent[] {
		return this._pacijenti;
	}

    /**
     * Setter naziv
     * @param {string} value
     */
	public set naziv(value: string) {
		this._naziv = value;
	}

    /**
     * Setter grad
     * @param {string} value
     */
	public set grad(value: string) {
		this._grad = value;
	}

    /**
     * Setter pacijenti
     * @param {Pacijent[]} value
     */
	public set pacijenti(value: Pacijent[]) {
		this._pacijenti = value;
	}

    public refreshHTML(): void {
        let outString: string = "";
        for (let i = 0; i < this._pacijenti.length; i++)
         {
            outString += `<tr>`;
            outString += `<td>${this._pacijenti[i].id}</td?>`;
            outString += `<td>${this._pacijenti[i].ime}</td?>`;
            outString += `<td>${this._pacijenti[i].prezime}</td?>`;
            outString += `<td>${this._pacijenti[i].telesnaTemperatura}</td?>`;
            outString += `<td>${this._pacijenti[i].pcrTest}</td?>`;
            outString += `<td><ul>`;
            for (let j = 0; j < this._pacijenti[i].ostaliSimptomi.length; j++) {
                outString += `<li>${this._pacijenti[i].ostaliSimptomi[j].naziv}</li>`;
            }
            outString += `</ul></td>`;
            outString += `</tr>`;
        }

        document.getElementById("tbody").innerHTML = outString;
    }

    public dodajPacijenta(value: Pacijent): void {
        this._pacijenti.push(value);
    }

    public procentualnoObolelih(): number {
        let oboleli = this._pacijenti.filter(el => el.pcrTest == "Pozitivan");
        let prosek = (oboleli.length / this._pacijenti.length) * 100;
        return prosek;
    }

    public oboleliBezSimptoma(): number{
        let oboleli = this._pacijenti.filter(el => el.pcrTest == "Pozitivan" && el.ostaliSimptomi.length == 0);
        let procenat = (oboleli.length/this._pacijenti.length)*100;
        return procenat;
    }
}