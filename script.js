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
    const previousButton = document.querySelector('.music-player__control--previous');
    const nextButton = document.querySelector('.music-player__control--next');
    const playPauseButton = document.querySelector('.music-player__control--play-pause');
    const stopButton = document.querySelector('.music-player__control--stop');
    const soundButton = document.querySelector('.music-player__control--sound');

    if (!coverElement || !coverArt || !trackTitle || !trackArtist || !equalizer) {
        return;
    }

    let activeIndex = 0;

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

    const goToTrack = (index) => {
        activeIndex = (index + covers.length) % covers.length;
        applyCover(activeIndex);
    };

    previousButton?.addEventListener('click', () => {
        goToTrack(activeIndex - 1);
    });

    nextButton?.addEventListener('click', () => {
        goToTrack(activeIndex + 1);
    });

    playPauseButton?.addEventListener('click', () => {
        const isPlaying = playPauseButton.dataset.playback === 'playing';
        setPlaybackState(!isPlaying);
    });

    stopButton?.addEventListener('click', () => {
        activeIndex = 0;
        applyCover(activeIndex);
        setEqState('idle');
        setPlaybackState(false);
    });

    soundButton?.addEventListener('click', () => {
        const isOn = soundButton.dataset.sound === 'on';
        setSoundState(!isOn);
    });

    applyCover(activeIndex);
    setEqState('idle');
    setPlaybackState(false);
    setSoundState(true);
})();
