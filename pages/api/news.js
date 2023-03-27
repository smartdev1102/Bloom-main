import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        case "GET":
            let _news = await db.collection("news").find({}).toArray();
            return res.json({ status: true, data: _news[0] });
    }
}