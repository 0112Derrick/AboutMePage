export default class Card {
  private name: string;
  private description: string;
  private image: string;
  private alt: string;
  private imgWidth: string;
  private imgHeight: string;
  private elements: HTMLElement[];
  private self: string;
  private cardID: string
  private title: string;
  private className: string;
  private cardCreated: boolean = false;
  private padding: string = '10px';
  private entireIMG = false;
  private customIDForIMG: string
  private hasImage: boolean = false;
  private hasTitle: boolean = false;
  private hasDescription: boolean = false;

  /**
   * 
   * @param name 
   * @param cardID 
   * @param title 
   * @param description 
   * @param image can be used as an entire image if entireIMG == true or image src if entireIMG == false
   * @param entireIMG 
   * @param customIDForIMG 
   * @param alt 
   * @param imgWidth 
   * @param imgHeight 
   * @param padding 
   * @param className 
   */
  constructor(name: string, cardID: string, title?: string, description?: string, image?: string, entireIMG?: boolean, customIDForIMG?: string, alt?: string, imgWidth?: string, imgHeight?: string, padding?: string, className?: string,) {

    this.name = name;
    this.cardID = cardID;

    if (image) {
      this.image = image;
      this.hasImage = true;
    } else {
      this.image = '';
    }

    if (title) {
      this.title = title;
      this.hasTitle = true;
    } else {
      this.title = '';
    }

    className ? this.className = className : this.className = '';
    alt ? this.alt = alt : this.alt = '';
    imgHeight ? this.imgHeight = imgHeight : this.imgHeight = "100";
    imgWidth ? this.imgWidth = imgWidth : this.imgWidth = "100";

    if (description) {
      this.description = description;
      this.hasDescription = true;
    } else {
      this.description = '';
    }

    if (customIDForIMG)
      this.customIDForIMG = customIDForIMG

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

  set Name(name: string) {
    this.name = name;
  }

  set Description(desc: string) {
    this.description = desc;
  }

  set Image(img: string) {
    this.image = img;
  }

  //Provide an html element to append to.
  appendCard(htmlElement: HTMLElement, position: 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend', orientationOfCardElements: 'column' | 'row', gap?: string, padding?: string, borderRadius?: string) {
    htmlElement.insertAdjacentHTML(position, this.self);
    let card = document.getElementById(this.cardID);
    card.style.display = 'flex';
    card.style.flexDirection = orientationOfCardElements;

    if (gap) {
      card.style.gap = gap;
    } else { card.style.gap = '8px' }

    if (padding) {
      this.padding = padding;
      card.style.padding = this.padding;
    } else { card.style.padding = this.padding }

    if (borderRadius)
      card.style.borderRadius = borderRadius;

    this.cardCreated = true;
  }

  getCardIMG(): HTMLElement | null {
    if (!this.cardCreated || !this.hasImage)
      return null;

    if (this.entireIMG) {
      if (!this.customIDForIMG)
        alert("ID needed when card is created with entire image");

      return document.getElementById(this.customIDForIMG);
    }

    return document.getElementById(this.cardID + 2);
  }

  getCardDescription(): HTMLElement | null {
    if (!this.cardCreated || !this.hasDescription)
      return null;

    return document.getElementById(this.cardID + 3);
  }

  getCardTitle(): HTMLElement | null {
    if (!this.cardCreated || !this.hasImage)
      return null;

    return document.getElementById(this.cardID + 1);
  }

  getCard(): HTMLElement | null {
    if (!this.cardCreated)
      return null;

    return document.getElementById(this.cardID);
  }

  updateDescription(description: string) {
    throw new Error("Not implemented.")
    this.description = description;

    this.self = `<div id=${this.cardID} class=${this.className}><h3 id=${this.cardID + 1}>${this.title}</h3><img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/> <div id=${this.cardID + 3}>${this.description}</div></div>`;
  }

  updateImage(img: string, alt: string) {
    throw new Error("Not implemented.")
    this.image = img;
    this.alt = alt;
    this.self = `<div id=${this.cardID} class=${this.className}><h3 id=${this.cardID + 1}>${this.title}</h3><img id=${this.cardID + 2} src=${this.image} alt=${this.alt} width=${this.imgWidth} height=${this.imgHeight}/> <div id=${this.cardID + 3}>${this.description}</div></div>`;
  }

  editImageCSS(border?: string, borderRadius?: string, height?: string, width?: string, background?: string, boxShadow?: string, filter?: string) {
    if (!this.cardCreated) {
      alert(`${this.name} has not been created yet. Please append it to an element to create it.`);
      return;
    }

    if (this.entireIMG) {
      if (!this.customIDForIMG)
        alert("ID needed when card is created with entire image");
      return
    }

    let image;

    if (this.customIDForIMG) {
      image = document.getElementById(this.customIDForIMG)
    } else {
      image = document.getElementById(this.cardID + 2);
    }
    let imageStyle = image.style;

    if (border)
      imageStyle.border = border;

    if (borderRadius)
      imageStyle.borderRadius = borderRadius;

    if (height)
      imageStyle.height = height

    if (width)
      imageStyle.width = width

    if (background)
      imageStyle.background = background;

    if (boxShadow)
      imageStyle.boxShadow = boxShadow;

    if (filter)
      imageStyle.filter = filter;
  }



}