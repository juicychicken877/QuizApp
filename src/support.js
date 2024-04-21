export const getRandomObject = (array) => {
    let newArray = array;
    let object = Math.round(Math.random() * (array.length-1));

    return newArray[object];
}

export const randomizeArray = (array) => {
    let newArray = array;

    let currentIndex = newArray.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }

    return newArray;
}