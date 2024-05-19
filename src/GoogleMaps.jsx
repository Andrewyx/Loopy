const { RoutesClient } = require('@googlemaps/routing').v2;

export default class GoogleMaps {
    static #instance;
    #routingClient;

    constructor() {
        this.#routingClient = new RoutesClient({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
    }

    /**
     * Instantiates the GoogleMaps object or gets the single instance of it
     */
    static getInstance() {
        if (this.#instance) {
            return this.#instance;
        }
        else {
            this.#instance = new GoogleMaps();
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

    async callComputeRoutes(origin, destination) {
        try {
            const response = await this.#routingClient.computeRoutes({
                origin: origin,
                destination: destination,
                mode: 'transit',
                
            });
            return response;
        } catch (error) {
            console.error('Error in callComputeRoutes:', error);
        }
    }
}