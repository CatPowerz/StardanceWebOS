function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();


function dragElement(element) {

  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {


    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {

    element.onmousedown = startDragging;
  }


  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }


  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    var newTop = element.offsetTop - currentY;
var newLeft = element.offsetLeft - currentX;

var maxTop = window.innerHeight - element.offsetHeight;
var maxLeft = window.innerWidth - element.offsetWidth;

element.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
element.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let highestZ = 20;

function setupWindow(windowEl) {
    const header = windowEl.querySelector(".paneltop");
    const closeBtn = windowEl.querySelector(".btn-close");
    const minBtn = windowEl.querySelector(".btn-min");
    const maxBtn = windowEl.querySelector(".btn-max");
    const dockIcon = document.querySelector(`.dock-icon[data-window="${windowEl.id}"]`);


    if (header) {
        dragElement(windowEl, header);
    }


    windowEl.onmousedown = function () {
        highestZ++;
        windowEl.style.zIndex = highestZ;
    };

 
    if (closeBtn) {
        closeBtn.onclick = function (e) {
            e.stopPropagation();
            windowEl.classList.add("hidden");
            windowEl.classList.remove("fullscreen");
            if (dockIcon) dockIcon.classList.remove("active");
         
        };
    }

    if (minBtn) {
        minBtn.onclick = function (e) {
            e.stopPropagation();
            windowEl.classList.add("hidden");
            if (dockIcon) dockIcon.classList.add("active");
        };
    }

    if (maxBtn) {
        maxBtn.onclick = function (e) {
            e.stopPropagation();
            windowEl.classList.toggle("fullscreen");
        };
    }


    if (dockIcon) {
    dockIcon.onclick = function () {
        const isHidden = windowEl.classList.contains("hidden");
        const wasMinimized = dockIcon.classList.contains("active");

        if (isHidden) {
            
            if (!wasMinimized) {
                randomizePosition(windowEl);
            }

            windowEl.classList.remove("hidden");
            dockIcon.classList.remove("active");
            highestZ++;
            windowEl.style.zIndex = highestZ;
        } else {
          
            windowEl.classList.add("hidden");
            dockIcon.classList.add("active");
        }
    };
}
}


document.querySelectorAll(".panel").forEach(setupWindow);

document.querySelector(".boot-btn").onclick = function () {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("dock-welcome").classList.remove("active");
};

const notepadWin = document.getElementById("notepad");
const notepadTextarea = notepadWin.querySelector(".notepad-input");
const notepadCloseBtn = notepadWin.querySelector(".btn-close");

if (notepadCloseBtn && notepadTextarea) {
    notepadCloseBtn.addEventListener("click", function () {
        notepadTextarea.value = "";
    });
}

if (notepadCloseBtn && notepadTextarea) {
    notepadCloseBtn.addEventListener("click", function () {
        notepadTextarea.value = "";
    });
}
function randomizePosition(windowEl) {
    const padTop = 90;    
    const padBottom = 80; 
    const padSide = 40;    

    const maxLeft = window.innerWidth - windowEl.offsetWidth - (padSide * 2);
    const maxTop = window.innerHeight - windowEl.offsetHeight - padTop - padBottom;

    windowEl.style.left = (padSide + Math.floor(Math.random() * Math.max(0, maxLeft))) + "px";
    windowEl.style.top = (padTop + Math.floor(Math.random() * Math.max(0, maxTop))) + "px";
}

const notepadSaveBtn = document.getElementById("notepad-save");
const notepadLoadBtn = document.getElementById("notepad-load");
const notepadClearBtn = document.getElementById("notepad-clear");
const notepadStatus = document.getElementById("notepad-status");

if (notepadSaveBtn && notepadTextarea) {
    notepadSaveBtn.onclick = function () {
        localStorage.setItem("catos_note", notepadTextarea.value);
        localStorage.setItem("catos_note_time", Date.now());
        notepadSaveBtn.textContent = "Saved!";
        setTimeout(() => {
            notepadSaveBtn.textContent = "Save";
        }, 1200);
    };
}


if (notepadLoadBtn && notepadTextarea) {
    notepadLoadBtn.onclick = function () {
        const savedNote = localStorage.getItem("catos_note");

        if (savedNote !== null) {
            notepadTextarea.value = savedNote;
            notepadLoadBtn.textContent = "Loaded!";
        } else {
            notepadLoadBtn.textContent = "Empty";
        }
        setTimeout(() => {
            notepadLoadBtn.textContent = "Load";
        }, 1200);
    };
}


if (notepadCloseBtn && notepadTextarea) {
    notepadCloseBtn.addEventListener("click", function () {
        notepadTextarea.value = "";
    });
}

if (notepadClearBtn && notepadTextarea) {
    notepadClearBtn.addEventListener("click", function () {
        notepadTextarea.value = "";
        localStorage.removeItem("catos_note");
        localStorage.removeItem("catos_note_time");
        notepadStatus.textContent = "No note saved.";
    });
}



function updateNotepadStatus() {
    if (!notepadStatus) return;

    const savedNote = localStorage.getItem("catos_note");
    const savedTime = localStorage.getItem("catos_note_time");

    if (savedNote !== null && savedTime !== null) {
        const diffSeconds = Math.max(0, Math.floor((Date.now() - Number(savedTime)) / 1000));
        let timeString = "";

        if (diffSeconds < 60) {
            timeString = `${diffSeconds} second${diffSeconds === 1 ? "" : "s"}`;
        } else if (diffSeconds < 3600) {
            const mins = Math.floor(diffSeconds / 60);
            timeString = `${mins} minute${mins === 1 ? "" : "s"}`;
        } else if (diffSeconds < 86400) {
            const hours = Math.floor(diffSeconds / 3600);
            timeString = `${hours} hour${hours === 1 ? "" : "s"}`;
        } else if (diffSeconds < 604800) {
            const days = Math.floor(diffSeconds / 86400);
            timeString = `${days} day${days === 1 ? "" : "s"}`;
        } else if (diffSeconds < 2592000) {
            const weeks = Math.floor(diffSeconds / 604800);
            timeString = `${weeks} week${weeks === 1 ? "" : "s"}`;
        } else {
            const months = Math.floor(diffSeconds / 2592000);
            timeString = `${months} month${months === 1 ? "" : "s"}`;
        }

        notepadStatus.textContent = `Saved note ${timeString} ago.`;
    } else {
        notepadStatus.textContent = "No note saved.";
    }
}


setInterval(updateNotepadStatus, 1000);

const bgSelect = document.getElementById("bg-select");
const fontSelect = document.getElementById("font-select");
const bgImage = document.querySelector(".bg");
const bgBrightnessSlider = document.getElementById("bg-brightness-slider");
const savedBg = localStorage.getItem("catos_bg");
if (savedBg && bgImage && bgSelect) {
    bgImage.src = savedBg;
    bgSelect.value = savedBg;
}
if(bgBrightnessSlider && bgImage) {
    const savedBrightness = localStorage.getItem("catos_bg_brightness");
    if (savedBrightness) {
        bgImage.style.filter = `brightness(${savedBrightness})`;
        bgBrightnessSlider.value = savedBrightness;
    }
}
const savedFont = localStorage.getItem("catos_font");
if (savedFont && fontSelect) {
    document.body.style.fontFamily = savedFont;
    fontSelect.value = savedFont;
}


if (bgSelect && bgImage) {
    bgSelect.addEventListener("change", function () {
        const newBg = bgSelect.value;
        bgImage.src = newBg;
        localStorage.setItem("catos_bg", newBg);
    });
}


if (fontSelect) {
    fontSelect.addEventListener("change", function () {
        const newFont = fontSelect.value;
        document.body.style.fontFamily = newFont;
        localStorage.setItem("catos_font", newFont);
    });
}

if (bgBrightnessSlider) {
    bgBrightnessSlider.addEventListener("change", function () {
        const newBrightness = bgBrightnessSlider.value;
        bgImage.style.filter = `brightness(${newBrightness})`;
        localStorage.setItem("catos_bg_brightness", newBrightness);
    });
}


const playlist = [
    { title: "01 - Idk how to name songs", src: "catbgmusic.wav" },
    { title: "02 - REborn REvives", src: "RebornCat.wav" },

];

let currentTrackIndex = 0;

const audio = document.getElementById("cat-audio-element");
const playBtn = document.getElementById("btn-play");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const seekBar = document.getElementById("seek-bar");
const trackTitle = document.getElementById("current-track-title");
const trackTime = document.getElementById("track-time");
const trackList = document.getElementById("track-list");
const audioCloseBtn = document.getElementById("audioplayer").querySelector(".btn-close");


function renderPlaylist() {
    trackList.innerHTML = "";
    playlist.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.title;
        li.classList.toggle("active", index === currentTrackIndex);
        li.addEventListener("click", () => {
            loadTrack(index);
            playTrack();
        });
        trackList.appendChild(li);
    });
}

function loadTrack(index) {
    currentTrackIndex = index;
    audio.src = playlist[index].src;
    trackTitle.textContent = playlist[index].title;
    renderPlaylist();
}
if (audioCloseBtn) {
    audioCloseBtn.addEventListener("click", function () {
   
       
        loadTrack(0);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            playBtn.textContent = "▶";
        }
        currentTrackIndex = 0;
    });
}
function playTrack() {
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseTrack() {
    audio.pause();
    playBtn.textContent = "▶";
}


function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}


playBtn.addEventListener("click", () => {
    if (audio.paused) {
        if (!audio.src) loadTrack(0);
        playTrack();
    } else {
        pauseTrack();
    }
});

prevBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});


audio.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
    trackTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

audio.addEventListener("loadedmetadata", () => {
    seekBar.max = Math.floor(audio.duration);
    trackTime.textContent = `0:00 / ${formatTime(audio.duration)}`;
});


seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});


audio.addEventListener("ended", () => {
    nextBtn.click();
});


loadTrack(0);