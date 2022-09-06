$(function () {
  let toggled = false;
  $("#button").click(() => {
    if (toggled) {
      toggled = false;
      $("#documentation").hide();
      $("#button").html("Show Documentation");
    } else {
      toggled = true;
      $("#documentation").css({
        display: "flex",
        "justify-content": "center",
        "align-items": " center",
        "flex-wrap": "wrap",
        "flex-direction": "column",
      });
      $("#button").html("Hide Documentation");
    }
    $("#documenation").toggleClass("hide");
  });
});
