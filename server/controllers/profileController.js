import { UserModel } from "../models/userModel.js";
import { linkModel } from "../models/linkModel.js";
import { getUser } from "../services/jwtAuth.js";
import mongoose from "mongoose";



async function handleName(req, res) {
    const jwt_token = req.cookies.uid;
    const user = getUser(jwt_token);
    res.status(200).json({ "name": user.name });

};

async function handleContentAdd(req, res) {
    console.log("/content/add hitted")
    const { link } = req.body;
    const social = req.query.social;
    const jwt_token = req.cookies.uid;
    const user_id = new mongoose.Types.ObjectId(getUser(jwt_token)._id);
    console.log(user_id);


    let realId = "";
    switch (social) {
        case "youtube":
            realId = link.slice(24);

            await linkModel.findOneAndUpdate(
                { userId: user_id }, // Query criteria
                {
                    $addToSet: { youtube: realId },
                    $setOnInsert: { userId: user_id }            // Update operation
                },
                {
                    upsert: true, // Create a new document if not found
                    new: true // Return the newly created document (optional, for verification)
                }
            )
                .then(result => {
                    if (result) {
                        console.log('New document created:', result);
                    } else {
                        console.log('Existing document updated');
                    }
                })
                .catch(error => {
                    console.error('Error:', error); // Handle potential errors
                });

            break;
        case "instagram":
            realId = link.slice(26, -1);

            await linkModel.findOneAndUpdate(
                { userId: user_id }, // Query criteria
                {
                    $addToSet: { instagram: realId },
                    $setOnInsert: { userId: user_id }            // Update operation
                },
                {
                    upsert: true, // Create a new document if not found
                    new: true // Return the newly created document (optional, for verification)
                }
            )
                .then(result => {
                    if (result) {
                        console.log('New document created:', result);
                    } else {
                        console.log('Existing document updated');
                    }
                })
                .catch(error => {
                    console.error('Error:', error); // Handle potential errors
                });

            break;
        case "tiktok":
            realId = link.slice(23);

            await linkModel.findOneAndUpdate(
                { userId: user_id }, // Query criteria
                {
                    $addToSet: { tiktok: realId },
                    $setOnInsert: { userId: user_id }            // Update operation
                },
                {
                    upsert: true, // Create a new document if not found
                    new: true // Return the newly created document (optional, for verification)
                }
            )
                .then(result => {
                    if (result) {
                        console.log('New document created:', result);
                    } else {
                        console.log('Existing document updated');
                    }
                })
                .catch(error => {
                    console.error('Error:', error); // Handle potential errors
                });

            break;
    }

    res.status(200).json({ "msg": "added successfully" });
};



async function handleContentServe(req, res) {

};
export { handleName, handleContentAdd, handleContentServe };