// Keep track of socket connection
var socket;

// Teachable Machine


// The video
let video;
// For displaying the label
let label = "waiting...";
var normal_init='none';
var normal = 'none';
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/a-7yFQA_/';
var current = 0;
let count = 0;
var opstring="";

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  let canvas = createCanvas(640, 520);
  canvas.style.right = '100px';
  // Create the video
  socket = io();
  
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// function show(data)
// {
//   textSize(32);
//   textAlign(CENTER, CENTER);
//   alert("hi");
//   text(data);
// }
// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  

  // Draw the video
  image(video, 0, 0);
  

//   socket.on("image", function(image, buffer) {
//     if(image)
//     {
//         console.log(" image: from client side");
//         // code to handle buffer like drawing with canvas** <--- is canvas drawing/library a requirement?  is there an alternative? another quick and dirty solution?
//        console.log(image);
//        // what can we do here to serve the image onto an img tag?
//     }

// });
  // socket.on('string',function (data)
  // {
  //   textSize(32);
  //   textAlign(CENTER, CENTER);
    
  //   alert(data);
  //   text(data);
  // });
  

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  

  textSize(256);
  
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }

  // Store the label and classify again!
  score = results[0].confidence;
  if(score > 0.8)
  {
    label = results[0].label;
    
  }
  normal="none";
  
  if(label == 'a')
  {
    normal = 'a';
    if(normal_init == label){
      count= count + 1;
    }
  }
  else if(label == 'b')
  {
    normal = 'b';
    if(normal_init == label){
      count= count + 1;
    }
  }
  else if(label == 'c')
  {
    normal = 'c';
    if(normal_init == label){
      count= count + 1;
    }
  }
  else if(label == 'd')
  {
    normal = 'd';
    if(normal_init == label){
      count= count + 1;
    }
  }
  if(normal_init == label){
    count= count + 1;
  }
  else{
    count = 0;
  }
  normal_init=normal;
  if(count >= 25)
  {
    // console.log(count,normal_init,label);
    if(normal_init!="none"){
    opstring+=normal_init;
    }
    socket.emit('string',opstring);
    var x = document.getElementById('me');
    if(opstring)
    {
      x.innerHTML = opstring;
    }
    
    socket.on('string',function (data)
    {
      textSize(32);
      textAlign(CENTER, CENTER);
      console.log(data);
      
      fill(255);
      var box = document.getElementById('tee');
      box.innerHTML = data;
      
    });
    count=0;
  }
  
  
  classifyVideo();
}
