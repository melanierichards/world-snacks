# World Snacks

My impressions of snacks from around the world, found at https://snacks.melanie-richards.com

## Tech Stack

* [Eleventy](https://www.11ty.dev/)
* [Contentful](https://www.contentful.com/)

## Environment Variables

Requires the following keys, which can be obtained in Contentful through Settings > API Keys:

* `CTFL_SPACE`: the token for this Contentful space
* `CTFL_ACCESSTOKEN`: use the API key for published content
* `CTFL_ABOUT_ID`: the ID for the "About" page entry in Contentful

-------------------------------------------------------------

## To build

0. Install [Node](https://nodejs.org/) :)
1. Clone the repo
2. Run `npm install`
3. Run `npm run start`
4. Visit `localhost:8080`

## Commands

| Command                    | Purpose                          |
| :------------------------- | :------------------------------- |
| `npm run start`            | Start project (serve, build CSS) |
| `npm run build `           | Build project                    |
| `npm run checks`           | Validate HTML & lint JS          |
| `npm run lint`             | Run eslint                       |
| `npm run lint:fix`         | Run eslint and fix issues        |
| `npm run validate`         | Run html-validate                |

## Media

Snack image size: 800px wide

## Reference

* [Eleventy docs](https://www.11ty.dev/docs/)
* [ESLint docs](https://eslint.org/)
* [HTML Validate docs](https://html-validate.org/)
* [Nunjucks templating language](https://mozilla.github.io/nunjucks/templating.html)
* [Luxon date formatting](https://moment.github.io/luxon/docs/manual/formatting.html)