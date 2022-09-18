class Food {
    constructor(lengthX, lengthY) {
        this.lengthX = lengthX;
        this.lengthY = lengthY;
    }

    // отображение еды
    paint() {
        let f = document.createElement('div');
        let x = this.getPosition(this.lengthX);
        let y = this.getPosition(this.lengthY);;
        let elementField = document.querySelector('div[data-xy="' + x + ',' + y + '"]');
        if(elementField.classList.contains('snake')) {
            this.paint();
        } else {
            elementField.classList.add('food');
        }
    }

    // получение координат еды
    getPosition(lengthField) {
        return Math.round(Math.random() * (lengthField-1));
    }
}