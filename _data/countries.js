const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = function () {
  return client.getEntries({ content_type: 'country', order: 'fields.countryName' })
    .then(function (response) {
      const country = response.items
        .map(function (country) {
          return country.fields;
        });
      return country;
    })
    .catch(console.error);
};
