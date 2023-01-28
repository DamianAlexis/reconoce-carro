objects = [];
estado = "";

function preload(){

  video = createVideo('video.mp4');
  
}

function setup()
{
    canvas = createCanvas(480, 380)
    canvas.center();
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Estado de deteccion de objetos";
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if(estado != "")
    {
        objectDetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Estado : objetos detectados";
            document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: "+ objects.length;
   
            fill("#ff8d3b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#c3eb3b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
    }
}
function modelloaded()
{
    console.log("¡Modelo cargado!");
    estado = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotresult(error, results) {
    if(error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}