// RSS
const pluginRss = require('@11ty/eleventy-plugin-rss');

// Reference env vars (Contentful access tokens)
require('dotenv').config();

// Support rich text from Contentful
const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');

// Support nice date formatting
const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {

  // UNIVERSAL

    // Don't try to build pages from these files
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('manifest.webmanifest');
    eleventyConfig.addPassthroughCopy('robots.txt');

    // RSS FEED
    eleventyConfig.addPlugin(pluginRss);

    // RICH TEXT

      // Enable access to rich text from Contentful
      module.exports = function(eleventyConfig) {
        eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);
      };

      // Convert snack fields to rich text
      eleventyConfig.addShortcode('richTextIfy', function(snackField) {
        return documentToHtmlString(snackField);
      });

    // DATE FILTERS

      // Machine-readable dates
      eleventyConfig.addFilter("machineDate", function(value) {
        return DateTime.fromJSDate(value, {zone: 'utc'}).toISO();
      });

      // Prettify dates
      eleventyConfig.addFilter('prettyDate', function(value) {
        return DateTime.fromJSDate(value, {zone: 'utc'}).toFormat('MMM dd, yyyy');
      });

    // LIMIT ARRAY
    eleventyConfig.addFilter('limit', function (arr, limit) {
      return arr.slice(0, limit);
    });

    // OFFSET ARRAY
    eleventyConfig.addFilter('offset', function (arr, limit) {
      return arr.slice(limit + 1);
    });

  // COUNTRIES

    // FILTER SNACKS BY COUNTRY
    eleventyConfig.addFilter('filterByCountry', function(snacks, country) {
      snacks = snacks.filter(snack => {
        return snack.countryOfOrigin.fields.countryName.includes(country);
      });
      return snacks;
    });

  // TYPES

    // FILTER SNACKS BY TYPE
    eleventyConfig.addFilter('filterByType', function(snacks, type) {
      snacks = snacks.filter(snack => {
        return snack.typeOfSnack.fields.type.includes(type);
      });
      return snacks;
    });
};
