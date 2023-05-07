
export default (controlers, app) => {
  app.get('/status', controlers.statusCtrl.getStatus);
  app.get('/recipes', controlers.recipeCtrl.listRecipes);
  app.get('/recipes/:id', controlers.recipeCtrl.getRecipe);
  app.post('/recipes', controlers.recipeCtrl.createRecipe);
  app.put('/recipes/:id', controlers.recipeCtrl.updateRecipe);
  app.delete('/recipes/:id', controlers.recipeCtrl.deleteRecipe);

  app.get('/users', controlers.userCtrl.listUsers);
  app.get('/users/:id', controlers.userCtrl.getUser);
  app.post('/users', controlers.userCtrl.createUser);
  app.put('/users/:id', controlers.userCtrl.updateUser);
  app.delete('/users/:id', controlers.userCtrl.deleteUser);

  app.get('/orders', controlers.orderCtrl.listOrders);
  app.get('/orders/:id', controlers.orderCtrl.getOrder);
  app.post('/orders', controlers.orderCtrl.createOrder);
  app.put('/orders/:id', controlers.orderCtrl.updateOrder);
  app.delete('/orders/:id', controlers.orderCtrl.deleteOrder);
}
