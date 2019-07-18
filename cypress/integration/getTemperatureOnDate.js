describe("Get city weather", function (){
    before(function () {
        cy.fixture('cityWithTime').as('cityWithTime')
    })

    function is_in_list(list, searchitem){
        var result = false;
        list.forEach((row) => {
        if (row.created.indexOf(searchitem) != -1){
                result = true;
            }
        })
        return result;
    }

    it("Get San Francisco temperature", function (){
        cy.get('@cityWithTime')
            .then((cityData) => {
                cityData.data.forEach((element) => {
                let newtime =  element.date.split("-").reverse().join("/");
                cy.request({
                    "url": '/api/location/' + element.woeid+'/' + newtime ,
                    "method": "GET"
                })
                .then((resp) => {
                    expect(resp.status).to.eq(200);
                    let search =  element.date.split("-").reverse().join("-") +'T' + element.time.substr(0,3);
                    expect(is_in_list(resp.body, search)).to.be.true;
                });
            });
        });
    })
})