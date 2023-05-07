
export default class Recipe {
  /**
   * Constructeur
   * @constructor
   *
   * @param {UUID}   id          - Identifiant de la recette
   * @param {String} name        - Intitulé de la recette
   * @param {String} ingredients - Liste des ingrédients
   * @param {String} procedure   - Procédure de fabrication
   */
  constructor(id, name, ingredients, procedure) {
    this.id          = id;
    this.name        = name;
    this.ingredients = ingredients;
    this.procedure   = procedure;
  }
}
