import mongoose from "mongoose";
import { UserModel } from "../models/userModel.js";
import { ytVideoModel } from "../models/ytVideoModel.js";
import { igVideoModel } from "../models/igVideoMode.js";
import { linkModel } from "../models/linkModel.js";
import { getUser } from "../services/jwtAuth.js";
import { youtubeScrapper } from "../services/ytScrapper.js";
import { instagramScrapper } from "../services/igScrapper.js"



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
            await youtubeScrapper(realId);

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
            await instagramScrapper([realId]);
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




async function handleFetchCreator(jwt_token, platform) {
    const user_id = getUser(jwt_token)._id;
    // console.log(user_id);
    try {
        const doc = await linkModel.findOne({ userId: user_id });
        if (doc && platform === 'youtube') {
            return doc.youtube;
        } else {
            return doc.instagram;
        }
    } catch (error) {

    }
}

async function handleYoutubeServe(req, res) {
    const creators = await handleFetchCreator(req.cookies.uid, 'youtube');
    let videos = [];
    let thumbnails = [];
    for (let creator of creators) {
        const links = await ytVideoModel.findOne({ creator: creator });
        videos = videos.concat(links.videos);
        thumbnails = thumbnails.concat(links.thumbnails);

    }
    // console.log(videos);
    // console.log(thumbnails);
    const data = { 'videos': videos, 'thumbnails': thumbnails };

    res.json(data);
    res.status(200);

};

async function handleInstagramServe(req, res) {
    const creators = await handleFetchCreator(req.cookies.uid, 'instagram');
    let videos = [];
    let thumbnails = [];
    let title = [];
    for (let creator of creators) {
        const links = await igVideoModel.findOne({ creator: creator });
        videos = videos.concat(links.videos);
        thumbnails = thumbnails.concat(links.thumbnails);
        title.push(creator);
        title.push(creator);
        title.push(creator);


    }
    // console.log(videos);
    // console.log(title);
    const data = { 'videos': videos, 'thumbnails': thumbnails, 'title': title };

    res.json(data);
    res.status(200);

};
export { handleName, handleContentAdd, handleYoutubeServe, handleInstagramServe };