const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = function () {
  return client.getEntries({ content_type: 'snack', order: 'sys.createdAt' })
    .then(function (response) {
      const snack = response.items
        .map(function (snack) {
          snack.fields.date = new Date(snack.sys.createdAt);
          return snack.fields;
        });
      return snack;
    })
    .catch(console.error);
};
