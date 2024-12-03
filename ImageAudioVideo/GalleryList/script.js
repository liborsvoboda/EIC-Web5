var imageThumbs = document.getElementById("lightbox");
var currentImage = document.getElementById("current-image");

for (var i = 1; i <= 104; i++) {
  var thumb = document.createElement("img");
  thumb.src = "images/" + i + ".png";
  thumb.alt = "Image " + i;
  thumb.classList.add("thumb");
  imageThumbs.appendChild(thumb);
  thumb.addEventListener(
    "click", function() {
      currentImage.src = this.src;
    }
  );
}