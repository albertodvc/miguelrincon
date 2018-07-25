var {handler} = require ('./index.js')


handler({popo: 'pipi'}, {}, (e, a) => {
  console.log(e, a)
});
