/*
- Get all the creator's user name from the link collection
- Use those user name and scrape for link and thubmbail
- Put those data on video collection with their user name
- Do all these work after every 24 hours; 
   
- get every user name from the link collection, if it already exist in video collection then update the data if does not exists then create a new one with data
 */

import { linkModel } from "../models/linkModel.js";
import { igVideoModel } from "../models/igVideoMode.js";
import puppeteer from "puppeteer";
import error  from 'console';



async function instagramScrapper(allUserId) {
    const browser = await puppeteer.launch({ headless: "new" });
    try {
        const page = await browser.newPage();

        await page.goto("https://www.instagram.com");
        await page.waitForSelector('input[name="username"]');
        await page.waitForSelector('input[name="password"]');

        await page.type('input[name="username"]', 'baby_goddz');
        await page.type('input[name="password"]', 'Adgmptw123');
        await page.click('button[type="submit"]');
        await page.waitForNavigation();
        for(let userId of allUserId) {
            
            await page.goto(`https://www.instagram.com/${userId}/reels/`)
            await page.waitForSelector('div[class="_aajz"]')  
            
            const allLinks = await page.$$eval('a', elements => {
                elements = elements.slice(20, 23);
                return elements.map(el => el.href);
            });
                        
            const thumbnails = await page.$$eval('div._aag6', (elements) => {
                elements = elements.slice(0,3);
                return elements.map(element => element.style.backgroundImage.match(/\((.*?)\)/)[1]);
            });


            try {
               const doc = await igVideoModel.findOne({ creator: `${userId}` });
               if (!doc) {
                  const newDoc = new igVideoModel({
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

        
    } catch {
        console.log(error)
    } finally {
        await browser.close();
    }

}



async function getIgVideos() {
   let data = await linkModel.find({}, { instagram: 1 })
   let allUserId = [];

   data.forEach(obj => {
      allUserId = allUserId.concat(obj.instagram)
   })
   

      instagramScrapper(allUserId);
      console.log(allUserId);
      
   data = null;
   allUserId = null;

};






export {getIgVideos, instagramScrapper};
