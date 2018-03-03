var slideIndex = 1;
var currentModal = 0;

function next() {
    showDivs(slideIndex += 1);
}
function previous() {
    showDivs(slideIndex -= 1);
}

function setDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.querySelectorAll(".mySlides#project-" + currentModal);
    var dots = document.querySelectorAll(".dot#project-" + currentModal);
    if (n >= x.length) {slideIndex = 0}
    if (n < 0) {slideIndex = x.length-1}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" active", "");
    }
    x[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}

// $(document).ready(function() {
    $('.portfolio-modal').on('show.bs.modal', function () {
        currentModal = $(this).data('id');
        setDiv(0);
    });
// });


/*

function showDivs(modalId, n) {
  var i;
  var x = document.querySelectorAll(".mySlides#project-" + modalId);
  var dots = document.getElementsByClassName("demo");
  console.log(x);
  if (n > x.length) {slideIndex = 0}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex].style.display = "block";
  dots[slideIndex].className += " w3-white";
}
*/
