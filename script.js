(() => {
    const covers = [
        { src: 'images/Cover1.webp', alt: 'Album artwork 1' },
        { src: 'images/Cover2.webp', alt: 'Album artwork 2' },
        { src: 'images/Cover3.webp', alt: 'Album artwork 3' },
    ];

    const coverButton = document.querySelector('.music-player__cover');
    const coverArt = document.querySelector('.music-player__cover-art');

    if (!coverButton || !coverArt) {
        return;
    }

    let activeIndex = 0;

    const applyCover = (index) => {
        const cover = covers[index];
        coverArt.src = cover.src;
        coverArt.alt = cover.alt;
        coverButton.classList.remove(
            'music-player__cover--1',
            'music-player__cover--2',
            'music-player__cover--3',
        );
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
})();
