const config = {
    data() {
        return {
            gamePlaying: false,
            gameFinished: false,
            leftTime: null,
            tickNumber: 0,
            scores: 0,
            cells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            prevCell: null,
            hardMode: false
        };
    },
    methods: {
        startGame(hardMode) {
            // начать игру
            // сбрасываем все переменные
            this.hardMode = hardMode;
            this.gamePlaying = true;
            this.leftTime = 30;
            this.scores = 0;
            this.prevCell = null;
            this.clearField();

            // запускам первый тик
            setTimeout(this.tick, 100);
        },
        restartGame() {
            // начать игру заново
            this.gameFinished = false;
            this.startGame();
        },
        clearField() {
            // очистка поля
            this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        },
        tick() {
            // увеличиваем тик на 1
            this.tickNumber++;

            if (this.tickNumber == 5) {
                if (this.hardMode) {
                    // если прошло 5 тиков и это тяжелый режим
                    // спавним моба
                    this.spaunMob();
                }
            }

            if (this.tickNumber >= 10) {
                // если прошло 10 тиков (т.е. секунда)
                this.leftTime--;
                this.tickNumber = 0;
                this.spaunMob();
            }

            if (this.leftTime <= 0) {
                // если время закончилось
                this.gamePlaying = false;
                this.gameFinished = true;
                return;
            }
            
            // снова вызываем Тик
            setTimeout(this.tick, 100);
        },
        spaunMob() {
            // очищаем поле
            this.clearField();
            // получаем рандомную клетку
            let index = Math.floor(Math.random()*8);
            if (this.prevCell == index) {
                // если выпала та же клетка, что и в прошлый раз
                this.spaunMob();
                return;
            }
            this.prevCell = index;
            // устанавливаем в клетку персонажа
            this.cells[index] = this.getTypeMob();
        },
        getTypeMob() {
            let chance = Math.floor(Math.random()*2)
            // 1 к 3, что выпадет енот
            if (chance == 2) {
                return 3;
            }
            // иначе нло
            return 1;
        },
        onClickCell(index) {
            if (this.cells[index] == 1) {
                // если это нло
                this.scores++;
                this.cells[index]++;
            } else if (this.cells[index] == 3) {
                // если это енот
                this.scores--;
                this.cells[index]++;
            }
        }
    }
};

const app = Vue.createApp(config);

app.mount("#app");