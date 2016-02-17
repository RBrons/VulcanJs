Package.describe({
  name: 'telescope:users',
  summary: 'Telescope permissions.',
  version: '0.25.7',
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:core@0.25.7'
  ]);

  api.addFiles([
    // 'package-tap.i18n',
    'lib/namespace.js',
    'lib/roles.js',
    'lib/config.js',
    'lib/permissions.js',
    'lib/users.js',
    'lib/callbacks.js',
    'lib/helpers.js',
    'lib/published_fields.js',
    'lib/methods.js',
    'lib/routes.jsx'
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/publications.js',
    'lib/server/create_user.js'
  ], ['server']);

  // var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "id", "it", "ja", "kk", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh-CN"];
  // var languagesPaths = languages.map(function (language) {
  //   return "i18n/"+language+".i18n.json";
  // });
  // api.addFiles(languagesPaths, ["client", "server"]);
  
  api.export('Users');

});
