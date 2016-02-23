Package.describe({
  name: "telescope:comments",
  summary: "Telescope comments package",
  version: "0.25.7",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:lib@0.25.7',
    // 'telescope:i18n@0.25.7',
    'telescope:settings@0.25.7',
    'telescope:posts@0.25.7',
    'telescope:users@0.25.7'
  ]);

  api.use([
    'telescope:notifications@0.25.7'
  ], ['client', 'server'], {weak: true});

  api.addFiles([
    'lib/collection.js',
    'lib/methods.js',
    'lib/callbacks.js',
    'lib/views.js',
    'lib/parameters.js',
    'lib/notifications.js',
    'lib/helpers.js',
    'lib/custom_fields.js',
    'lib/published_fields.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/publications.js'
  ], ['server']);

  // var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "id", "it", "ja", "kk", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh-CN"];
  // var languagesPaths = languages.map(function (language) {
  //   return "i18n/"+language+".i18n.json";
  // });
  // api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Comments');

});
