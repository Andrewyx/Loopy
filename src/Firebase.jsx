import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'dotenv/config'

/**
 * Singleton for all Firebase-related tasks and information
 */

export default class Firebase {
    static #instance;
    #app;
    #auth;
    #db;
    #firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: "loopy-423720.firebaseapp.com",
        projectId: "loopy-423720",
        storageBucket: "loopy-423720.appspot.com",
        messagingSenderId: "386160874263",
        appId: "1:386160874263:web:8900e555007196181d1d52"
    };
    

    constructor() {
        this.#app = initializeApp(this.#firebaseConfig);
        this.#db = getFirestore(this.#app);
        this.#auth = getAuth();   
    }

    /**
     * Instantiates the Firebase object or gets the single instance of it
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
     * Returns true if Firebase object exists, otherwise false
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

    /**
     * Getter for Firebase auth instance
     * 
     * @returns Auth for Firebase Instance
     */
    getAuth() {
        return this.#auth;
    }

    /**
     * Getter for Cloud Firestore Database
     * 
     * @returns Firestore Database
     */
    getDatabase() {
        return this.#db;
    }

    
}