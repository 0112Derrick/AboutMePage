export default class Card {
    name;
    description;
    image;
    alt;
    imgWidth;
    imgHeight;
    elements;
    self;
    cardID;
    title;
    className;
    cardCreated = false;
    padding = '10px';
    entireIMG = false;
    customIDForIMG;
    hasImage = false;
    hasTitle = false;
    hasDescription = false;
    constructor(name, cardID, title, description, image, entireIMG, customIDForIMG, alt, imgWidth, imgHeight, padding, className) {
        this.name = name;
        this.cardID = cardID;
        if (image) {
            this.image = image;
            this.hasImage = true;
        }
        else {
            this.image = '';
        }
        if (title) {
            this.title = title;
            this.hasTitle = true;
        }
        else {
            this.title = '';
        }
        className ? this.className = className : this.className = '';
        alt ? this.alt = alt : this.alt = '';
        imgHeight ? this.imgHeight = imgHeight : this.imgHeight = "100";
        imgWidth ? this.imgWidth = imgWidth : this.imgWidth = "100";
        if (description) {
            this.description = description;
            this.hasDescription = true;
        }
        else {
            this.description = '';
        }
        if (customIDForIMG)
            this.customIDForIMG = customIDForIMG;
        if (padding)
            this.padding = padding;
        if (entireIMG)
            this.entireIMG = true;
        if (title && image && entireIMG && description) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> <h3 id=${this.cardID + 1}>${this.title}</h3> ${this.image} <div id=${this.cardID + 3}>${this.description}</div></div>`;
        }
        else if (title && description && image) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> <h3 id=${this.cardID + 1}>${this.title}</h3><img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/> <div id=${this.cardID + 3}>${this.description}</div></div>`;
        }
        else if (title && image) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> <h3 id=${this.cardID + 1}>${this.title}</h3><img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/></div>`;
        }
        else if (description && image && entireIMG) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> ${this.image} <div id=${this.cardID + 3}>${this.description}</div></div>`;
        }
        else if (title && image && entireIMG) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> <h3 id=${this.cardID + 1}>${this.title}</h3> ${this.image} </div>`;
        }
        else if (description && image) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> <img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/> <div id=${this.cardID + 3}>${this.description}</div></div>`;
        }
        else if (description && title) {
            this.self = `<div id=${this.cardID} style="padding:${this.padding} class=${this.className}"> <h3 id=${this.cardID + 1}>${this.title}</h3> <div id=${this.cardID + 3}>${this.description}</div></div>`;
        }
    }
    set Name(name) {
        this.name = name;
    }
    set Description(desc) {
        this.description = desc;
    }
    set Image(img) {
        this.image = img;
    }
    appendCard(htmlElement, position, orientationOfCardElements, gap, padding, borderRadius) {
        htmlElement.insertAdjacentHTML(position, this.self);
        let card = document.getElementById(this.cardID);
        card.style.display = 'flex';
        card.style.flexDirection = orientationOfCardElements;
        if (gap) {
            card.style.gap = gap;
        }
        else {
            card.style.gap = '8px';
        }
        if (padding) {
            this.padding = padding;
            card.style.padding = this.padding;
        }
        else {
            card.style.padding = this.padding;
        }
        if (borderRadius)
            card.style.borderRadius = borderRadius;
        this.cardCreated = true;
    }
    getCardIMG() {
        if (!this.cardCreated || !this.hasImage)
            return null;
        if (this.entireIMG) {
            if (!this.customIDForIMG)
                alert("ID needed when card is created with entire image");
            return document.getElementById(this.customIDForIMG);
        }
        return document.getElementById(this.cardID + 2);
    }
    getCardDescription() {
        if (!this.cardCreated || !this.hasDescription)
            return null;
        return document.getElementById(this.cardID + 3);
    }
    getCardTitle() {
        if (!this.cardCreated || !this.hasImage)
            return null;
        return document.getElementById(this.cardID + 1);
    }
    getCard() {
        if (!this.cardCreated)
            return null;
        return document.getElementById(this.cardID);
    }
    updateDescription(description) {
        throw new Error("Not implemented.");
        this.description = description;
        this.self = `<div id=${this.cardID} class=${this.className}><h3 id=${this.cardID + 1}>${this.title}</h3><img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/> <div id=${this.cardID + 3}>${this.description}</div></div>`;
    }
    updateImage(img, alt) {
        throw new Error("Not implemented.");
        this.image = img;
        this.alt = alt;
        this.self = `<div id=${this.cardID} class=${this.className}><h3 id=${this.cardID + 1}>${this.title}</h3><img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/> <div id=${this.cardID + 3}>${this.description}</div></div>`;
    }
    editImageCSS(border, borderRadius, height, width, background, boxShadow, filter) {
        if (!this.cardCreated) {
            alert(`${this.name} has not been created yet. Please append it to an element to create it.`);
            return;
        }
        if (this.entireIMG) {
            if (!this.customIDForIMG)
                alert("ID needed when card is created with entire image");
            return;
        }
        let image;
        if (this.customIDForIMG) {
            image = document.getElementById(this.customIDForIMG);
        }
        else {
            image = document.getElementById(this.cardID + 2);
        }
        let imageStyle = image.style;
        if (border)
            imageStyle.border = border;
        if (borderRadius)
            imageStyle.borderRadius = borderRadius;
        if (height)
            imageStyle.height = height;
        if (width)
            imageStyle.width = width;
        if (background)
            imageStyle.background = background;
        if (boxShadow)
            imageStyle.boxShadow = boxShadow;
        if (filter)
            imageStyle.filter = filter;
    }
}
//# sourceMappingURL=Card.js.map