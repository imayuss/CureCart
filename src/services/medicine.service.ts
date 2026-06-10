import { MedicineRepository } from '../repositories/medicine.repository';
import { AIService } from './ai.service';
import { prisma } from '../config/db';
import Fuse from 'fuse.js';

export class MedicineService {
  /**
   * Search for medicines by a query string
   */
  static async searchMedicines(query?: string) {
    let results = [];

    if (!query) {
      results = await MedicineRepository.getMedicines();
    } else {
      // 1. Fetch all medicines for in-memory fuzzy search (fine for a resume project size)
      const allMedicines = await MedicineRepository.getMedicines();
      
      // 2. Initialize Fuse.js for typo tolerance (e.g., "paractemol" -> "paracetamol")
      const fuse = new Fuse(allMedicines, {
        keys: ['name', 'description', 'category'],
        threshold: 0.4, // Lower is more strict. 0.4 allows some typos.
      });

      const fuseResults = fuse.search(query);
      results = fuseResults.map(res => res.item);
    }
    
    // AI ENGINE FALLBACK
    // If user searched for something and local fuzzy search returned 0 results
    if (query && results.length === 0) {
      console.log(`[AI Engine] Local search missed for "${query}". Triggering Gemini AI Scraper...`);
      
      const aiData = await AIService.scrapeMedicineDetails(query);
      
      if (aiData) {
        // Dynamically add the scraped data to our local PostgreSQL database
        const newMedicine = await prisma.medicine.create({
          data: {
            name: aiData.name,
            description: aiData.description,
            manufacturer: aiData.manufacturer,
            price: aiData.price,
            requiresPrescription: aiData.requiresPrescription,
            stock: 100, // Default stock for newly discovered items
          }
        });
        
        // Push it into the results array so the UI renders it immediately
        results.push(newMedicine);
      }
    }

    return results;
  }

  /**
   * Get details of a single medicine
   */
  static async getMedicineDetails(id: string) {
    const medicine = await MedicineRepository.getMedicineById(id);
    if (!medicine) {
      throw new Error("Medicine not found");
    }
    return medicine;
  }
}
