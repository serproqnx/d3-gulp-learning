$(function() {
  'use strict';
  var d3 = window.d3;

  /////////////////////////////
  // Adding a horizontal guide
  ///////////////////////////// 

  var bardata = [];

  for (var i = 0; i < 50; i++) {
    bardata.push(Math.round(Math.random()*100)+20);
  }

  bardata.sort(function compareNumbers(a,b) {
    return a-b;
  });

  var height = 400,
      width = 600,
      barWidth = 50,
      barOffset = 5;
  var tempColor;

  var colors = d3.scale.linear()
    .domain([0, bardata.length*0.33, bardata.length*0.66, bardata.length])
    .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

  var yScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, height]);

  var xScale = d3.scale.ordinal()
    .domain(d3.range(0, bardata.length))
    .rangeBands([0, width]);

  var tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)
  ;


  var myChart = d3.select('#chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .selectAll('rect').data(bardata)
      .enter().append('rect')
        .style('fill', function(d,i) {
          return colors(i);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function(d,i) {
          return xScale(i);
        })
        .attr('height', 0)
        .attr('y', height)
      .on('mouseover', function(d) {

        tooltip.transition()
          .style('opacity', 0.9);

        tooltip.html(d)
          .style('left', (d3.event.pageX - 35) + 'px')
          .style('top', (d3.event.pageY - 30) + 'px');

        tempColor = this.style.fill;
        d3.select(this)
          .style('opacity', 0.5)
          .style('fill', 'yellow');
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .style('opacity', 1)
          .style('fill', tempColor);
      })
      ;

  myChart.transition()
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    .delay(function(d,i) {
      return i * 10;
    })
    .duration(1000)
    .ease('elastic')
    ;

  var vGuideScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([height, 0]);

  var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10)
    ;

  var vGuide = d3.select('svg').append('g');
    vAxis(vGuide);

    vGuide.attr('transform', 'translate(35, 0)');
    vGuide.selectAll('path')
        .style({ fill: 'none', stroke: '#000'});
    vGuide.selectAll('line')
        .style({ stroke: '#000'});

  var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d,i) {
      return (!(i % (bardata.length/5)));
    }));

    var hGuide = d3.select('svg').append('g');
    hAxis(hGuide);
    hGuide.attr('transform', 'translate(0, ' + (height-30)+')');
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: '#000'});
    hGuide.selectAll('line')
        .style({ stroke: '#000'});

  /////////////////////////////
  // Grouping, sorting and adding axes
  ///////////////////////////// 

  // var bardata = [];

  // for (var i = 0; i < 50; i++) {
  //   bardata.push(Math.round(Math.random()*100)+20);
  // }

  // bardata.sort(function compareNumbers(a,b) {
  //   return a-b;
  // });

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;
  // var tempColor;

  // var colors = d3.scale.linear()
  //   .domain([0, bardata.length*0.33, bardata.length*0.66, bardata.length])
  //   .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([0, height]);

  // var xScale = d3.scale.ordinal()
  //   .domain(d3.range(0, bardata.length))
  //   .rangeBands([0, width]);

  // var tooltip = d3.select('body').append('div')
  //   .style('position', 'absolute')
  //   .style('padding', '0 10px')
  //   .style('background', 'white')
  //   .style('opacity', 0)
  // ;


  // var myChart = d3.select('#chart').append('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .selectAll('rect').data(bardata)
  //     .enter().append('rect')
  //       .style('fill', function(d,i) {
  //         return colors(i);
  //       })
  //       .attr('width', xScale.rangeBand())
  //       .attr('x', function(d,i) {
  //         return xScale(i);
  //       })
  //       .attr('height', 0)
  //       .attr('y', height)
  //     .on('mouseover', function(d) {

  //       tooltip.transition()
  //         .style('opacity', 0.9);

  //       tooltip.html(d)
  //         .style('left', (d3.event.pageX - 35) + 'px')
  //         .style('top', (d3.event.pageY - 30) + 'px');

  //       tempColor = this.style.fill;
  //       d3.select(this)
  //         .style('opacity', 0.5)
  //         .style('fill', 'yellow');
  //     })
  //     .on('mouseout', function(d) {
  //       d3.select(this)
  //         .style('opacity', 1)
  //         .style('fill', tempColor);
  //     })
  //     ;

  // myChart.transition()
  //   .attr('height', function(d) {
  //     return yScale(d);
  //   })
  //   .attr('y', function(d) {
  //     return height - yScale(d);
  //   })
  //   .delay(function(d,i) {
  //     return i * 10;
  //   })
  //   .duration(1000)
  //   .ease('elastic')
  //   ;

  // var vGuideScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([height, 0]);

  // var vAxis = d3.svg.axis()
  //   .scale(vGuideScale)
  //   .orient('left')
  //   .ticks(10)
  //   ;

  // var vGuide = d3.select('svg').append('g');
  //   vAxis(vGuide);

  //   vGuide.attr('transform', 'translate(35, 0)');
  //   vGuide.selectAll('path')
  //       .style({ fill: 'none', stroke: '#000'});
  //   vGuide.selectAll('line')
  //       .style({ stroke: '#000'});

  /////////////////////////////
  // Using transition and animation
  ///////////////////////////// 

  // var bardata = [];

  // for (var i = 0; i < 50; i++) {
  //   bardata.push(Math.round(Math.random()*30)+20);
  // }

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;
  // var tempColor;

  // var colors = d3.scale.linear()
  //   .domain([0, bardata.length*0.33, bardata.length*0.66, bardata.length])
  //   .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([0, height]);

  // var xScale = d3.scale.ordinal()
  //   .domain(d3.range(0, bardata.length))
  //   .rangeBands([0, width]);

  // var tooltip = d3.select('body').append('div')
  //   .style('position', 'absolute')
  //   .style('padding', '0 10px')
  //   .style('background', 'white')
  //   .style('opacity', 0)
  // ;


  // var myChart = d3.select('#chart').append('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .selectAll('rect').data(bardata)
  //     .enter().append('rect')
  //       .style('fill', function(d,i) {
  //         return colors(i);
  //       })
  //       .attr('width', xScale.rangeBand())
  //       .attr('x', function(d,i) {
  //         return xScale(i);
  //       })
  //       .attr('height', 0)
  //       .attr('y', height)
  //     .on('mouseover', function(d) {

  //       tooltip.transition()
  //         .style('opacity', 0.9);

  //       tooltip.html(d)
  //         .style('left', (d3.event.pageX - 35) + 'px')
  //         .style('top', (d3.event.pageY - 30) + 'px');

  //       tempColor = this.style.fill;
  //       d3.select(this)
  //         .style('opacity', 0.5)
  //         .style('fill', 'yellow');
  //     })
  //     .on('mouseout', function(d) {
  //       d3.select(this)
  //         .style('opacity', 1)
  //         .style('fill', tempColor);
  //     })
  //     ;

  // myChart.transition()
  //   .attr('height', function(d) {
  //     return yScale(d);
  //   })
  //   .attr('y', function(d) {
  //     return height - yScale(d);
  //   })
  //   .delay(function(d,i) {
  //     return i * 10;
  //   })
  //   .duration(1000)
  //   .ease('elastic')
  //   ;


  /////////////////////////////
  // Using transition and animation
  ///////////////////////////// 

//   var bardata = [];

//   for (var i = 0; i < 50; i++) {
//     bardata.push(Math.random()*30);
//   }

//   var height = 400,
//       width = 600,
//       barWidth = 50,
//       barOffset = 5;

//   var colors = d3.scale.linear()
//     .domain([0, bardata.length*0.33, bardata.length*0.66, bardata.length])
//     .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

//   var yScale = d3.scale.linear()
//     .domain([0, d3.max(bardata)])
//     .range([0, height]);

//   var xScale = d3.scale.ordinal()
//     .domain(d3.range(0, bardata.length))
//     .rangeBands([0, width]);

//     var tempColor;

// var myChart = d3.select('#chart').append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .selectAll('rect').data(bardata)
//     .enter().append('rect')
//       .style('fill', function(d,i) {
//         return colors(i);
//       })
//       .attr('width', xScale.rangeBand())
//       .attr('x', function(d,i) {
//         return xScale(i);
//       })
//       .attr('height', 0)
//       .attr('y', height)
//     .on('mouseover', function(d) {
//       tempColor = this.style.fill;
//       d3.select(this)
//         .style('opacity', 0.5)
//         .style('fill', 'yellow');
//     })
//     .on('mouseout', function(d) {
//       d3.select(this)
//         .style('opacity', 1)
//         .style('fill', tempColor);
//     })
//     ;

//     myChart.transition()
//       .attr('height', function(d) {
//         return yScale(d);
//       })
//       .attr('y', function(d) {
//         return height - yScale(d);
//       })
//       .delay(function(d,i) {
//         return i * 10;
//       })
//       .duration(1000)
//       .ease('elastic')

  /////////////////////////////
  // Adding events
  ///////////////////////////// 

  // var bardata = [];

  // for (var i = 0; i < 50; i++) {
  //   bardata.push(Math.random()*30);
  // }

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;

  // var colors = d3.scale.linear()
  //   .domain([0, bardata.length*0.33, bardata.length*0.66, bardata.length])
  //   .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([0, height]);

  // var xScale = d3.scale.ordinal()
  //   .domain(d3.range(0, bardata.length))
  //   .rangeBands([0, width]);

  // d3.select('#chart').append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .selectAll('rect').data(bardata)
  //   .enter().append('rect')
  //     .style('fill', function(d,i) {
  //       return colors(i);
  //     })
  //     .attr('width', xScale.rangeBand())
  //     .attr('height', function(d) {
  //       return yScale(d);
  //     })
  //     .attr('x', function(d,i) {
  //       return xScale(i);
  //     })
  //     .attr('y', function(d) {
  //       return height - yScale(d);
  //     })
  //     .on('mouseover', function(d) {
  //       d3.select(this)
  //         .style('opacity', 0.5);
  //     })
  //     .on('mouseout', function(d) {
  //       d3.select(this)
  //         .style('opacity', 1);
  //     })
  //     ;


  /////////////////////////////
  // Meaningful color scale
  ///////////////////////////// 

  // var bardata = [];

  // for (var i = 0; i < 50; i++) {
  //   bardata.push(Math.random()*30);
  // }

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;

  // var colors = d3.scale.linear()
  //   .domain([0, bardata.length*0.33, bardata.length*0.66, bardata.length])
  //   .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C']);

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([0, height]);

  // var xScale = d3.scale.ordinal()
  //   .domain(d3.range(0, bardata.length))
  //   .rangeBands([0, width]);

  // d3.select('#chart').append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .selectAll('rect').data(bardata)
  //   .enter().append('rect')
  //     .style('fill', function(d,i) {
  //       return colors(i);
  //     })
  //     .attr('width', xScale.rangeBand())
  //     .attr('height', function(d) {
  //       return yScale(d);
  //     })
  //     .attr('x', function(d,i) {
  //       return xScale(i);
  //     })
  //     .attr('y', function(d) {
  //       return height - yScale(d);
  //     })
  //     ;

  /////////////////////////////
  // Adding ordinal scales
  ///////////////////////////// 

  // var bardata = [20, 30, 105, 15, 40, 80, 20, 30, 105, 20, 30, 105, 15, 40, 80];

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([0, height]);

  // var xScale = d3.scale.ordinal()
  //   .domain(d3.range(0, bardata.length))
  //   .rangeBands([0, width]);

  // d3.select('#chart').append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .style('background', '#c9d7d6')
  //   .selectAll('rect').data(bardata)
  //   .enter().append('rect')
  //     .style('fill', '#c61c6f')
  //     .attr('width', xScale.rangeBand())
  //     .attr('height', function(d) {
  //       return yScale(d);
  //     })
  //     .attr('x', function(d,i) {
  //       return xScale(i);
  //     })
  //     .attr('y', function(d) {
  //       return height - yScale(d);
  //     })
  //     ;

  /////////////////////////////
  // Adding quantative scales
  ///////////////////////////// 

  // var bardata = [20, 30, 105, 15];

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(bardata)])
  //   .range([0, height]);

  // d3.select('#chart').append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .style('background', '#c9d7d6')
  //   .selectAll('rect').data(bardata)
  //   .enter().append('rect')
  //     .style('fill', '#c61c6f')
  //     .attr('width', barWidth)
  //     .attr('height', function(d) {
  //       return yScale(d);
  //     })
  //     .attr('x', function(d,i) {
  //       return i * (barWidth + barOffset);
  //     })
  //     .attr('y', function(d) {
  //       return height - yScale(d);
  //     })
  //     ;
 

  


  /////////////////////////////
  //Simple barchart
  /////////////////////////////  

  // var bardata = [20, 30, 145, 15];

  // var height = 400,
  //     width = 600,
  //     barWidth = 50,
  //     barOffset = 5;

  // d3.select('#chart').append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .style('background', '#c9d7d6')
  //   .selectAll('rect').data(bardata)
  //   .enter().append('rect')
  //     .style('fill', '#c61c6f')
  //     .attr('width', barWidth)
  //     .attr('height', function(d) {
  //       return d;
  //     })
  //     .attr('x', function(d,i) {
  //       return i * (barWidth + barOffset);
  //     })
  //     .attr('y', function(d) {
  //       return height - d;
  //     })
  //     ;



  /////////////////////////////
  //SVG
  /////////////////////////////


  // d3.select('#chart')
  //   .append('svg')
  //     .attr('width', 600)
  //     .attr('height', 400)
  //     .style('background', '#93A1A1')
  //   .append('rect')
  //     .attr('x', 200)
  //     .attr('y', 100)
  //     .attr('height', 200)
  //     .attr('width', 200)
  //     .style('fill', '#CB4B19');
  // d3.select('svg')
  //     .append('circle')
  //     .attr('cx', 300)
  //     .attr('cy', 200)
  //     .attr('r', '50')
  //     .style('fill', '#840043');



  /////////////////////////////
  //SELECTALL with data and etc
  /////////////////////////////

  // var myStyles = [
  //   { width : 200,
  //     name : 'Barrot Bellingham',
  //     color : '#268BD2'},
  //   { width : 230,
  //     name : 'Hassum Harrod',       
  //     color : '#BD3613'},
  //   { width : 220,
  //     name : 'Jennifer Jerome',   
  //     color : '#D11C24'},
  //   { width : 290,
  //     name : 'Richard Tweet',   
  //     color : '#C61C6F'},
  //   { width : 236,
  //     name : 'Lorenzo Garcia',   
  //     color : '#595AB7'},
  //   { width : 230,
  //     name : 'Xhou Ta',   
  //     color : '#2176C7'}
  //   ];

  // d3.selectAll('#chart').selectAll('div')
  //   .data(myStyles)
  //   .enter().append('div')
  //   .classed('item', true)
  //   .text(function(d) {
  //     return d.name;
  //   })
  //   .style({
  //     'color' : 'white',
  //     'background' : function(d) {
  //       return d.color;
  //     },
  //     'width' : function(d) {
  //       return d.width + 'px';
  //     }
  //   })
  //   ;

  /////////////////////////////
  //SELECTALL with style
  /////////////////////////////

  // d3.selectAll('.item:nth-child(3)')
  //   .style({
  //     'background' : '#268BD2',
  //     'padding': '10px',
  //     'margin' : '5px',
  //     'color' : '#EEE8D5'
  //   });
























  // //set up ScrollMagic
  // var controller = new ScrollMagic({
  //   globalSceneOptions: {
  //     triggerHook: 'onLeave'
  //   }
  // });

  //   //pin the navigation
  // var pin = new ScrollScene({
  //   triggerElement: '#nav',
  // }).setPin('#nav').addTo(controller);



//   var topoffset = 43;
//   var isTouch = 'ontouchstart' in document.documentElement;

//   //window height
//   var wheight = $(window).height(); //get height of the window

//   $('.fullheight').css('height', wheight);

//   $(window).resize(function() {
//     var wheight = $(window).height(); //get height of the window
//     $('.fullheight').css('height', wheight);
//   }); //on resize


// // Animated Scrolling
//   $('a[href*=#]:not([href=#])').click(function() {
//     if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: target.offset().top-topoffset
//         }, 1000);
//         return false;
//       } // target.length
//     } //location hostname
//   }); //on click

//   //highlight navigation
//   $(window).scroll(function() {
//     var windowpos = $(window).scrollTop() + topoffset;
//     $('nav li a').removeClass('active');

//     if (windowpos > $('#hotelinfo').offset().top) {
//       $('nav li a').removeClass('active');
//       $('a[href$="#hotelinfo"]').addClass('active');
//     } //windowpos

//     if (windowpos > $('#rooms').offset().top) {
//       $('nav li a').removeClass('active');
//       $('a[href$="#rooms"]').addClass('active');
//     } //windowpos

//     if (windowpos > $('#dining').offset().top) {
//       $('nav li a').removeClass('active');
//       $('a[href$="#dining"]').addClass('active');
//     } //windowpos

//     if (windowpos > $('#events').offset().top) {
//       $('nav li a').removeClass('active');
//       $('a[href$="#events"]').addClass('active');
//     } //windowpos

//     if (windowpos > $('#attractions').offset().top) {
//       $('nav li a').removeClass('active');
//       $('a[href$="#attractions"]').addClass('active');
//     } //windowpos

//   }); //window scroll






//   //pin the navigation
//   var pin = new ScrollScene({
//     triggerElement: '#nav',
//   }).setPin('#nav').addTo(controller);


//   if(!isTouch) {
//     //room animations
//     var roomOrigin = {
//       bottom: -700,
//       opacity: 0,
//       scale: 0
//     };

//     var roomDest = {
//       repeat: 1,
//       yoyo: true,
//       bottom: 0,
//       opacity: 1,
//       scale: 1,
//       ease: Back.easeOut
//     };

//     var roomtween = TweenMax.staggerFromTo(
//       '#westminster .content',
//       1, roomOrigin, roomDest);

//     pin = new ScrollScene({
//       triggerElement: '#westminster',
//       offset: -topoffset,
//       duration: 500
//     }).setPin('#westminster')
//       .setTween(roomtween)
//       .addTo(controller);


//     roomtween = TweenMax.staggerFromTo(
//       '#oxford .content',
//       1, roomOrigin, roomDest);

//     pin = new ScrollScene({
//       triggerElement: '#oxford',
//       offset: -topoffset,
//       duration: 500
//     }).setPin('#oxford')
//       .setTween(roomtween)
//       .addTo(controller);

//     roomtween = TweenMax.staggerFromTo(
//       '#victoria .content',
//       1, roomOrigin, roomDest);

//     pin = new ScrollScene({
//       triggerElement: '#victoria',
//       offset: -topoffset,
//       duration: 500
//     }).setPin('#victoria')
//       .setTween(roomtween)
//       .addTo(controller);

//     roomtween = TweenMax.staggerFromTo(
//       '#manchester .content',
//       1, roomOrigin, roomDest);

//     pin = new ScrollScene({
//       triggerElement: '#manchester',
//       offset: -topoffset,
//       duration: 500
//     }).setPin('#manchester')
//       .setTween(roomtween)
//       .addTo(controller);

//     roomtween = TweenMax.staggerFromTo(
//       '#piccadilly .content',
//       1, roomOrigin, roomDest);

//     pin = new ScrollScene({
//       triggerElement: '#piccadilly',
//       offset: -topoffset,
//       duration: 500
//     }).setPin('#piccadilly')
//       .setTween(roomtween)
//       .addTo(controller);


//     roomtween = TweenMax.staggerFromTo(
//       '#cambridge .content',
//       1, roomOrigin, roomDest);

//     pin = new ScrollScene({
//       triggerElement: '#cambridge',
//       offset: -topoffset,
//       duration: 500
//     }).setPin('#cambridge')
//       .setTween(roomtween)
//       .addTo(controller);
//   } //not a touch device


//   //atractions animation
//   var attractionstween = TweenMax.staggerFromTo('#attractions article', 1, { opacity: 0, scale: 0 },
//       {delay: 1, opacity: 1, scale: 1,
//         ease: Back.easeOut});


//   var scene = new ScrollScene({
//     triggerElement: '#attractions',
//     offset: -topoffset
//   }).setTween(attractionstween)
//     .addTo(controller);
}); //on load