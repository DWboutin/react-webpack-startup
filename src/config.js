import config from '../config';

if (typeof window !== 'undefined') {
  module.exports = window.__CONFIG__;
} else {
  module.exports = config;
}
