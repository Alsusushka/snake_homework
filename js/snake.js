class Snake {
    constructor() {
        this._body = [[1,4],[1,3]];
        this._direction = 'right';
        this._length = 2;
        this._falg = false;
    }

    /* отображение змейки*/
    paint() {
        //Цикл проходит по всем составным частям змеи
        for (let i = 0; i < this._length; i++){
            let elementSnake = this._body[i];
            if (elementSnake) {
                document.querySelector('div[data-xy="' + elementSnake.join() + '"]').classList.add('snake');
            }
        }
    }

    // изменение змейки
    update(head, status) {
        let elementField = document.querySelector('div[data-xy="' + head.join() + '"]');
        this._body.unshift(head);
        elementField.classList.add('snake');
        switch(status) {
            case "food_not":
                let removeTail = this._body.pop();
                document.querySelector('div[data-xy="' + removeTail.join() + '"]').classList.remove('snake');
                break;
            case "food_yes":
                elementField.classList.remove('food');
                this._length++;
                break;
        }
        
    }

    // управление змейки
    control() {
        if (this._direction) {
            let head = this._body[0].concat();
            switch(this._direction) {
                case "left":
                    head[1] -= 1;
                    break;

                case "right":
                    head[1] += 1;
                    break;

                case "up":
                    head[0] -= 1;
                    break;

                case "down":
                    head[0] += 1;
                    break;
            }
            return this.death(head);
        }
        return;
    }

    // пройгрыш
    death(head) {
        let result = '';
        let elementField = document.querySelector('div[data-xy="' + head.join() + '"]');
        if (elementField == null ) { //если текущая ячейка вне поля
            debugger
            //возвращаем, конец игры
            result = 'game_over';
        } else if (elementField.className == 'cell' ){ //Если занята ячейка – это пустая клетка, то рисую там змею 
            //возвращаем, что зменя не съела еду
            result = 'food_not';
            // обновляем змею
            this.update(head, result)
        } else if (elementField.classList.contains('food')) {
            //возвращаем, что зменя съела еду
            result = 'food_yes';
            // обновляем змею
            this.update(head, result)
        } else if (elementField.classList.contains('snake')) {
            debugger
            //возвращаем, конец игры
            result = 'game_over';
        }
        this._falg = false;
        return result;
    }

    getLength() {
        return this._length;
    }

    keyHandler(keyCode) {
        if (this._falg) {
            return;
        }
        
        let direction = this._direction;
        switch (keyCode) {
            case 37: //стрелка влево
                if (direction != 'right') {
                    this._direction = 'left';
                    this._falg = true;
                }
                break;

            case 39: //стрелка вправо
                if (direction != 'left') {
                    this._direction = 'right';
                    this._falg = true;
                }
                break;

            case 38: //стрелка вверх
                if (direction != 'down'){
                    this._direction = 'up';
                    this._falg = true;
                }
                break;

            case 40: //стрелка вниз
                if (direction != 'up'){
                    this._direction = 'down';
                    this._falg = true;
                }
                break;

            default:
                return;
        }
    }
}