function updateWindowSize() {
  window.lastInnerWidth = window.innerWidth;
  window.lastInnerHeight = window.innerHeight;
  window.lastOrientation = window.orientation;
  // Stays the same for iOS, so that's our ticket to detect iOS keyboard
  window.lastBodyHeight = document.body.clientHeight;
}

function detectKeyboard() {
  function orientationChange() {
    if (
      ((window.lastOrientation == 0 || window.lastOrientation == 180) &&
        (window.orientation == 0 || window.orientation == 180)) ||
      ((window.lastOrientation == 90 || window.lastOrientation == -90) &&
        (window.orientation == 90 || window.orientation == -90))
    )
      return false;
    else return true;
  }

  // No orientation change, keyboard opening
  if (
    window.lastInnerHeight - window.innerHeight > 150 &&
    window.innerWidth == window.lastInnerWidth
  ) {
    var keyboardHeight = window.lastInnerHeight - window.innerHeight;
    updateWindowSize();
    return keyboardHeight;
  }
  // Orientation change with keyboard already opened
  if (
    orientationChange() &&
    document.body.classList.contains("keyboard-open")
  ) {
    var keyboardHeight =
      screen.height - window.topBarHeight - window.innerHeight;
    updateWindowSize();
    return keyboardHeight;
  }

  // No orientation change, keyboard closing
  if (
    window.innerHeight - window.lastInnerHeight > 150 &&
    window.innerWidth == window.lastInnerWidth
  ) {
    var keyboardHeight = -1;
    updateWindowSize();
    return keyboardHeight;
  }

  // Orientation change or regular resize, no keyboard action
  var keyboardHeight = 0;
  updateWindowSize();
  return keyboardHeight;
}

function keyboardShift(keyboardHeight) {
  if (!document.body.classList.contains("keyboard-open"))
    document.body.classList.add("keyboard-open");
  document.body.setAttribute(
    "style",
    "height: calc(100% + " + keyboardHeight + "px);"
  );
}
function removeKeyboardShift() {
  document.body.classList.remove("keyboard-open");
  document.body.removeAttribute("style");
}

// OnStart innit
(function() {
  updateWindowSize();
  window.topBarHeight = screen.height - window.innerHeight;
  window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();
        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  function actualResizeHandler() {
    var keyboardHeight = detectKeyboard();
    if (keyboardHeight > 0) {
      keyboardShift(keyboardHeight);
    } else if (keyboardHeight == -1) {
      removeKeyboardShift();
    }
  }
})();
