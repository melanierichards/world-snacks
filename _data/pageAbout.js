const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = function () {
  const pageAboutId = process.env.CTFL_ABOUT_ID;
  return client.getEntry(pageAboutId).then(function (response) {
    console.log(response);
    return response.fields;
  })
  .catch(console.error);
};