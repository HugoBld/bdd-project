import { v4 as uuidv4 } from 'uuid';

export default (Recipe) => {

  const recipes = [
    new Recipe(
      'a35ce12d-d52b-4a07-90ad-68e985b779e7',
      'Chausson aux pommes',
      'pommes, pate feuilletée, sucre',
      'faire compote, former chausson, cuire'
    ),
    new Recipe(
      'dc466424-4297-481a-a8de-aa0898852da1',
      'Quiche thon tomate',
      'thon, tomate, pate feuilletée, oeuf, creme',
      'couper thon, tomates, mélanger creme et oeufs, mettre dans moule, cuire'
    )
  ];
  
  const findRecipe = (id) => {
    return recipes.find((recipe) => recipe.id === id);
  }

  const listRecipes = () => {
    return recipes;
  };

  const createRecipe = (recipeData) => {
    const recipe = new Recipe(
      uuidv4(),
      recipeData.name,
      recipeData.ingredients,
      recipeData.procedure
    );

    recipes.push(recipe);
    return recipe;
  }

  const updateRecipe = (id, recipeData) => {
    let foundRecipeIdx = -1;
    recipes.forEach((recipe, idx) => {
      if (recipe.id === id) {
        foundRecipeIdx = idx;
      }
    });

    if (foundRecipeIdx > -1) {
      recipes[foundRecipeIdx] = Object.assign(recipes[foundRecipeIdx], recipeData);
      return recipes[foundRecipeIdx];
    }

    return null;
  }

  const deleteRecipe = (id) => {
    let recipeToDeleteIndex = recipes.findIndex((b) => b.id === id);

    if (recipeToDeleteIndex > -1) {
      let deletedRecipe = recipes.splice(recipeToDeleteIndex, 1)[0];
      return deletedRecipe;
    }

    return null;
  }

  return {
    listRecipes,
    findRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
  };
};
