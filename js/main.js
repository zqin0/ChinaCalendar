document.addEventListener("click", function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = Math.random() * 1;
    document.body.style.backgroundColor = "rgb(" + r + ',' + g + ',' + b + ',' + a + ")";
});
console.log("it is work");