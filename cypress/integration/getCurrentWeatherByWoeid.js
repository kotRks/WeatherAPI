describe("Get weather by WoeId", function (){
    before(function () {
        cy.fixture('cityWOEID').as('cityWOEID')
    })

    it("Get San Francisco temperature", function (){
        cy.get('@cityWOEID')
            .then((cityData) => {
            cityData.data.forEach((element) => {
                cy.request({
                    "url": '/api/location/'+ element.woeid+'/',
                    "method": "GET"
                })
                .then((resp) => {
                    expect(resp.status).to.eq(200);
                    expect(resp.body.consolidated_weather[0]).to.have.property('the_temp');
                    expect(resp.body.consolidated_weather[0]).to.have.property('wind_speed');
                    expect(resp.body.consolidated_weather[0]).to.have.property('weather_state_name');
                });
            });
        });
    })
})