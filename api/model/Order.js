
export default class Order {
  /**
   * Constructeur
   * @constructor
   *
   * @param {String} id        - Identifiant de la commande
   * @param {String} orderDate - Date de commande
   * @param {Recipe} recipeId  - Recette commandée
   * @param {Int}    quantity  - Quantité commandée
   * @param {User}   userId    - Utilisateur qui commande
   */
  constructor(id, orderDate, recipeId, quantity, userId) {
    this.id        = id;
    this.orderDate = orderDate;
    this.recipeId  = recipeId;
    this.quantity  = quantity;
    this.userId    = userId;
  }
}
