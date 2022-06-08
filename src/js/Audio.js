/* ===== Audio ===== */
export default class Audio {

    constructor(urls, loop, volume = 0.5) {
        this.audio = document.createElement("audio");
        this.urls = urls;
        this.loop = loop;
        this.volume = volume;
        this.state = 'stop';

        this.fillAudio();

        this.audio.volume = this.volume;
        this.audio.loop = this.loop;
    }

    /* ===== Fill audio ===== */
    fillAudio() {
        for (let i = 0; i < this.urls.length; i++) {
            const source = document.createElement("source");
            source.src = this.urls[i];
            this.audio.append(source);
        }
    }

    /* ===== Paly audio ===== */
    play() {
        this.audio.currentTime = 0; 
        this.audio.play();
        this.state = "play";
    }

    /* ===== Pause audio ===== */
    pause() {
        this.audio.pause();
        this.state = "pause";
    }

    /* ===== Stop audio ===== */
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0; 
        this.state = "stop";
    }

}