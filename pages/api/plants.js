import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { plantingService, userService } from "services";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create a plant        
        case "POST":
            //... check clone or create
            if(req.query.preset === "true"){
                let _clone_plant = {
                    userid: req.query.userid,
                    name: req.body.name,
                    species: req.body.species,
                    description: req.body.description,
                    image: req.body.image,
                    direct_seed: req.body.direct_seed,
                    direct_seed_pinch: req.body.direct_seed_pinch,
                    earliest_seed: req.body.earliest_seed,
                    latest_seed: req.body.latest_seed,
                    harden: req.body.harden,
                    transplant: req.body.transplant,
                    rebloom: req.body.rebloom,
                    maturity_early: req.body.maturity_early,
                    maturity_late: req.body.maturity_late,
                    light: req.body.light,
                    depth: req.body.depth,
                    seed_note: req.body.seed_note,
                    transplant_note: req.body.transplant_note,
                    harvest_note: req.body.harvest_note,
                    pinch_note: req.body.pinch_note,
                    pinch: req.body.pinch,
                    pot_on: req.body.pot_on,
                    pot_on_note: req.body.pot_on_note,
                    harvest_length: req.body.harvest_length,
                    cold_stratify: req.body.cold_stratify,
                    spacing_min: req.body.spacing_min,
                    spacing_max: req.body.spacing_max,
                    height: req.body.height
                }
                await db.collection("plants").insertOne(_clone_plant);
                return res.json({ status: true, message: 'A plant is created successfully.' });
            }else{
                //... check pro user or not
                let _user = await userService.getById(req.body.userid);
                if(_user.data.share_custom_varieties){
                    await db.collection("plants").insertOne(req.body);
                    return res.json({ status: true, message: 'A plant is created successfully.' });
                }else{
                    let _length = await db.collection("plants").find({userid: req.body.userid}).count();
                    if(_length === 25 || _length < 25){
                        await db.collection("plants").insertOne(req.body);
                        return res.json({ status: true, message: 'A plant is created successfully.' });
                    }else{
                        return res.json({ status: false, message: "Non-pro user can't create more than 25 custom plants." });
                    }
                }
            }
            

        //... get all plants or plant by id
        case "GET":
            //... check pro user or not
            if(req.query.id === undefined){
                let _user = await userService.getById(req.query.userid);
                let _plants = await db.collection("plants").find({userid: req.query.userid}).toArray();
                if(_user.data.share_custom_varieties){
                    let _presets = await db.collection("plants").find({type: "preset"}).toArray();
                    return res.json({ status: true, data: _plants, presets: _presets });
                }else{
                    return res.json({ status: true, data: _plants });
                }
            }else{
                let plant = await db.collection("plants").findOne({_id: new ObjectId(req.query.id)});
                return res.json({ status: true, data: plant });
            }

        //... update a plant
        case "PUT":
            await db.collection("plants").updateOne(
                {
                    _id: new ObjectId(req.query.id),
                },
                {
                    $set: {
                        userid: req.body.userid,
                        name: req.body.name,
                        species: req.body.species,
                        description: req.body.description,
                        image: req.body.image,
                        direct_seed: req.body.direct_seed,
                        direct_seed_pinch: req.body.direct_seed_pinch,
                        earliest_seed: req.body.earliest_seed,
                        latest_seed: req.body.latest_seed,
                        harden: req.body.harden,
                        transplant: req.body.transplant,
                        rebloom: req.body.rebloom,
                        maturity_early: req.body.maturity_early,
                        maturity_late: req.body.maturity_late,
                        light: req.body.light,
                        depth: req.body.depth,
                        seed_note: req.body.seed_note,
                        transplant_note: req.body.transplant_note,
                        harvest_note: req.body.harvest_note,
                        pinch_note: req.body.pinch_note,
                        pinch: req.body.pinch,
                        pot_on: req.body.pot_on,
                        pot_on_note: req.body.pot_on_note,
                        harvest_length: req.body.harvest_length,
                        cold_stratify: req.body.cold_stratify,
                        spacing_min: req.body.spacing_min,
                        spacing_max: req.body.spacing_max,
                        height: req.body.height,
                    },
                }
            );
            return res.json({ status: true, message: 'plant is updated successfully.' });

        //... delete a plant
       case "DELETE":
    // Get plantings with the specified plant_id
    let plantings = await db.collection("plantings").find({ plant_id: req.query.id }).toArray();

    // Delete tasks associated with each planting
    for (const planting of plantings) {
        await db.collection("tasks").deleteMany({ planting_id: planting._id });
    }

    // Delete plantings with the specified plant_id
    await db.collection("plantings").deleteMany({ plant_id: req.query.id });

    // Delete the plant with the specified id
    await db.collection("plants").deleteOne({ _id: new ObjectId(req.query.id) });

    return res.json({ status: true, message: 'The plant is deleted successfully.' });
}

}
