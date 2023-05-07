Feature: Users management

Scenario: List users
    When I list all "users"
    Then I should have response "OK"
     And following "users" list:
      |                                   id |  lastName | firstName  | birthDate  | address | phone        | email                      |
      | ab724d8c-38c0-4f6c-ba66-944750217338 | BLANCHARD | Hugo       | 2000-12-17 | Nantes  | +33609080706 | hugo.blanchard17@gmail.com |
      | d8671313-020b-414e-a60a-589ba98999c6 | LEE       | Bruce      | 1999-01-13 | Nantes  | +33609086543 | bruce.lee@gmail.com        |

Scenario: Get user
    When I get the "user" having id "ab724d8c-38c0-4f6c-ba66-944750217338"
    Then I should have response "OK"
     And following "user" item:
      |                                   id |  lastName | firstName  | birthDate  | address | phone        | email                      |
      | ab724d8c-38c0-4f6c-ba66-944750217338 | BLANCHARD | Hugo       | 2000-12-17 | Nantes  | +33609080706 | hugo.blanchard17@gmail.com |

Scenario: Create a user
    When I create the following "user":
       |  lastName | firstName    | birthDate  | address | phone        | email                      |
       | DIOT      | Jeremy       | 1991-08-29 | Rennes  | +33634546789 | jeremy.diot@gmail.com      |
    Then I should have response "CREATED"
     And following new "user" item:
       |  lastName | firstName    | birthDate  | address | phone        | email                      |
       | DIOT      | Jeremy       | 1991-08-29 | Rennes  | +33634546789 | jeremy.diot@gmail.com      |

Scenario: Create a user with missing data
    When I create the following "user":
       |  lastName | firstName    | birthDate  | address | phone        | 
       | DIOT      | Jeremy       | 1991-08-29 | Rennes  | +33634546789 |
    Then I should have response "BAD_REQUEST"
    And following error : "Data is missing" 

Scenario: Create a user with invalid date
      When I create the following "user":
         |  lastName | firstName    | birthDate  | address | phone        | email                      |
         | DIOT      | Jeremy       | 29/08/1991 | Rennes  | +33634546789 | jeremy.diot@gmail.com      |
      Then I should have response "BAD_REQUEST"
      And following error : "BirthDate format is invalid : YYYY-MM-DD"

Scenario: Create a user with invalid phone number
      When I create the following "user":
         |  lastName | firstName    | birthDate  | address | phone        | email                      |
         | DIOT      | Jeremy       | 1991-08-29 | Rennes  | 634546789    | jeremy.diot@gmail.com      |
      Then I should have response "BAD_REQUEST"
      And following error : "Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres"

Scenario: Update a user
    When I update the "user" having id "ab724d8c-38c0-4f6c-ba66-944750217338" with following data:
       |  lastName     | firstName    | birthDate  | address | phone        | email                      |
       | GROLLIER      | Jeremy       | 1991-08-29 | Rennes  | +33634546789 | jeremy.diot@gmail.com      |
    Then I should have response "OK"
     And following "user" item:
       |                                   id |  lastName    | firstName    | birthDate  | address | phone        | email                      |
       | ab724d8c-38c0-4f6c-ba66-944750217338 | GROLLIER     | Jeremy       | 1991-08-29 | Rennes  | +33634546789 | jeremy.diot@gmail.com      |

Scenario: Update a user with invalid date
      When I update the "user" having id "ab724d8c-38c0-4f6c-ba66-944750217338" with following data:
         |  lastName     | firstName    | birthDate  | address | phone        | email                      |
         | GROLLIER      | Jeremy       | 29/08/1991 | Rennes  | +33634546789 | jeremy.diot@gmail.com      |
      Then I should have response "BAD_REQUEST"
      And following error : "BirthDate format is invalid : YYYY-MM-DD"

Scenario: Update a user with invalid phone number
      When I update the "user" having id "ab724d8c-38c0-4f6c-ba66-944750217338" with following data:
         |  lastName     | firstName    | birthDate  | address | phone        | email                         |
         | GROLLIER      | Jeremy       | 1991-08-29 | Rennes  | 634546789    | jeremy.diot@gmail.com         |
      Then I should have response "BAD_REQUEST"
      And following error : "Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres"

Scenario: Delete a user
    When I delete the "user" having id "ab724d8c-38c0-4f6c-ba66-944750217338"
    Then I should have response "OK"
     And following deleted "user" item:
       |                                   id |  lastName    | firstName    | birthDate  | address | phone        | email                 |
       | ab724d8c-38c0-4f6c-ba66-944750217338 | GROLLIER     | Jeremy       | 1991-08-29 | Rennes  | +33634546789 | jeremy.diot@gmail.com |
    