const audio = document.querySelector("audio");
const envelope = document.getElementById("envelope");
const envelopeContainer = document.getElementById("envelopeContainer");

function openEnvelope() {
    let envelopeStyle = envelope.classList;
    let envelopeContainerStyle = envelopeContainer.classList;

    if (envelopeStyle.contains("envelope-clicked")) return;

    loadAudio();

    envelopeStyle.add("envelope-clicked");
    setTimeout(() => {
        envelopeStyle.remove("envelope-clicked");

        envelopeStyle.add("hide");
        envelopeContainerStyle.add("hide");

        playAudio();
        setTimeout(() => envelopeContainer.remove(), 800);
    }, 2000);
}

function loadAudio() {
    if (!audio) return;
    audio.load();
}

function playAudio() {
    if (!audio) return;
    audio.play();
}