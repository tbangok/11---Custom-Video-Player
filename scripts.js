// variable

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build function

//play button
function togglePlay() {
    if(video.paused) {
        video.play()
    } else {video.pause();}
}
// function togglePlay() {
//     const method = video.paused ? 'play' : 'pause';
//     video[method]();
// }
function updateButton() {
    const icon = this.paused ? '►' : '❚❚'; 
    toggle.innerHTML = icon;
}

//skip
function skip() { 
    video.currentTime += parseFloat(this.dataset.skip)
}

//range
function handleRange() {
    video[this.name] = this.value;
}

//progress
function progressUpdate() {
    const percent = (video.currentTime/video.duration)*100;
 progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    console.log(e);
    const scrubTime=(e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    progressBar.style.flexBasis = `${scrubTime}%`;
}


//event listener
                    
video.addEventListener('click', togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
toggle.addEventListener('click', togglePlay);

video.addEventListener('timeupdate',progressUpdate);

let mousedown =false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub());
progress.addEventListener('mousedown', ()=> mousedown=true);
progress.addEventListener('mouseup', ()=> mousedown=false);


skipButtons.forEach((skipButton)=> skipButton.addEventListener('click', skip));

ranges.forEach((range)=>range.addEventListener('change',handleRange) )