import statusCtrl from './statusCtrl.js';
import recipeCtrl from './recipeCtrl.js';
import userCtrl from './userCtrl.js';
import orderCtrl from './orderCtrl.js';

export default (repository) => ({
  statusCtrl,
  recipeCtrl: recipeCtrl(repository.recipeRepo),
  userCtrl: userCtrl(repository.userRepo),
  orderCtrl: orderCtrl(repository.orderRepo, repository.recipeRepo, repository.userRepo)
});
