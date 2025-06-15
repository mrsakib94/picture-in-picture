import './style.css';

const startButton = document.getElementById('button-start');
const stopButton = document.getElementById('button-stop');
const video = document.getElementById('video');

startButton.addEventListener('click', async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = mediaStream;

    video.onloadedmetadata = () => {
      video.play();
      startPictureInPicture();
    };

    startButton.disabled = true;
    startButton.hidden = true;
    stopButton.disabled = false;
    stopButton.hidden = false;
  } catch (err) {
    console.log('Error: ', err);
  }
});

stopButton.addEventListener('click', async () => {
  stopButton.disabled = true;
  stopScreenCapture();
  stopPictureInPicture();
});

video.addEventListener('leavepictureinpicture', function () {
  stopScreenCapture();
  stopPictureInPicture();
});

async function startPictureInPicture() {
  try {
    await video.requestPictureInPicture();
  } catch (err) {
    console.log('startPictureInPicture error: ', err);
  }
}

async function stopPictureInPicture() {
  try {
    await document.exitPictureInPicture();
  } catch (err) {
    console.log('stopPictureInPicture error:', err);
  }
}

function stopScreenCapture() {
  let tracks = video.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;
  startButton.disabled = false;
  startButton.hidden = false;
  stopButton.hidden = true;
}
