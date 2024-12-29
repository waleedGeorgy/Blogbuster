$("textarea").on("input", function () {
  var maxlength = $(this).attr("maxlength");
  var currentLength = $(this).val().length;

  if (currentLength >= maxlength) {
    $("#charLimit").text("You reached the character limit");
  } else {
    $("#charLimit").text(`${maxlength - currentLength} characters left`);
  }
});