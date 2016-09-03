require('babel-core/register')({
  presets: ["es2015", "react", "stage-2"]
});

require('./src/server');
