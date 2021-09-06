(function () {
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('button');

    if(navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const recorder = new MediaRecorder(stream);

                const chunks = [];

                stopBtn.disabled = true;
                submitBtn.disabled  = true;

                startBtn.addEventListener('click', (e) => {
                    if (recorder.state !== 'recording') {
                        recorder.start();
                        stopBtn.disabled = false;
                    }
                    console.log(recorder.state);
                });

                recorder.addEventListener("dataavailable", (e) => {
                    console.log("adding data ...");
                    chunks.push(e.data)
                });

                stopBtn.addEventListener('click', (e) => {
                    if (recorder.state !== "inactive") {
                        recorder.stop();
                        e.target.disabled = true;
                        submitBtn.disabled = false;
                    }
                    console.log(recorder.state);
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const fd = new FormData();
                    const blob = new Blob(chunks, {"type" : "audio/ogg; codecs=opus"})
                    console.log("->>>>", recorder.mimeType);
                    fd.append('audio_file', blob);
                    fetch('http://localhost:5000/upload', {method: "POST", cache: "no-cache", body: fd})
                        .then(resp => {
                            if(resp.status === 200) {
                                window.location.reload();
                            } else {
                                console.error(resp);
                            }
                        });   
                });
            })

    } else {
        console.error("media devices not supported!")
    }

})();

