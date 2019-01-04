import MyFirebase from "./MyFirebase.js";
import "firebase/firestore";

const db = MyFirebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export default db;
