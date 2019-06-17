@google
Feature: E2E tests for a checkout process

  I want to do E2E tests for a checkout process

  Scenario: E2E tests for a checkout process
    Given I open bergfreunde page
    Then I see "Outdoor Gear & Clothing | Outdoor Online Shop | Bergfreunde.eu" in the title
    When I search for "LUNDHAGS"
    And I click on the first product
    Then I land on first product page
    Then I select color and size
    And Retrieve product price
    And Verify Weight information present
    And Verify details about the return policy "30 days returns policy"
    And Verify at least one user review visible
    When I add product to basket
    Then Verify product on add to cart modal
    And Close add to cart modal
    When I add product to basket
    Then Verify product on add to cart modal
    When I navigate to checkout basket
    Then I verify product title
    And Verify total price
    And Verify voucher code "NotAvailable" is not working
    And Verify login form and create an account appear to proceed checkout

