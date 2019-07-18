describe("Get city lattitude longitude", function (){
    before(function () {
        cy.fixture('cityData').as('cityData')
    })

    it("Get San Francisco temperature", function (){
        cy.get('@cityData')
          .then((cityData) => {
            cityData.data.forEach((element) => {
                cy.request({
                        "url": '/api/location/search/?query='+element.name,
                        "method": "GET"
                    })
                    .then((resp) => {
                    expect(resp.status).to.eq(200);
                    expect(resp.body[0].latt_long).to.eq(element.longlatt);
                });
            });
        });
    })
})