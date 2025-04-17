const getImagePath = (imagePath?: string, fullsize?: boolean) => {
    return imagePath
    ? `https://image.tmdb.org/t/p/${fullsize ? "original" : "w500"}/${imagePath}`
    : "/fallback-image.jpg";
}

export default getImagePath;