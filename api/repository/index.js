import recipeRepo from './recipeRepo.js';
import userRepo from './userRepo.js';
import orderRepo from './orderRepo.js';

export default (model) => ({
  recipeRepo: recipeRepo(model.Recipe),
  userRepo: userRepo(model.User),
  orderRepo: orderRepo(model.Order)
});
