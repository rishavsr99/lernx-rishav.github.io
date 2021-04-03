//ELEMENT SELECTORS
var player = document.querySelector('.player');
var video = document.querySelector('#video');
var playBtn = document.querySelector('.play-btn');
var volumeBtn = document.querySelector('.volume-btn');
var fullscreenBtn =document.querySelector('.fullscreen'); 


let lastVolume = 1;
let isMouseDown = false;


function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();	
	}
	playBtn.classList.toggle('paused');
}
function togglePlayBtn() {
	playBtn.classList.toggle('playing');
}

function toggleMute() {
	if(video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBtn.classList.add('muted');
		
	} else {
		video.volume = lastVolume;
		volumeBtn.classList.remove('muted');
		
	}
}
function changeVolume(e) {
		volumeBtn.classList.remove('muted');
		let volume = e.offsetX/volumeSlider.offsetWidth;
		volume<0.1 ? volume = 0 : volume=volume; 
		volumeFill.style.width = `${volume*100}%`;
		video.volume = volume;
		if (volume > 0.7) {
			volumeBtn.classList.add('loud');
		} else if (volume < 0.7 && volume > 0) {
			volumeBtn.classList.remove('loud');
		} else if (volume == 0) {
			volumeBtn.classList.add('muted');
		}
		lastVolume = volume;
}
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
var fullscreen = false;
function toggleFullscreen() {
	fullscreen? exitFullscreen() : launchIntoFullscreen(player)
	fullscreen = !fullscreen;
}


//EVENT LISTENERS
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayBtn);
video.addEventListener('pause', togglePlayBtn);
video.addEventListener('ended', togglePlayBtn);
volumeBtn.addEventListener('click', toggleMute);
window.addEventListener('mousedown', () => isMouseDown = true)
window.addEventListener('mouseup', () => isMouseDown = false)
fullscreenBtn.addEventListener('click', toggleFullscreen);
