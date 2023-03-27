import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        case "POST":
            let existUser = await db.collection("users").find({email: req.body.email}).toArray();
            if(existUser.length !== 0){
                return res.json({ status: false, message: 'Another account already exists for this email address!' });    
            }else{
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                const newUser = await db.collection("users").insertOne(req.body);
                return res.json({ status: true, data: newUser, message: 'The user is registered successfully.' });
            }
    }
}