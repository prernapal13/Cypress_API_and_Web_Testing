@google
Feature: Testing some API endpoints (tests/api)

  I want to do Testing some API endpoints (tests/api)

  Scenario: Test for all authorisation
    
    When publickey is missing in api call "/v1/public/series"
    Then Verify status code 409 and message "You must provide a user key."
    
    When hash is missing in api call "/v1/public/series"
    Then Verify status code 409 and message "You must provide a hash."

    When timestamp is missing in api call "/v1/public/series"
    Then Verify status code 409 and message "You must provide a timestamp."

    When invalid hash in api call "/v1/public/series"
    Then Verify status code 401 and message "That hash, timestamp and key combination is invalid."

    When HTTP verb which is not allowed in api call "/v1/public/series"
    Then Verify status code 405 and message "POST is not allowed"

  Scenario: Verfiy status code 200 and response payload matches "Comic" type definition
    
    When api call "/v1/public/comics/27649"
    Then Verify status code 200 and response payload matches "Comic" type definition

  Scenario: Verfiy name of character is "Spider-Man (Ultimate)" & last modification was after January 2014
    
    When api call "/v1/public/characters/1011010"
    Then Verify name of character is "Spider-Man (Ultimate)"
    And Verify last modification was after January 2014

  Scenario: Verfiy status code 404 & character name "Spider-Man (Ultimate)" is not returned
    
    When api call "/v1/public/characters/1011010xxxxxx"
    Then Verify status code 404

