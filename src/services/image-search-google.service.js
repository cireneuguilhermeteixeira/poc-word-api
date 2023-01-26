const imageSearch = require('image-search-google');
 
const client = new imageSearch(process.env.NEXT_PUBLIC_CSE_ID, process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
const options = { page: 1 };


export async function getImages(wordName) {
    try{
        const images = await client.search(wordName, options)
        return images;
    }catch(e) {
        console.log(e);
    }
  }
  
  
  export default {
    getImages,
  }
