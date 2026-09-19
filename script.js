function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
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
            // Minimaliseer naar dock
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

function randomizePosition(windowEl) {
    const maxLeft = window.innerWidth - windowEl.offsetWidth;
    const maxTop = window.innerHeight - windowEl.offsetHeight;

    windowEl.style.left = Math.floor(Math.random() * Math.max(0, maxLeft)) + "px";
    windowEl.style.top = Math.floor(Math.random() * Math.max(0, maxTop)) + "px";
}

