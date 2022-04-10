const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = function () {
  return client.getEntries({ content_type: 'snackType', order: 'fields.type' })
    .then(function (response) {
      const type = response.items
        .map(function (type) {
          return type.fields;
        });
      return type;
    })
    .catch(console.error);
};