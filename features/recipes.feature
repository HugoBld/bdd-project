Feature: Recipes management
  Scenario: List recipes
    When I list all "recipes"
    Then I should have response "OK"
     And following "recipes" list:
       |                                   id |                name | ingredients                                | procedure                                                               |
       | a35ce12d-d52b-4a07-90ad-68e985b779e7 | Chausson aux pommes | pommes, pate feuilletée, sucre             | faire compote, former chausson, cuire                                   |
       | dc466424-4297-481a-a8de-aa0898852da1 | Quiche thon tomate  | thon, tomate, pate feuilletée, oeuf, creme | couper thon, tomates, mélanger creme et oeufs, mettre dans moule, cuire |

  Scenario: Get a recipe
    When I get the "recipe" having id "dc466424-4297-481a-a8de-aa0898852da1"
    Then I should have response "OK"
     And following "recipe" item:
       |                                   id |                name | ingredients                                | procedure                                                               |
       | dc466424-4297-481a-a8de-aa0898852da1 | Quiche thon tomate  | thon, tomate, pate feuilletée, oeuf, creme | couper thon, tomates, mélanger creme et oeufs, mettre dans moule, cuire |

  Scenario: Get an inexistant recipe
    When I get the "recipe" having id "f2514f8b-2c0e-47d5-bfe6-34ef89bab6dc"
    Then I should have response "NOT_FOUND"
     And following error : "Recipe with id f2514f8b-2c0e-47d5-bfe6-34ef89bab6dc not found"

  Scenario: Create a recipe
    When I create the following "recipe":
       |              name | ingredients                                  | procedure                                                                    |
       | Gratin dauphinois | pomme de terre, lait, beurre, fromage, creme | couper pommes de terre, les bouillir dans lait, cuire dans plat avec fromage |
    Then I should have response "CREATED"
     And following new "recipe" item:
       |              name | ingredients                                  | procedure                                                                    |
       | Gratin dauphinois | pomme de terre, lait, beurre, fromage, creme | couper pommes de terre, les bouillir dans lait, cuire dans plat avec fromage |

  Scenario: Update a recipe
    When I update the "recipe" having id "a35ce12d-d52b-4a07-90ad-68e985b779e7" with following data:
       |      name | ingredients             | procedure                                       |
       | Croissant | pate feuilletée, beurre | couper un triangle, mettre le beurre, le rouler |
    Then I should have response "OK"
     And following "recipe" item:
       |                                   id |      name | ingredients             | procedure                                       |
       | a35ce12d-d52b-4a07-90ad-68e985b779e7 | Croissant | pate feuilletée, beurre | couper un triangle, mettre le beurre, le rouler |

  Scenario: Update an inexistant recipe
    When I update the "recipe" having id "340e6ab1-31ff-421a-bf5f-f8280db3b754" with following data:
       |      name | ingredients             | procedure                                       |
       | Croissant | pate feuilletée, beurre | couper un triangle, mettre le beurre, le rouler |
    Then I should have response "NOT_FOUND"
     And following error : "Recipe with id 340e6ab1-31ff-421a-bf5f-f8280db3b754 not found"

  Scenario: Delete a recipe
    When I delete the "recipe" having id "dc466424-4297-481a-a8de-aa0898852da1"
    Then I should have response "OK"
     And following deleted "recipe" item:
       |                                   id |                name | ingredients                                | procedure                                                               |
       | dc466424-4297-481a-a8de-aa0898852da1 | Quiche thon tomate  | thon, tomate, pate feuilletée, oeuf, creme | couper thon, tomates, mélanger creme et oeufs, mettre dans moule, cuire |

  Scenario: Delete an inexistant recipe
    When I delete the "recipe" having id "340e6ab1-31ff-421a-bf5f-f8280db3b754"
    Then I should have response "NOT_FOUND"
     And following error : "Recipe with id 340e6ab1-31ff-421a-bf5f-f8280db3b754 not found"
