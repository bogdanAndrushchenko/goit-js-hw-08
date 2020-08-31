const divBoxesRef = document.querySelector('#boxes');
const createDivFn = (size) => {
    const createDiv = document.createElement('div');
    createDiv.style.cssText =
        `width: ${size}px; height: ${size}px;
          background-color: rgb(${colorRandom()})`;
    return createDiv
}


const createBoxes = (amount) => {
    const boxFragment = document.createDocumentFragment();
    for (let i = 0; i < amount; i += 1) {
        const size = startDivSize + i * 10;
        const createDiv = createDivFn(size)
        boxFragment.append(createDiv);
    }
    divBoxesRef.append(boxFragment);

}


const createGalleryBlockTag = (arr) => {
    const boxFragment = document.createDocumentFragment();
    const imagesRef = createElement("img","gallery__link");
    imagesRef.setAttribute("data-source", arr.original);
    imagesRef.src = arr.preview;
    imagesRef.alt = arr.description;
    const linkElem = createElement("a","img-style");
    linkElem.setAttribute('href', arr.original);
    
    linkElem.append(imagesRef);
    const liItemElem = createElement("li","gallery__item")
    liItemElem.append(linkElem)
    liItemElem.append(boxFragment)
    return boxFragment;
};