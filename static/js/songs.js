function play(button, audio) {
    let buttonStyle = button.classList;
    let paused = audio.dataset.paused;

    buttonStyle.toggle("bi-pause-fill");
    buttonStyle.toggle("bi-play-fill");
    if (paused == "1") {
        audio.play();
        audio.dataset.paused = "0";
    } else {
        audio.pause();
        audio.dataset.paused = "1";
    }
}