import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Ayurvedic Web Scraper
 * This script demonstrates an active connection to scrape Ayurvedic disease data
 * from public repositories/encyclopedias and parses it into JSON format.
 */

const WIKI_API_URL = 'https://en.wikipedia.org/w/api.php';

async function scrapeAyurvedicTerms() {
  console.log('Connecting to Wikipedia API to scrape Ayurvedic categories...');
  
  try {
    // 1. Get all pages in the Category:Ayurveda
    const response = await axios.get(WIKI_API_URL, {
      headers: {
        'User-Agent': 'AyurMeScraperBot/1.0 (sabin@example.com)'
      },
      params: {
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Category:Ayurveda',
        cmlimit: 500,
        format: 'json',
        origin: '*'
      }
    });

    const members = response.data.query.categorymembers;
    console.log(`Found ${members.length} articles in the Ayurveda category.`);

    const diseases = [];
    const herbs = [];

    for (let i = 0; i < Math.min(members.length, 30); i++) { // Limit for demo
      const page = members[i];
      if (page.ns !== 0) continue; // Skip non-articles

      console.log(`Scraping data for: ${page.title}...`);
      
      const pageRes = await axios.get(WIKI_API_URL, {
        headers: {
          'User-Agent': 'AyurMeScraperBot/1.0 (sabin@example.com)'
        },
        params: {
          action: 'query',
          prop: 'extracts',
          exintro: true,
          explaintext: true,
          titles: page.title,
          format: 'json',
          origin: '*'
        }
      });

      const pages = pageRes.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;

      if (!extract) continue;

      // Basic NLP categorization (heuristics)
      if (extract.toLowerCase().includes('disease') || extract.toLowerCase().includes('disorder') || extract.toLowerCase().includes('syndrome')) {
        diseases.push({
          id: page.title.toLowerCase().replace(/ /g, '-'),
          name: page.title,
          sanskrit: page.title,
          description: extract.substring(0, 300) + '...',
          source: `Wikipedia - ${page.title}`
        });
      } else if (extract.toLowerCase().includes('herb') || extract.toLowerCase().includes('plant')) {
        herbs.push({
          name: page.title,
          description: extract.substring(0, 300) + '...'
        });
      }
    }

    const outputPath = path.join(__dirname, '..', 'data', 'scrapedData.json');
    fs.writeFileSync(outputPath, JSON.stringify({ diseases, herbs }, null, 2));
    console.log(`\nSuccessfully scraped and saved data to ${outputPath}`);
    console.log(`Extracted ${diseases.length} diseases and ${herbs.length} herbs.`);

  } catch (error) {
    console.error('Error scraping data:', error.message);
  }
}

scrapeAyurvedicTerms();
