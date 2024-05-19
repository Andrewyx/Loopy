import { initializeApp } from "firebase/app";
import { getFirestore, doc, runTransaction, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'dotenv/config'

/**
 * Singleton for all Firebase-related tasks and information
 */
export default class FirebaseTools {
    static #instance;
    #app;
    #auth;
    #db;
    #collection;
    #routes;
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
        this.#collection ="busline";
    }

    /**
     * Instantiates the Firebase object or gets the single instance of it
     * @returns FirebaseTools
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
    
    /**
     * Getter for a particular document given a path
     * 
     * @param {*Series of string path(s) to get under 'busline' collection to get} path 
     * 
     * @returns An DocumentData Object containing all fields in the document.
     */
    async getDocument(...path) {
        // Create a reference to the  doc.
        const docRef = doc(this.#db, path);

        try {
        const result = await runTransaction(this.#db, async (transaction) => {
            const fetchedDoc = await transaction.get(docRef);
            if (!fetchedDoc.exists()) {
            throw "Document does not exist!";
            }
            return fetchedDoc.data();
        });
        return result;
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
    }

    /**
     * Function for writing new rating to a given bus line
     * 
     * @param {*JSON containing rating information} content 
     * @param {*String with the bus line to create a new rating for} busline 
     * @param {*Optional field} subCollectionPath 
     */
    async writeNewRatingToBusline(content, busline, subCollectionPath="ratings") {
        // Set the value of 'NYC'
        const docRef = await addDoc(
            collection(this.#db, this.#collection, busline, subCollectionPath), 
            content,
            { merge: true }
        );
        console.log("Document written with ID: ", docRef.id);
    }

    /**
     * Function to add new Bus entry into the DB
     * 
     * @param {*Bus Number to add} busnum 
     * @param {*One of the terminal stations of the bus} terminalOne 
     * @param {*Another of the terminal stations of the bus} terimalTwo 
     */
    async writeNewBusline(busnum, terminalOne="none", terimalTwo="none") {
        const busRef = await addDoc(collection(this.#db, this.#collection, { merge: true}), {
            number: busnum,
            terminal1: terminalOne,
            terminal2: terimalTwo
          });
        console.log("Busline written with ID: ", busRef.id);
    }

    getRoutes() {
        if (this.#routes) {
            return this.#routes;
        } else {
            console.log("error");
        }
    }

    setRoutes(routes) {
        this.#routes = routes;
    }
}