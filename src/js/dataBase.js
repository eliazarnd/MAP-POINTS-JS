export default class DataBase {
  constructor(name) {
    this.database = window.indexedDB;
    this.name = name;
    this.db = null;
    this.objectStore = null;
    this.pointsList = [];
  }

  createDataBase() {
    if (this.database) {
      const request = this.database.open(this.name);

      request.onsuccess = () => {
        this.db = request.result;
        console.log("OPEN", this.db);
        this.readData();
      };

      request.onupgradeneeded = () => {
        this.db = request.result;
        console.log("CREATE", this.db);

        this.objectStore = this.db.createObjectStore("points", {
          autoIncrement: true,
        });
      };

      request.onerror = (error) => {
        console.log("ERROR", error);
      };
    }
  }

  addData(data) {
    const transaction = this.db.transaction(["points"], "readwrite");

    const objectStore = transaction.objectStore("points");
    const request = objectStore.add(data);
  }

  readData() {
    let pointsList = [];
    const transaction = this.db.transaction(["points"], "readonly");
    const objectStore = transaction.objectStore("points");

    const request = objectStore.openCursor();

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      //console.log(e);
      if (cursor) {
        this.pointsList.push(cursor.value);
        cursor.continue();
      } else {
        console.log("No more data");
      }
    };
  }
}
