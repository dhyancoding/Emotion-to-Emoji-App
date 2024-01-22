prediction1 = " "

prediction2 = " "

Webcam.set({
    width: 300, height: 225, image_format: "png", png_quality: 90
})

camera = document.getElementById("camera")

Webcam.attach("#camera")

function take_Snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="snap1" src="' + data_uri + '"/>'
    })
}

console.log(ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/frFBfvf79/model.json", model_loaded)

function model_loaded(){
    console.log("model.loaded")
}


function Predict(){
    img1 = document.getElementById("snap1")
    classifier.classify(img1, gotResults)
}

function gotResults(error, result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        document.getElementById("resultEmotion1").innerHTML = result[0].label
        document.getElementById("resultEmotion2").innerHTML = result[1].label
        prediction1 = result[0].label
        prediction2 = result[1].label

        document.getElementById("resultConfidence1").innerHTML = (result[0].confidence*100).toFixed(2) + "%"
        document.getElementById("resultConfidence2").innerHTML = (result[1].confidence*100).toFixed(2) + "%"

        Speak()

        if(result[0].label=="Happy"){
            document.getElementById("resultEmoji1").innerHTML = "&#x1F603;"
        }

        if(result[0].label=="Angry"){
            document.getElementById("resultEmoji1").innerHTML = "&#x1F621;"
        }

        if(result[0].label=="Sad"){
            document.getElementById("resultEmoji1").innerHTML = "&#x1F622;"
        }

        if(result[0].label=="Tired/Bored"){
            document.getElementById("resultEmoji1").innerHTML = "&#x1F611;"
        }

        if(result[0].label=="Fear"){
            document.getElementById("resultEmoji1").innerHTML = "&#128561;"
        }

        if(result[0].label=="Disgust"){
            document.getElementById("resultEmoji1").innerHTML = "&#x1F922;"
        }

        if(result[0].label=="Suprise"){
            document.getElementById("resultEmoji1").innerHTML = "&#x1F62E;"
        }
        

        if(result[1].label=="Happy"){
            document.getElementById("resultEmoji2").innerHTML = "&#x1F603;"
        }

        if(result[1].label=="Angry"){
            document.getElementById("resultEmoji2").innerHTML = "&#x1F621;"
        }

        if(result[1].label=="Sad"){
            document.getElementById("resultEmoji2").innerHTML = "&#x1F622;"
        }

        if(result[1].label=="Tired/Bored"){
            document.getElementById("resultEmoji2").innerHTML = "&#x1F611;"
        }

        if(result[1].label=="Fear"){
            document.getElementById("resultEmoji2").innerHTML = "&#128561;"
        }

        if(result[1].label=="Disgust"){
            document.getElementById("resultEmoji2").innerHTML = "&#x1F922;"
        }

        if(result[1].label=="Suprise"){
            document.getElementById("resultEmoji2").innerHTML = "&#x1F62E;"
        }
    }
}

function Speak(){
    s = window.speechSynthesis;
    d1 = "At first thought I think you are " + prediction1
    d2 = "And my second guess is that you are felling the emotion " + prediction2
    u = new SpeechSynthesisUtterance(d1 + d2)
    u.rate = 0.5
    s.speak(u)
}