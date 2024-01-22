//var

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//func

function play() {
    
    if (video.paused) {
        video.play();
    } else {video.pause()} 
}

function icon() {
    if (video.paused) {
        toggle.innerHTML='►';
    } else  toggle.innerHTML= '❚❚'
}

function skip() {
    console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
    console.log(this)
   video[this.name]=`${this.value}`
}

function progressUpdate() {
    const percent = video.currentTime/video.duration*100;
    progressBar.style.flexBasis=`${percent}%`; 
}

function scrub(e) {
    const scrubTime= e.offsetX/video.offsetWidth*video.duration;
    video.currentTime= scrubTime;
    console.log(e)
}


//event
video.addEventListener('click',play);
toggle.addEventListener('click',play);

video.addEventListener('play',icon);
video.addEventListener('pause',icon);

skipButtons.forEach((button)=> {
    button.addEventListener('click',skip)
})

ranges.forEach((range)=> {
    range.addEventListener('change',handleRange)
})

video.addEventListener('timeupdate',progressUpdate)

let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',()=> (mousedown && scrub()));
progress.addEventListener('mousedown',()=> {mousedown=true});
progress.addEventListener('mouseup',()=> {mousedown=false});


