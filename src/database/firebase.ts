import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcxgH-0KbQnRwdCtZgs79QAZNl_ditNCw",
  authDomain: "todo-list-bd2.firebaseapp.com",
  projectId: "todo-list-bd2",
  storageBucket: "todo-list-bd2.appspot.com",
  messagingSenderId: "477269864924",
  appId: "1:477269864924:web:745dc20cda8a264c3f1f19",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
