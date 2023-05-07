Feature: Orders management
    Scenario: List orders
        When I list all "orders"
        Then I should have response "OK"
            And following "orders" list:
                | id | orderDate | recipeId | quantity | userId |
                | 329d2e35-fdae-442e-aedf-88c8df8fccd1 | 2023-04-27 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999c6 |
                | 9105a30f-e667-4e91-8275-16f18a416fa3 | 2023-04-30 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 3 | ab724d8c-38c0-4f6c-ba66-944750217338 |

    Scenario: Get order
        When I get the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1"
        Then I should have response "OK"
            And following "order" item:
                | id | orderDate | recipeId | quantity | userId |
                | 329d2e35-fdae-442e-aedf-88c8df8fccd1 | 2023-04-27 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999c6 |

    Scenario: Get an inexistant order
        When I get the "recipe" having id "f2514f8b-2c0e-47d5-bfe6-34ef89bab6dc"
        Then I should have response "NOT_FOUND"
            And following error : "Recipe with id f2514f8b-2c0e-47d5-bfe6-34ef89bab6dc not found"

    Scenario: Create a order
        When I create the following "order":
        | orderDate | recipeId | quantity | userId |
        | 2023-05-07 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "CREATED"
            And following new "order" item:
            | orderDate | recipeId | quantity | userId |
            | 2023-05-07 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999c6 |

    Scenario: Create a order with inexistant recipe
         When I create the following "order":
        | orderDate | recipeId | quantity | userId |
        | 2024-07-05 | dc466424-4297-481a-a8de-aa0898852dzz | 1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "NOT_FOUND"
            And following error : "Recipe dc466424-4297-481a-a8de-aa0898852dzz not found"

    Scenario: Create a order with inexistant user
         When I create the following "order":
        | orderDate | recipeId | quantity | userId |
        | 2024-07-05 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999tt |
        Then I should have response "NOT_FOUND"
            And following error : "User d8671313-020b-414e-a60a-589ba98999tt not found"
        
    Scenario: Create a order with invalid date
         When I create the following "order":
        | orderDate | recipeId | quantity | userId |
        | 07/05/2024 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "BAD_REQUEST"
            And following error : "Order Date format is invalid : YYYY-MM-DD"

    Scenario: Create a order with missing data
         When I create the following "order":
        | orderDate | recipeId | userId |
        | 07/05/2024 | dc466424-4297-481a-a8de-aa0898852da1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "BAD_REQUEST"
            And following error : "Data is missing"

    Scenario: Update a order
        When I update the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1" with following data:
        | orderDate | recipeId | quantity | userId |
        | 2023-12-17 | dc466424-4297-481a-a8de-aa0898852da1 | 5 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "OK"
            And following updated "order" item:
            |                                    id| orderDate  | recipeId                             | quantity | userId                               |
            | 329d2e35-fdae-442e-aedf-88c8df8fccd1 | 2023-12-17 | dc466424-4297-481a-a8de-aa0898852da1 |        5 | d8671313-020b-414e-a60a-589ba98999c6 |

    Scenario: Update a order with missing data
         When I update the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1" with following data:
        | orderDate | recipeId | userId |
        | 07/05/2024 | dc466424-4297-481a-a8de-aa0898852da1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "BAD_REQUEST"
            And following error : "Data is missing"

    Scenario: Update a order with invalid date
         When I update the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1" with following data:
        | orderDate | recipeId | quantity | userId |
        | 07/05/2024 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "BAD_REQUEST"
            And following error : "Order Date format is invalid : YYYY-MM-DD"

    Scenario: Update a order with inexistant user
        When I update the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1" with following data:
        | orderDate | recipeId | quantity | userId |
        | 2024-07-05 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | d8671313-020b-414e-a60a-589ba98999tt |
        Then I should have response "NOT_FOUND"
            And following error : "User d8671313-020b-414e-a60a-589ba98999tt not found"

    Scenario: Update a order with inexistant recipe
        When I update the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1" with following data:
        | orderDate | recipeId | quantity | userId |
        | 2024-07-05 | dc466424-4297-481a-a8de-aa0898852dzz | 1 | d8671313-020b-414e-a60a-589ba98999c6 |
        Then I should have response "NOT_FOUND"
            And following error : "Recipe dc466424-4297-481a-a8de-aa0898852dzz not found"    

    Scenario: Delete a order
        When I delete the "order" having id "329d2e35-fdae-442e-aedf-88c8df8fccd1"
        Then I should have response "OK"
            And following deleted "order" item:
                | id | orderDate | recipeId | quantity | userId |
                | 329d2e35-fdae-442e-aedf-88c8df8fccd1 | 2023-12-17 | dc466424-4297-481a-a8de-aa0898852da1 | 5 | d8671313-020b-414e-a60a-589ba98999c6 |