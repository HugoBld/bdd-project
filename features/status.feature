Feature: Status check
  Scenario: Status check
    When I get the "status"
    Then I should have response "OK"
     And following "status" item:
       | api |
       |  ok |
