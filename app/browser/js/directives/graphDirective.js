angular.module('app').directive('linearChart', function($window) {
    return {
        restrict: "EA",
        template: "<svg></svg>",
        scope: { chartData: "=" },
        link: function(scope, elem, attr) {
            console.log(scope.chartData);
            var d3 = $window.d3;

            function parseData() {
                var parseDate = d3.time.format("%Y-%m-%d").parse;

                scope.chartData.forEach(function(d) {
                    typeof d.date === 'string' ? d.date = parseDate(d.date) : null;
                    d.value = +d.value;
                    return d;
                });
            }

            parseData(scope.chartData);

            var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = 1100 - margin.left - margin.right,
                height = 450 - margin.top - margin.bottom;

            var padding = 0;
            var pathClass = "path";
            var xScale, yScale, xAxisGen, yAxisGen, line;

            var rawSvg = elem.find("svg")[0];
            var svg = d3.select(rawSvg)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            function setChartParameters() {
                xScale = d3.time.scale()
                    .domain(d3.extent(scope.chartData, function(d) {
                        return d.date;
                    }))
                    .range([0, width]);

                yScale = d3.scale.linear()
                    .domain(d3.extent(scope.chartData, function(d) {
                        return d.value;
                    }))
                    .range([height, 0]);

                xAxisGen = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .outerTickSize(0)

                yAxisGen = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .outerTickSize(0)

                line = d3.svg.line()
                    .x(function(d) {
                        return xScale(d.date);
                    })
                    .y(function(d) {
                        return yScale(d.value);
                    })
            }

            function drawLineChart() {

                setChartParameters();

                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxisGen)


                svg.append("svg:g")
                    .attr("class", "y axis")
                    .call(yAxisGen)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("dy", "1em")
                    .style("text-anchor", "end")
                    .text("Value")

                svg.append("svg:path")
                    .attr({
                        d: line(scope.chartData),
                        "class": "line"
                    });
            }

            drawLineChart();


            function redrawLineChart() {
                parseData();
                setChartParameters();
                svg.selectAll("g.y.axis").call(yAxisGen);
                svg.selectAll("g.x.axis").call(xAxisGen);

                svg.selectAll("." + pathClass)
                    .attr({
                        d: line(scope.chartData)
                    });
            }

            scope.$watch("chartData", function(newVal, oldVal) {
                scope.chartData = newVal;
                redrawLineChart();
            }, true);
        }
    };
});