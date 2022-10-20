import { ObjectId } from "mongodb";
import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req, res) {
    // connect to the database
    const db = dbConnect()
    // get the whole funiture collection 
    const collection = await db.collection("furniture").find().toArray()
        // catch any errors -> status 500
        .catch(err => {
            res.status(500).send(err);
            return;
        });
    // send back the arrray of funiture
    res.send(collection);
}

export async function addNewFurniture(req, res) {
    //get new furniture from rec.body = body of the request
    const { brand, model, type, price } = req.body
    const newFurniture = { brand, model, type, price: Number(price) }
    // connect to database
    const db = dbConnect()
    //put this new funirture into our funiture collection in our db
    await db.collection('furniture').insertOne(newFurniture)
    //catch errors and send with status 500
    .catch(err => {
        res.status(500).send(err)
        return
      })

    // return response with 201
    res.status(201).send({ message: 'Furniture added' })
    res.status(201).send({ message: 'Furniture updated' })
}

// export async function findFurnitureById(req, res) {
//     const db = dbConnect()
//     const { search } = req.params
//     const collection = await db.collection("furniture")
//       .find({ model: search })
//       .toArray()
//     res.send(collection)}
export async function updateFurniture(req, res) {
const db = dbConnect()
const {furnitureId } = req.params
await db.collection('furniture')

.findOneAndUpdate ({ _id: new ObjectId(furnitureId) }, { $set: req.body })
.catch(err => {
    res.status(500).send(err)
    return
})
// send back the array of furniture
res.set('Cache-control', 'public, max-age=300, s-maxage=600')
res.status(202).send({message: "updated furniture"})
  }