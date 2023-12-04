describe('Test basic functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/')
  })

  it('should show number button clicks on display then clear', () => {
    for (let i = 0; i <= 9; i++) {
      const num = cy.get(`[value="${i}"]`)
      num.click()
    }
    
    let display = cy.get('.calculator__display')
    display.should("contain", '0123456789')

    const clear = cy.get('.equal')
    clear.click()

    display = cy.get('.calculator__display')
    display.should('contain', "")
  })

  it('should be able to add', () => {
    const numFive = cy.get('[value="5"]')
    numFive.click()

    const add = cy.get('[value="+"]')
    add.click()

    let log = cy.get('.calculator__log')
    log.should('contain', '5+')

    numFive.click()

    const equal = cy.get('.equal')
    equal.click()

    log = cy.get('.calculator__log')
    log.should('contain', '10')
  })


  it('should be able to multiply', () => {
    cy.get('[value="8"]').click()
    cy.get('[value="*"]').click()
    cy.get('.calculator__log').should('contain', '8*')
    cy.get('[value="5"]').click()
    cy.get('.equal').click()

    cy.get('.calculator__log').should('contain', '40')
  })


  it('should be able to subtract', () => {
    const numEight = cy.get('[value="8"]')
    numEight.click()

    const subtract = cy.get('[value="-"]')
    subtract.click()

    let log = cy.get('.calculator__log')
    log.should('contain', '8-')

    cy.get('[value="6"]').click()

    const equal = cy.get('.equal')
    equal.click()

    log = cy.get('.calculator__log')
    log.should('contain', '2')
  })


  it('should be able to divide', () => {
    const numEight = cy.get('[value="8"]')
    numEight.click()

    const divide = cy.get('[value="/"]')
    divide.click()

    let log = cy.get('.calculator__log')
    log.should('contain', '8/')

    cy.get('[value="2"]').click()

    const equal = cy.get('.equal')
    equal.click()

    log = cy.get('.calculator__log')
    log.should('contain', '4')
  })
})