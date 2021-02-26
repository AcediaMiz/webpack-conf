import "./index.pug";
import "./main.scss";

function requireAll(r) {
  return r.keys().map(r);
}
requireAll(require.context("./", true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));
