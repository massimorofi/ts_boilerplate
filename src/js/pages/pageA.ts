const Chart = require('chart.js');
//const utils = require('./js');

export class MyGraph {
    chartData: any;
    constructor() {
        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
                data: [
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint()
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: 'red',
                data: [
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint()
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: 'green',
                data: [
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint(),
                    randomPoint()
                ]
            }]

        };

        function randomPoint() {
            return Math.round(Math.random()*50);
        };
    }


   drawChart () {
        var ctx = document.getElementById('my-chart');
        var myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: this.chartData,
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Combo Bar Line Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            }
        });
        return myMixedChart;
    };

}
