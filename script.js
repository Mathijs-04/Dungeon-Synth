(() => {
    const covers = [
        {
            src: 'images/Cover1.webp',
            alt: 'Album artwork 1',
            title: 'Music placeholder 1',
            artist: 'Artist placeholder 1',
        },
        {
            src: 'images/Cover2.webp',
            alt: 'Album artwork 2',
            title: 'Music placeholder 2',
            artist: 'Artist placeholder 2',
        },
        {
            src: 'images/Cover3.webp',
            alt: 'Album artwork 3',
            title: 'Music placeholder 3',
            artist: 'Artist placeholder 3',
        },
        {
            src: 'images/Cover4.webp',
            alt: 'Album artwork 4',
            title: 'Music placeholder 4',
            artist: 'Artist placeholder 4',
        },
        {
            src: 'images/Cover5.webp',
            alt: 'Album artwork 5',
            title: 'Music placeholder 5',
            artist: 'Artist placeholder 5',
        },
        {
            src: 'images/Cover6.webp',
            alt: 'Album artwork 6',
            title: 'Music placeholder 6',
            artist: 'Artist placeholder 6',
        },
        {
            src: 'images/Cover7.webp',
            alt: 'Album artwork 7',
            title: 'Music placeholder 7',
            artist: 'Artist placeholder 7',
        },
    ];

    const coverVariants = covers.map((_, index) => `music-player__cover--${index + 1}`);

    const coverElement = document.querySelector('.music-player__cover');
    const coverArt = document.querySelector('.music-player__cover-art');
    const trackTitle = document.querySelector('.music-player__track-title .music-player__title-ink');
    const trackArtist = document.querySelector('.music-player__track-artist');
    const equalizer = document.querySelector('.music-player__eq');
    const eqBars = equalizer?.querySelectorAll('.music-player__eq-bar') ?? [];
    const shuffleButton = document.querySelector('.music-player__control--shuffle');
    const loopButton = document.querySelector('.music-player__control--loop');
    const previousButton = document.querySelector('.music-player__control--previous');
    const nextButton = document.querySelector('.music-player__control--next');
    const playPauseButton = document.querySelector('.music-player__control--play-pause');
    const soundButton = document.querySelector('.music-player__control--sound');
    const volumeInput = document.querySelector('.music-player__volume-input');
    const volumeFill = document.querySelector('.music-player__volume-fill');

    if (!coverElement || !coverArt || !trackTitle || !trackArtist || !equalizer) {
        return;
    }

    let activeIndex = 0;
    let volumeLevel = 0.75;
    let volumeBeforeMute = 0.75;
    let isMuted = false;
    let shuffleOn = false;
    let loopOn = false;

    const applyCover = (index) => {
        const cover = covers[index];
        coverArt.src = cover.src;
        coverArt.alt = cover.alt;
        trackTitle.textContent = cover.title;
        trackArtist.textContent = cover.artist;
        coverElement.classList.remove(...coverVariants);
        coverElement.classList.add(`music-player__cover--${index + 1}`);
    };

    const restartEqAnimation = () => {
        eqBars.forEach((bar) => {
            bar.style.animation = 'none';
            void bar.offsetHeight;
            bar.style.removeProperty('animation');
        });
    };

    const setEqState = (state) => {
        const previous = equalizer.dataset.eq;
        equalizer.dataset.eq = state;

        if (state === 'playing' && previous === 'idle') {
            restartEqAnimation();
        }
    };

    const setPlaybackState = (isPlaying) => {
        if (!playPauseButton) {
            return;
        }

        playPauseButton.dataset.playback = isPlaying ? 'playing' : 'paused';
        playPauseButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');

        if (isPlaying) {
            setEqState('playing');
            return;
        }

        if (equalizer.dataset.eq !== 'idle') {
            setEqState('paused');
        }
    };

    const setSoundState = (isOn) => {
        if (!soundButton) {
            return;
        }

        soundButton.dataset.sound = isOn ? 'on' : 'off';
        soundButton.setAttribute('aria-label', isOn ? 'Mute' : 'Unmute');
    };

    const syncVolumeUI = () => {
        const audible = !isMuted && volumeLevel > 0;
        const sliderValue = Math.round(volumeLevel * 100);

        if (volumeFill) {
            volumeFill.style.width = `${sliderValue}%`;
        }

        if (volumeInput) {
            volumeInput.value = String(sliderValue);
            volumeInput.setAttribute('aria-valuenow', String(sliderValue));
        }

        setSoundState(audible);
    };

    const setToggleState = (button, isOn, labelOn, labelOff) => {
        if (!button) {
            return;
        }

        button.setAttribute('aria-pressed', String(isOn));
        button.setAttribute('aria-label', isOn ? labelOn : labelOff);
    };

    const goToTrack = (index) => {
        activeIndex = (index + covers.length) % covers.length;
        applyCover(activeIndex);
    };

    const getNextIndex = () => {
        if (shuffleOn && covers.length > 1) {
            let nextIndex = activeIndex;

            while (nextIndex === activeIndex) {
                nextIndex = Math.floor(Math.random() * covers.length);
            }

            return nextIndex;
        }

        const atLastTrack = activeIndex === covers.length - 1;

        if (atLastTrack && !loopOn) {
            return activeIndex;
        }

        return (activeIndex + 1) % covers.length;
    };

    const getPreviousIndex = () => {
        if (shuffleOn && covers.length > 1) {
            let previousIndex = activeIndex;

            while (previousIndex === activeIndex) {
                previousIndex = Math.floor(Math.random() * covers.length);
            }

            return previousIndex;
        }

        const atFirstTrack = activeIndex === 0;

        if (atFirstTrack && !loopOn) {
            return activeIndex;
        }

        return (activeIndex - 1 + covers.length) % covers.length;
    };

    shuffleButton?.addEventListener('click', () => {
        shuffleOn = !shuffleOn;
        setToggleState(shuffleButton, shuffleOn, 'Shuffle on', 'Shuffle off');
    });

    loopButton?.addEventListener('click', () => {
        loopOn = !loopOn;
        setToggleState(loopButton, loopOn, 'Loop on', 'Loop off');
    });

    previousButton?.addEventListener('click', () => {
        goToTrack(getPreviousIndex());
    });

    nextButton?.addEventListener('click', () => {
        goToTrack(getNextIndex());
    });

    playPauseButton?.addEventListener('click', () => {
        const isPlaying = playPauseButton.dataset.playback === 'playing';
        setPlaybackState(!isPlaying);
    });

    soundButton?.addEventListener('click', () => {
        if (isMuted) {
            isMuted = false;
            if (volumeLevel === 0) {
                volumeLevel = volumeBeforeMute > 0 ? volumeBeforeMute : 0.75;
            }
        } else {
            volumeBeforeMute = volumeLevel > 0 ? volumeLevel : volumeBeforeMute;
            isMuted = true;
        }

        syncVolumeUI();
    });

    volumeInput?.addEventListener('input', () => {
        volumeLevel = Number(volumeInput.value) / 100;

        if (volumeLevel > 0) {
            volumeBeforeMute = volumeLevel;
            isMuted = false;
        } else {
            isMuted = true;
        }

        syncVolumeUI();
    });

    applyCover(activeIndex);
    setEqState('idle');
    setPlaybackState(false);
    setToggleState(shuffleButton, shuffleOn, 'Shuffle on', 'Shuffle off');
    setToggleState(loopButton, loopOn, 'Loop on', 'Loop off');
    syncVolumeUI();
})();
