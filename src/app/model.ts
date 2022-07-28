export class StateRef{
    constructor(
        public stateName: string,
        public cities: Cities[] 
    ){
        this.stateName = "";
        this.cities = []
    }
}

export class Cities {
    constructor(
    public name: string
    ){
        this.name = ""
    }
}