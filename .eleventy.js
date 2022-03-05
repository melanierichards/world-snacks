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
