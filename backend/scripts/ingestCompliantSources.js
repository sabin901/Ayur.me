const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'data', 'review_queue');
const OUT_FILE = path.join(OUT_DIR, 'source_ingest_preview.json');

const SOURCE_CATALOG = [
  {
    id: 'europe-pmc-ayurveda-clinical',
    type: 'clinical_evidence',
    sourceName: 'Europe PMC',
    sourceUrl: 'https://europepmc.org/RestfulWebService',
    license: 'Provider metadata API; individual article reuse varies by record.',
    query: 'Ayurveda clinical trial OR Ayurvedic randomized trial',
  },
  {
    id: 'ayurwiki-open-kb',
    type: 'ayurveda_reference',
    sourceName: 'Ayurwiki',
    sourceUrl: 'https://ayurwiki.org/',
    license: 'Open community knowledge base; verify page-level reuse before publishing copied text.',
    query: 'herbs medicines yoga physiology concepts',
  },
  {
    id: 'ncbi-eutilities',
    type: 'clinical_evidence',
    sourceName: 'NCBI E-utilities',
    sourceUrl: 'https://www.ncbi.nlm.nih.gov/home/develop/api/',
    license: 'Public API metadata; follow NCBI rate limits and data policies.',
    query: 'Ayurveda integrative medicine safety contraindications',
  },
];

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripHtml(value, fallback = 'Untitled record') {
  if (!value || typeof value !== 'string') return fallback;
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim() || fallback;
}

async function fetchEuropePmcPreview(query) {
  const url = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
  url.searchParams.set('query', query);
  url.searchParams.set('format', 'json');
  url.searchParams.set('resultType', 'core');
  url.searchParams.set('pageSize', '8');
  url.searchParams.set('synonym', 'true');

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'ayur.me compliant source preview (contact: support@ayur.me)',
    },
  });
  if (!response.ok) throw new Error(`Europe PMC failed: ${response.status}`);
  const json = await response.json();
  return (json.resultList?.result || []).map(item => ({
    canonicalId: normalizeName(`${item.source || 'MED'}-${item.id}`),
    title: stripHtml(item.title),
    sourceUrl: item.pmid
      ? `https://europepmc.org/article/${item.source || 'MED'}/${item.pmid}`
      : `https://europepmc.org/search?query=${encodeURIComponent(stripHtml(item.title, query))}`,
    sourceName: 'Europe PMC',
    license: 'Metadata preview; article license must be checked before content reuse.',
    scrapedAt: new Date().toISOString(),
    reviewStatus: 'needs_review',
    confidence: item.hasAbstract === 'Y' ? 0.82 : 0.62,
    contraindications: [],
  }));
}

async function main() {
  const records = [];
  const evidence = await fetchEuropePmcPreview(SOURCE_CATALOG[0].query);
  records.push(...evidence);

  for (const source of SOURCE_CATALOG) {
    records.push({
      canonicalId: source.id,
      title: `${source.sourceName} ingestion source`,
      type: source.type,
      sourceUrl: source.sourceUrl,
      sourceName: source.sourceName,
      license: source.license,
      scrapedAt: new Date().toISOString(),
      reviewStatus: 'source_registered',
      confidence: 0.7,
      contraindications: [],
    });
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      policy:
        'Preview records are not public educational content until reviewed for licensing, attribution, and source accuracy.',
      records,
    }, null, 2)
  );

  console.log(`Wrote ${records.length} review-queue records to ${OUT_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
