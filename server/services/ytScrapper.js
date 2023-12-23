/*
- Get all the creator's user name from the link collection
- Use those user name and scrape for link and thubmbail
- Put those data on video collection with their user name
- Do all these work after every 24 hours; 
   
- get every user name from the link collection, if it already exist in video collection then update the data if does not exists then create a new one with data
 */

import { linkModel } from "../models/linkModel.js";
import { ytVideoModel } from "../models/ytVideoModel.js";
import puppeteer from "puppeteer";



async function youtubeScrapper(userId) {
   const browser = await puppeteer.launch({ headless: 'new' });
   let allLinks = [];
   try {
      const page = await browser.newPage();
      await page.goto("https://www.youtube.com/" + `${userId}` + "/videos");
      const links = await page.$$eval('#video-title-link', elements => {    // Get the first 3 elements
         elements = elements.slice(0, 3);                                  // Extract the href attribute for each element
         return elements.map(el => el.href);
      });
      allLinks = links;

   } catch {
      console.log("erroddr")
   } finally {
      await browser.close();
   }

   let thumbnails = [];
   for (const link of allLinks) {                                       // Loop through the first 3 links
      const id = link.slice(32);
      thumbnails.push("http://img.youtube.com/vi/" + `${id}` + "/0.jpg");
      console.log(link);
      console.log("http://img.youtube.com/vi/" + `${id}` + "/0.jpg")
   }

   try {
      const doc = await ytVideoModel.findOne({ creator: `${userId}` });
      if (!doc) {
         const newDoc = new ytVideoModel({
            creator: `${userId}`,
            videos: [`${allLinks[0]}`, `${allLinks[1]}`, `${allLinks[2]}`],
            thumbnails: [`${thumbnails[0]}`, `${thumbnails[1]}`, `${thumbnails[2]}`]
         });
         await newDoc.save();
         console.log("Document created successfully:", newDoc);
      } else {
         doc.creator = userId;

         doc.videos[0] = allLinks[0];
         doc.videos[1] = allLinks[1];
         doc.videos[2] = allLinks[2];

         doc.thumbnails[0] = thumbnails[0];
         doc.thumbnails[1] = thumbnails[1];
         doc.thumbnails[2] = thumbnails[2];

         await doc.save();

         console.log("Found document:", doc);
      }
   } catch (err) {
      console.error(err);
   }


}



async function getYtVideos() {
   let data = await linkModel.find({}, { youtube: 1 })
   let allUserId = [];

   data.forEach(obj => {
      allUserId = allUserId.concat(obj.youtube)
   })
   allUserId.forEach(userId => {

      youtubeScrapper(userId)
      console.log(userId)
   })
   
   data = null;
   allUserId = null;

};

export default getYtVideos;
