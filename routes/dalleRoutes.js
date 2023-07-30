import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

//instance for router
const router = express.Router();

//openai configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

//instance for openai
const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

//route for openai image generate
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,   //one image
      size: '1024x1024',   //image size
      response_format: 'b64_json',   //image format
    });

    //to get the response from the api 
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;