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

      cy.wait(5000)

      cy.get('.pac-item').eq(0).click({force: true})

      cy.wait(5000)

    })


    it("Add products to cart", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA')

      cy.wait(5000)

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

      cy.wait(5000)

      cy.get('.popover-header').should('have.text', 'Invalid Address')

    })

    it("Changing address in the “DELIVER TO” valid clicking use original", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.wait(5000)

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")


      cy.get(':nth-child(4) > .row-cols-2 > :nth-child(2)')
        .click()

      cy.get('#add-to-cart-button').click()

      cy.url()
        .should("eq", "https://www.herb.delivery/store/cart")

      cy.wait(3000)

      cy.get('#ship-address') 
        .type("{selectall}{del}2208 Sawtelle Boulevard, Los Angeles, CA 900")

      cy.wait(3000)
   
      cy.get('.pac-item').eq(0).click({force: true})

      cy.get('#changeAddressModal').should('exist')

      cy.contains("Use Original Address").click()

      //cy.get('#ship-address').should('have.text', '1000 S Lorena St, Los Angeles, CA 90023, USA')

    })

    it("Changing address in the “DELIVER TO” valid clicking change address", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.wait(5000)

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")


      cy.get(':nth-child(4) > .row-cols-2 > :nth-child(2)')
        .click()

      cy.get('#add-to-cart-button').click()

      cy.url()
        .should("eq", "https://www.herb.delivery/store/cart")

      cy.wait(3000)

      cy.get('#ship-address') 
        .type("{selectall}{del}2208 Sawtelle Boulevard, Los Angeles, CA 900")

      cy.wait(3000)
   
      cy.get('.pac-item').eq(0).click({force: true})

      cy.get('#changeAddressModal').should('exist')

      cy.contains("Change address").click()

    })

    it("Summary checkout", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.url()
        .should("eq", "https://www.herb.delivery/store")

      cy.get('.search-products-wrapper > .twitter-typeahead > #keywords')
        .type('Raspberry Gummies (S){enter}')

      cy.get('[data-hook="search_results"] > .row > :nth-child(1)')        
        .click()

        cy.get('#button-increase-quantity').click()

        cy.get('#add-to-cart-button').click()

        cy.wait(5000)
        
        cy.get('.search-products-wrapper > .twitter-typeahead > #keywords')
          .type('Mixed Berry Gummies (H){enter}')
  
        cy.get(':nth-child(1) > .product-thumbnail > :nth-child(1) > .product-thumbnail-image-wrapper > .lazyload')
          .click()

        cy.get('#quantity').type('{selectAll}{del}'+number+'')
  
        cy.get('#add-to-cart-button').click()

        cy.url()
        .should("eq", "https://www.herb.delivery/store/cart")

        cy.contains("Cart")

        cy.contains("Raspberry Gummies (S)")

        cy.contains("Mixed Berry Gummies (H)")

        cy.get('#empty-cart > h2').should('exist')    
        
        cy.get('#order-total > .text-nowrap').should('exist')

        cy.get('#order-total > .text-right').should('exist')

        cy.contains("$72.00 + Tax")

        cy.get('#checkout-link').click()

        cy.url()
          .should("eq", "https://www.herb.delivery/store/checkout/registration")
        
    })

    /*
    it("Search bar valid information", () => {
      cy.visit("/")

      cy.contains("Yes")
        .click()

      cy.get('#landing-search-address')
        .type('1000 S Lorena St, Los Angeles, CA 90023, USA{enter}')

      cy.get('.pac-item').eq(0).click({force: true})

      cy.get('.search-products-wrapper > .twitter-typeahead > #keywords')
        .type('All vaporizers{enter}')

      cy.contains("Search results for 'All vaporizers'")
        .should('exist')

    })

    it("Search bar invalid information", () => {
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

    })*/

})