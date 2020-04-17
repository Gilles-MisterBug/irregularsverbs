/**
 * Fix Warning Warning: Entry point 'ngx-papaparse' contains deep imports into
 * */
module.exports = {
  packages: {
    'ngx-papaparse': {
      ignorableDeepImportMatchers: [
        /papaparse/,
      ]
    },
  },
};
