import { AIService } from '../src/services/ai.service';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
  try {
    const corrected = "amoxicillin";
    console.log("Scraping:", corrected);
    const details = await AIService.scrapeMedicineDetails(corrected);
    console.log("Details:", details);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
