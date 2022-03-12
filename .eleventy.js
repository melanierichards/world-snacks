// Reference env vars (Contentful access tokens)
require('dotenv').config();

// Support rich text from Contentful
const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');

// Support nice date formatting
const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {

  // UNIVERSAL

    // Don't try to build asset files, just transparently copy them through
    eleventyConfig.addPassthroughCopy('assets');

    // RICH TEXT

      // Enable access to rich text from Contentful
      module.exports = function(eleventyConfig) {
        eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);
      };

      // Convert snack fields to rich text
      eleventyConfig.addShortcode("richTextIfy", function(snackField) {
        return documentToHtmlString(snackField);
      });

    // DATE FILTERS

      // Prettify dates
      eleventyConfig.addFilter("prettyDate", function(value) {
        return DateTime.fromJSDate(value, {zone: 'utc'}).toFormat('MMM dd, yyyy');
      });

    // LIMIT ARRAY
    eleventyConfig.addFilter("limit", function (arr, limit) {
      return arr.slice(0, limit);
    });

    // OFFSET ARRAY
    eleventyConfig.addFilter("offset", function (arr, limit) {
      return arr.slice(limit + 1);
    });

  // COUNTRIES

    // FILTER SNACKS BY COUNTRY
    eleventyConfig.addFilter("filterByCountry", function(snacks, country) {
      snacks = snacks.filter(snack => {
        return snack.countryOfOrigin.fields.countryName.includes(country);
      });
      return snacks;
    });

  // BLOG

    // RSS FEED
    /*
    const pluginRss = require("@11ty/eleventy-plugin-rss");
    eleventyConfig.addPlugin(pluginRss);
    */

    /* EXTRA MD OPTIONS
     * Classes etc: https://www.npmjs.com/package/markdown-it-attrs
     * Header anchors: https://www.npmjs.com/package/markdown-it-anchor
     */

    /*
    const markdownIt = require('markdown-it');
    const markdownItAnchor = require('markdown-it-anchor');
    const markdownItAttrs = require("markdown-it-attrs");
    let markdownLibrary = markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAttrs).use(markdownItAnchor, {permalink: false});

    eleventyConfig.setLibrary('md', markdownLibrary);
    */
};
