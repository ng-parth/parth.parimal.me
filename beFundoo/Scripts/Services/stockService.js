fundooStockTicker.service('stockService', function () {
    var stockMaster =         [{ id: 'TWTR', name: "Twitter", price: 100, previous: 200 }, { id: 'FB', name: "Facebook", price: 120, previous: 250 }, { id: 'Google', name: "Google", price: 500, previous: 450 }]
    
    this.stockMaster= stockMaster;
}); 