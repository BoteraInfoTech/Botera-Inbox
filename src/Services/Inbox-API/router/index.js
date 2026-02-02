import openPoints from './openEndPoints';
import instagram from './instagram';
import linkedIn from './linkedIn';
import facebook from './facebook';
import whatsApp from './whatsApp';

const allValidRoutes = {
  '/': openPoints,
  '/instagram': instagram,
  '/whatsApp': whatsApp,
  '/linkedIn': linkedIn,
  '/facebook': facebook,
};

export default (app) => {
  Object.keys(allValidRoutes).forEach((prefix) => {
    app.use(prefix, allValidRoutes[prefix]);
  });
};
