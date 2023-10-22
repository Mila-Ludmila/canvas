document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  var drawing = false;
  var currentShape = "rectangle";
  var currentColor = "";
  var startX, startY;

  document.getElementById("shape").addEventListener("change", function () {
    currentShape = this.value;
});

for (i = 1; i <= 10; i++){
  document.getElementById('color' + i).addEventListener('input', function () { 
    currentColor = this.value;
  })
}

canvas.addEventListener("mousedown", function (e) {
  drawing = true;
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener("mouseup", function (e) {
  if (drawing) {
      drawing = false;
      const endX = e.clientX - canvas.offsetLeft;
      const endY = e.clientY - canvas.offsetTop;
      const width = endX - startX;
      const height = endY - startY;
      
      ctx.fillStyle = currentColor;

      if (currentShape === "rectangle") {
          ctx.fillRect(startX, startY, width, height);
      } else  if (currentShape === "circle") {
          const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
          const centerX = startX + width / 2;
          const centerY = startY + height / 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.fill();
      } else if (currentShape === "square") {
        const sideLength = Math.min(Math.abs(width), Math.abs(height));
        ctx.fillRect(startX, startY, sideLength, sideLength);
    }
     else if (currentShape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(startX + width / 2, startY);
       ctx.lineTo(endX, endY);
       ctx.lineTo(startX, endY);
       ctx.closePath();
       ctx.fill();
  }
  }
});

canvas.addEventListener("mousemove", function (e) {
  if (drawing) {
      
      const endX = e.clientX - canvas.offsetLeft;
      const endY = e.clientY - canvas.offsetTop;
      const width = endX - startX;
      const height = endY - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = currentColor;

      if (currentShape === "rectangle") {
        ctx.fillRect(startX, startY, width, height);
    } else if (currentShape === "circle") {
        const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
        const centerX = startX + width / 2;
        const centerY = startY + height / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
     } else if (currentShape === "square") {
      const sideLength = Math.min(Math.abs(width), Math.abs(height));
      ctx.fillRect(startX, startY, sideLength, sideLength);
  }
      else if (currentShape === "triangle") {
        ctx.beginPath();
        ctx.moveTo(startX + width / 2, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(startX, endY);
        ctx.closePath();
        ctx.fill();
    }
   }
  });
});