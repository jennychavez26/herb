let number = 3;
describe("Guest user can make purchases", () => {

  it("Check coverage invalid", () => {
    cy.visit("/")

    cy.contains("Yes")
      .click()

    cy.get('#landing-search-address')
      .type('137 Arbor Vitae St, Inglewood, CA 90301, United States')

    cy.get('[class="pac-item"]').eq(0).click({force: true})

    cy.get('.modal-body > h2')
      .should('have.text',"We don't deliver to you...yet.")

    cy.get('.modal-body > :nth-child(2)')
      .should('have.text',"Enter your email and we'll let you know when we're delivering to your part of town. If you think this is a mistake, please contact us at (844) 437-2213 and we’ll check your address personally.")

  }) 

    it("Check coverage valid", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
      .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

    })

    it("Add products to the cart from the store", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
      .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
          .should("eq", "https://www.herb.delivery/store")

      cy.scrollTo(0, 1000)  
      
    })

    it("Add to cart from full product information", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")

      cy.scrollTo(0, 1000)  

      cy.get(':nth-child(4) > .row-cols-2 > :nth-child(2)')
        .click()

      cy.get('#quantity').type('{selectAll}{del}'+number+'')

      cy.get('#add-to-cart-button').click()

      cy.url()
        .should("eq", "https://www.herb.delivery/store/cart")

     /* cy.get('.shopping-bag-item-count')
        .should('have', number)*/

      cy.contains('Cart').should('exist')

      cy.get('#order_line_items_attributes_0_quantity')
        .should('have.value', number)

    })

    it("From the cart remove products", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
       .should("eq", "https://www.herb.delivery/store")

      cy.scrollTo(0, 800)  

      cy.get(':nth-child(4) > .row-cols-2 > :nth-child(2)')
        .click()

      cy.get('#quantity').type('{selectAll}{del}'+number+'')

      cy.get('#add-to-cart-button').click()

      cy.url()
        .should("eq", "https://www.herb.delivery/store/cart")

      cy.contains('Remove').click()

    })

    it("Changing address in the “DELIVER TO” invalid", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")

      cy.get('#ship-address')
        .type("{selectall}{del}1126 Queens Hwy, Long Beach, CA 90802, United States")
   
      cy.get('.pac-item').eq(0).click({force: true})

      cy.get('.popover-header').should('have.text', 'Invalid Address')

    })

    it("Changing address in the “DELIVER TO” valid clicking use original", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")


      cy.get(':nth-child(4) > .row-cols-2 > :nth-child(2)')
        .click()

      cy.get('#quantity').type('{selectAll}{del}'+number+'')

      cy.get('#add-to-cart-button').click()

      cy.get('#ship-address') 
        .type("{selectall}{del}610 Lairport St, El Segundo, CA 90245, United States")
   
      cy.get('.pac-item').eq(0).click({force: true})

      cy.get('#changeAddressModal').should('exist')

      cy.contains("Use Original Address").click()

      //cy.get('#ship-address').should('have.text', '1000 S Lorena St, Los Angeles, CA 90023, USA')

    })

    it("Search bar valid information", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")

      cy.get('.search-products-wrapper > .twitter-typeahead > #keywords')
        .type('All vaporizers{enter}')

      cy.contains("Search results for 'All vaporizers'")
        .should('exist')

    })

    it.only("Search bar invalid information", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")

      cy.get('.search-products-wrapper > .twitter-typeahead > #keywords')
        .type('Missing products{enter}')

      cy.contains("Sorry, we have no products. Try another search term or try clearing filters.")
        .should('exist')

    })

    
})