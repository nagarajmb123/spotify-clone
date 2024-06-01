// console.log("welcome to spotify");

//initailise the variables
let songindex =0;
let audioelement = new Audio('songs/1.mp3');
let masterplay =    document.getElementById('masterplay');
let myprogessbar = document.getElementById('myprogessbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let minimasterplay = document.getElementsByClassName('songitemplay');

let songs = [

    { songname:"sapta sagaradhaache ello", filepath : "songs/1.mp3 ", coverpath : " coverpath/1.jpg"},
    { songname:"heeriye", filepath : "songs/2.mp3 ", coverpath : " coverpath/2.jpg"},
    { songname:"c e ishq", filepath : "songs/3.mp3 ", coverpath : " coverpath/3.jpg"},
    { songname:"kalmasha", filepath : "songs/4.mp3 ", coverpath : " coverpath/4.jpg"},
    { songname:"kavithe Kavithe", filepath : "songs/5.mp3 ", coverpath : " coverpath/5.jpg"},
    { songname:"KGF-theme", filepath : "songs/6.mp3 ", coverpath : " coverpath/6.jpg"},
    { songname:"Maate Vinadhuga", filepath : "songs/7.mp3 ", coverpath : " coverpath/7.jpg"},
    { songname:"remix", filepath : "songs/8.mp3 ", coverpath : " coverpath/8.jpg"},
    { songname:"reel-song", filepath : "songs/9.mp3 ", coverpath : " coverpath/9.jpg"},
   
]


songitems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;

})

//handle play and pause
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.src = "pause.png";
       
        gif.style.opacity = 1;
    } else {
        audioelement.pause();
        masterplay.src = 'play.png';
      
        gif.style.opacity = 0;
    }
});

//listen events
audioelement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    let progess = parseInt((audioelement.currentTime/audioelement.duration)*100);
    // console.log(progess);
    myprogessbar.value = progess;
})

myprogessbar.addEventListener('change',()=>
{
    audioelement.currentTime = audioelement.duration*myprogessbar.value /100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.src = "play.png";
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeallplays();
         
        songindex = parseInt(e.target.id);
        e.target.src = 'pause.png';
        audioelement.src = `songs/${songindex + 1}.mp3`; // Use backticks for template literals
        mastersongname.innerText = songs[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.src = "pause.png";
    });
});

audioelement.addEventListener('ended', () => {
    playNextSong();
});
const playNextSong = () => {
    if (songindex >= 9) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    
    audioelement.src = `songs/${songindex + 1}.mp3`; // Use backticks for template literals
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = 1;
    masterplay.src = "pause.png";
};
document.getElementById('next').addEventListener('click',()=>
{
    if(songindex>=9)
    {
        songindex = 0;
    }
    else{
        songindex += 1;
    }
        audioelement.src = `songs/${songindex + 1}.mp3`; // Use backticks for template literals
        mastersongname.innerText = songs[songindex].songname; 
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.src = "pause.png";

})


document.getElementById('previous').addEventListener('click', () => {
    if (songindex > 0) {  // Change the condition to check if songindex is greater than 0
        songindex -= 1;
    } else {
        songindex = 9;
    }
    audioelement.src = `songs/${songindex + 1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.src = "pause.png";
    gif.style.opacity = 1;
});

