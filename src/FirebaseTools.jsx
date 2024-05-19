import { initializeApp } from "firebase/app";
import { getFirestore, doc, runTransaction, addDoc, collection, setDoc, query, where, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * Singleton for all Firebase-related tasks and information
 */
export default class FirebaseTools {
    static #instance;
    #app;
    #auth;
    #db;
    #collection;
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
        this.#collection ="ratings";
    }

    /**
     * Instantiates the Firebase object or gets the single instance of it
     * 
     * @returns {FirebaseTools}
     */
    static getInstance() {
        if (this.#instance == null || this.#instance == undefined) {
            this.#instance = new FirebaseTools();
        }
        return this.#instance; 
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
     * @returns {import("firebase/firestore").DocumentData}
     */
    async getDocument(...path) {
        // Create a reference to the  doc.
        const docRef = doc(this.#db, ...path);

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
     * @param {*JSON Object containing rating information} content 
     * @param {*String with the bus line to create a new rating for} busline 
     * @param {*Optional field} subCollectionPath 
     */
    async writeNewRatingToBusline(content, busline, subCollectionPath="ratings") {
        // Set the value of 'NYC'
        const docRef = await addDoc(
            collection(this.#db, this.#collection), 
            content, {merge:true}
        );
    }

    // /**
    //  * Function to add new Bus entry into the DB
    //  * 
    //  * @param {*Bus Number to add} busnum 
    //  * @param {*One of the terminal stations of the bus} terminalOne 
    //  * @param {*Another of the terminal stations of the bus} terimalTwo 
    //  */
    // async writeNewBusline(busnum, terminalOne="none", terimalTwo="none") {
    //     const busRef = await setDoc(doc(this.#db, this.#collection, busnum), {
    //         number: busnum,
    //         terminal1: terminalOne,
    //         terminal2: terimalTwo
    //       }, { merge:true });
    //     console.log("Busline written with ID: ", busnum);
    // }

    /**
     * 
     * @param {*The Busline String to match and get} busline 
     * 
     * @returns {QueryDocumentSnapshot[]}
     */
    async getAllByBusline(busline) {
        const q = query(collection(this.#db, this.#collection), where("busline", "==", busline));
        const querySnapshot = await getDocs(q);
        let ratings = [];

        await querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        ratings.push(doc.data());
        });
        return ratings;
    }

    /**
     * 
     * @param {String for the bus line to query} busline 
     * @returns Json object with list of comments and other fields
     */
    async getAverageRatingsForBusline(busline) {
        let ratings = await this.getAllByBusline(busline);
        let comments = []
        let avgOverallRating = 0;
        let avgReliabilityRating = 0;
        let avgSafetyRating = 0;

        ratings.forEach((rating) => {
            comments.push(rating.busline);
            avgOverallRating += rating.overall;
            avgReliabilityRating += rating.reliability;
            avgSafetyRating += rating.safety;
        });


        avgOverallRating /= ratings.length;
        avgReliabilityRating /= ratings.length;
        avgSafetyRating /= ratings.length;

        const avgRatings = {
            busline: busline,
            comment: comments,
            safety: parseFloat(avgSafetyRating.toFixed(1)),
            reliability: parseFloat(avgReliabilityRating.toFixed(1)),
            overall: parseFloat(avgOverallRating.toFixed(1))
        }
        return avgRatings
    }

}