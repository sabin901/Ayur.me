const express = require('express');
const Joi = require('joi');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

const searchSchema = Joi.object({
  q: Joi.string().trim().min(2).max(180).default('Ayurveda clinical trials'),
  pageSize: Joi.number().integer().min(1).max(25).default(10),
});

function stripHtml(value, fallback = 'No abstract available.') {
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

function normalizeArticle(article) {
  const pmid = article.pmid || article.id;
  return {
    id: String(article.id || pmid),
    title: stripHtml(article.title, 'Untitled study'),
    authors: stripHtml(article.authorString, 'Authors unavailable'),
    journal: stripHtml(article.journalTitle || article.bookOrReportDetails, 'Source unavailable'),
    year: article.pubYear ? Number(article.pubYear) : null,
    abstract: stripHtml(article.abstractText),
    source: article.source || 'Europe PMC',
    sourceUrl: pmid
      ? `https://europepmc.org/article/${article.source || 'MED'}/${pmid}`
      : 'https://europepmc.org/',
    doi: article.doi || null,
    isOpenAccess: article.isOpenAccess === 'Y',
    reviewStatus: 'external',
    confidence: article.hasAbstract === 'Y' ? 0.82 : 0.62,
  };
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { error, value } = searchSchema.validate(req.query, { stripUnknown: true });
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message),
      });
    }

    const url = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
    url.searchParams.set('query', value.q);
    url.searchParams.set('format', 'json');
    url.searchParams.set('resultType', 'core');
    url.searchParams.set('pageSize', String(value.pageSize));
    url.searchParams.set('synonym', 'true');

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ayur.me educational research search (contact: support@ayur.me)',
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        error: 'Research provider unavailable',
        providerStatus: response.status,
      });
    }

    const payload = await response.json();
    const articles = (payload.resultList?.result || []).map(normalizeArticle);

    res.json({
      success: true,
      provider: 'Europe PMC',
      query: value.q,
      articles,
      data: articles,
    note:
        'Research results are educational references for informational study.',
    });
  })
);

module.exports = router;
