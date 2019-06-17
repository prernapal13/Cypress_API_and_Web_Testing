import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

const url = "https://www.bergfreunde.eu/";

Given(`I open bergfreunde page`, () => {
  cy.visit(url);
});

Then(`I see {string} in the title`, title => {
  cy.title().should("include", title);
});

When(`I search for {string}`, searchTxt => {
  cy.get('[title="Start your search!"]',{timeout: 9000}).click();
  cy.get("input[name='searchparam']",{timeout: 9000}).type(searchTxt);
  cy.get('[title="Start your search!"]',{timeout: 9000}).click();
});


And(`I click on the first product`, () => {
  cy.get('#product-list > li',{timeout: 9000}).eq(0).find("div.product-title").then(($product) =>{
	  return $product.text();
  }).as("product");
  cy.get('#product-list > li',{timeout: 9000}).eq(0).click();
});

Then(`I land on first product page`, () => {
  cy.get(".product-title").eq(1).then(($prod) => {
	  cy.get("@product").then(($x) => {
	  expect($x).is.eql($prod.text())
	})
  });
});

Then(`I select color and size`, () => {
  cy.get('#js-varlist-color > li > a',{timeout: 9000}).eq(0).click();
  cy.get('#js-varlist-size > li',{timeout: 9000}).eq(0).click();
  cy.get('#js-varlist-color > li > a',{timeout: 9000}).eq(0).click();
  cy.get('.js-fprice > span',{timeout: 9000}).then(($price) =>{
	  return $price.text();
  }).as("price");
});

And(`Retrieve product price`, () => {
  cy.get('.js-fprice > span',{timeout: 9000}).then(($price) =>{
	  return $price.text();
  }).as("price");
  cy.get("@price").then(($x) => {
	  expect($x).is.eql('134.96')
  });
});

And(`Verify Weight information present`, () => {
  cy.contains('Weight:').should('be.visible');
});

And(`Verify details about the return policy {string}`, returnPolicy => {
  cy.get("ul.details-advantages-snippet > li").eq(2).then(($policy) => {
	  expect($policy.text()).contains(returnPolicy)	  
  });
});

And(`Verify at least one user review visible`, () => {
  cy.get("#contributionstream").scrollIntoView();
  cy.get(".user-name").then(($x) =>{
    expect($x).to.have.length.of.at.least(1);
  });
});

When(`I add product to basket`, () => {
  cy.contains("add to cart",{timeout: 9000}).click();
});

Then(`Verify product on add to cart modal`, () => {
  cy.get('div.open > div.popup',{timeout: 9000}).should("be.visible");
  cy.get('div.open > div.popup',{timeout: 9000}).then(function($popup) {
      const $body = $popup.contents().find('span');
      cy.wrap($body).eq(0).then(($prod) => {
      cy.get("@product").then(($x) => {
        expect($x).is.eql($prod.text())
        });
      });
	  });  
});

And(`Close add to cart modal`, () => {
  cy.get(".close-reveal-modal").click();
});

When(`I navigate to checkout basket`, () => {
  cy.contains("go to cart").click({force:true});
});

Then(`I verify product title`, () => {
  cy.get('.product--title').then(($prod) => {
	  cy.get("@product").then(($x) => {
	  expect($x).is.eql($prod.text().trim())
	})
  });
});

And(`Verify total price`, () => {
  cy.get('span.totalprice').then(($total) => {
    var tPrice = Number($total.text().split(" ")[1].replace(/,/g, '.'));
	  cy.get("@price").then(($x) => {
      var totalPrice = Number($x)*2
	  expect(totalPrice).is.eql(tPrice)
	})
  });
});

And(`Verify voucher code {string} is not working`, voucherCode => {
  cy.get(".vouchercode").type(voucherCode);
  cy.get("button[title='Redeem']").click();
  cy.get("div[class='voucher-errors clearfix']").then(($voucherNotApprovedText) =>{
    expect($voucherNotApprovedText.text()).contains("Your voucher '" + voucherCode + "' was not approved.")
  });
});

And(`Verify login form and create an account appear to proceed checkout`, () => {
  cy.get("button[title='Go to checkout']").eq(1).click();
  cy.get("button[title='Login']").should('be.visible');
  cy.get("button[title='Create an account']").should('be.visible');
});
