class Game {
    constructor(lengthX, lengthY) {
        let gameField = document.querySelector('div.game-field');
        for (let x = 0; x < lengthX; x++){
            let coordinateX = document.createElement('div');
            gameField.appendChild(coordinateX);
            coordinateX.className = 'field';
            for (let y = 0; y < lengthY; y++){
                let coordinateY = document.createElement('div');
                coordinateX.appendChild(coordinateY);
                coordinateY.className = 'cell';
                coordinateY.dataset.xy = x + ',' + y;
            }
        }
    }

}