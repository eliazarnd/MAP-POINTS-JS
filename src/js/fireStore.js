export default class FireStoreDb {
  constructor() {
    this.points = [];
    this.dbStore = firebase.firestore();
  }

  async createAPoint(pointInfo) {
    const response = await this.dbStore
      .collection("points")
      .doc()
      .set(pointInfo);
    console.log(response);
  }

  async updateApoint(id, updatePoint) {
    const response = await this.dbStore
      .collection("points")
      .doc(id)
      .update(updatePoint);
  }

  async getAllPoints() {
    const querySnapshot = await this.dbStore.collection("points").get();
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      const point = doc.data();
      point.id = doc.id;
      this.points.push(point);
    });
  }

  async getPointByTitle(title) {
    const pointsRef = this.dbStore.collection("points");

    const query = await pointsRef.where("title", "==", title);
    const points = await query.get();
    let point;
    points.forEach((doc) => {
      point = doc.data();
      point.id = doc.id;
      console.log(point);
    });

    return point;
  }

  async deltePoint(id) {
    const response = this.dbStore.collection("points").doc(id).delete();
    return response;
  }
}
