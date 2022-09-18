class Main {
    constructor(lengthX, lengthY) {
        this.lengthX = lengthX;
        this.lengthY = lengthY;
        this.game = new Game(this.lengthX, this.lengthY);
        this.snake = new Snake();
        this.food = new Food(this.lengthX, this.lengthY);
        this.timer = '';
        this.speed = 500;

        this.bestScor = localStorage.getItem("SnakeBestScore");
        if (this.bestScor) {
            document.querySelector('.best-score span').innerHTML = this.bestScor;
        }
    }

    
    /* отображение элементов */
    paint() {
        this.snake.paint();
        this.food.paint();
    }

    /* изменение элементов */
    update() {
        let result = this.snake.control();
        switch(result) {
            case "game_over":
                clearInterval(this.timer);

                let score = this.snake.getLength() - 2;
                // запись лучшего результата
                if (!this.bestScor || this.bestScor < score) {
                    localStorage.setItem("SnakeBestScore", score)
                    document.querySelector('.best-score span').innerHTML = score;
                }
            
                //вывод сообщения об окончании игры
                alert('Вы проиграли! Ваш счет: ' + (score) + '. Нажмите кнопку «Сбросить» для начала новой игры!');
                break;
            case "food_yes":
                //изменение количества очков
                document.querySelector('.score span').innerHTML = this.snake.getLength() - 2;

                //перерисовка еды
                this.food.paint();

                //увеличение скорости
                this.increaseSpeed();
                break;
        }
    }

    start() {
        clearInterval(this.timer);
        let self = this;
        this.timer = setInterval(function(){
            self.update();
        }, self.speed);
    }

    increaseSpeed() {
        this.speed -= 10;
        this.start();
    }

    keyHandler(keyCode) {
        let direction = this.snake.getDirection();
        switch (keyCode) {
            case 37: //стрелка влево
                if (direction != 'right') {
                    direction = 'left';
                }
            break;

            case 39: //стрелка вправо
                if (direction != 'left') {
                    direction = 'right';
                }
            break;

            case 38: //стрелка вверх
                if (direction != 'down'){
                direction = 'up';
            }
            break;

            case 40: //стрелка вниз
                if (direction != 'up'){
                    direction = 'down';
                }
            break;

            default:
                return;
        }
        this.snake.setDirection(direction);
    }
}