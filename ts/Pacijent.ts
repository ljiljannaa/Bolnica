/// <reference path="Simptom.ts" />
class Pacijent{
    private _id: number;
    private _ime: string;
    private _prezime: string;
    private _telesnaTemperatura: number;
    private _pcrTest: string;
    private _ostaliSimptomi: Simptom[];
	constructor(id: number, ime: string, prezime: string, telesnaTemperatura: number, pcrTest: string) {
        this._id = id;
		this._ime = ime;
		this._prezime = prezime;
		this._telesnaTemperatura = telesnaTemperatura;
		this._pcrTest = pcrTest;
		this._ostaliSimptomi = [];

    }


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Getter ime
     * @return {string}
     */
	public get ime(): string {
		return this._ime;
	}

    /**
     * Setter ime
     * @param {string} value
     */
	public set ime(value: string) {
		this._ime = value;
	}

    /**
     * Getter prezime
     * @return {string}
     */
	public get prezime(): string {
		return this._prezime;
	}

    /**
     * Setter prezime
     * @param {string} value
     */
	public set prezime(value: string) {
		this._prezime = value;
	}

    /**
     * Getter telesnaTemperatura
     * @return {number}
     */
	public get telesnaTemperatura(): number {
		return this._telesnaTemperatura;
	}

    /**
     * Setter telesnaTemperatura
     * @param {number} value
     */
	public set telesnaTemperatura(value: number) {
		this._telesnaTemperatura = value;
	}

    /**
     * Getter pcrTest
     * @return {string}
     */
	public get pcrTest(): string {
		return this._pcrTest;
	}

    /**
     * Setter pcrTest
     * @param {string} value
     */
	public set pcrTest(value: string) {
		this._pcrTest = value;
	}

    /**
     * Getter ostaliSimptomi
     * @return {Simptom[]}
     */
	public get ostaliSimptomi(): Simptom[] {
		return this._ostaliSimptomi;
	}

    /**
     * Setter ostaliSimptomi
     * @param {Simptom[]} value
     */
	public set ostaliSimptomi(value: Simptom[]) {
		this._ostaliSimptomi = value;
	}

    public dodajSimptom(simptom: Simptom): void {
        this._ostaliSimptomi.push(simptom);
        
    }


}

