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

    const coverButton = document.querySelector('.music-player__cover');
    const coverArt = document.querySelector('.music-player__cover-art');
    const trackTitle = document.querySelector('.music-player__track-title .music-player__title-ink');
    const trackArtist = document.querySelector('.music-player__track-artist');

    if (!coverButton || !coverArt || !trackTitle || !trackArtist) {
        return;
    }

    let activeIndex = 0;

    const applyCover = (index) => {
        const cover = covers[index];
        coverArt.src = cover.src;
        coverArt.alt = cover.alt;
        trackTitle.textContent = cover.title;
        trackArtist.textContent = cover.artist;
        coverButton.classList.remove(...coverVariants);
        coverButton.classList.add(`music-player__cover--${index + 1}`);
        coverButton.setAttribute(
            'aria-label',
            `Album cover ${index + 1} of ${covers.length}. Click for next.`,
        );
    };

    coverButton.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % covers.length;
        applyCover(activeIndex);
    });

    applyCover(activeIndex);
})();
