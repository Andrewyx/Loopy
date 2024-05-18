export default class GoogleMaps {
    static #instance;

    constructor() {
        // ASSIGN FIELDS HERE
    }

    /**
     * Instantiates the GoogleMaps object or gets the single instance of it
     */
    static getInstance() {
        if (this.#instance) {
            return this.#instance;
        }
        else {
            this.#instance = new Firebase();
            return this.#instance; 
        }
    }

    /**
     * Returns true if GoogleMaps object exists, otherwise false
     * 
     * @returns boolean
     */
    static isInstaniated() {
        if (this.#instance) {
            return true;
        }
        else {
            return false;
        }
    }    
}