$(function () {
  var toggled = false;
  // jQuery
  $("svg").click(function () {
    toggled = !toggled;

    if (toggled) {
      $("#outer_circle").animate({ r: 500, "fill-opacity": 0 });
      $("#inner_circle").animate({ r: 450, "fill-opacity": 0 });
      $("#triangle").animate({ "fill-opacity": 0 });
      $("#rectangle").animate({
        "fill-opacity": 0,
        height: 10,
        width: 10,
        x: 245,
        y: 245,
      });
      $("#frame").animate({ "stroke-width": 10 });
    } else {
      $("#outer_circle").animate({ r: 100, "fill-opacity": 0.7 });
      $("#inner_circle").animate({ r: 22.5, "fill-opacity": 1 });
      $("#triangle").animate({ "fill-opacity": 1 });
      $("#rectangle").animate({
        "fill-opacity": 1,
        height: 80,
        width: 80,
        x: 210,
        y: 210,
      });
      $("#frame").animate({ "stroke-width": 1 });
    }
  });
});
