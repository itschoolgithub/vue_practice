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
            this.hardMode = hardMode;
            this.gamePlaying = true;
            this.leftTime = 30;
            this.scores = 0;
            this.prevCell = null;
            this.clearField();
            setTimeout(this.tick, 100);
        },
        restartGame() {
            this.gameFinished = false;
            this.startGame();
        },
        clearField() {
            this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        },
        tick() {
            this.tickNumber++;
            if (this.leftTime <= 0) {
                this.gamePlaying = false;
                this.gameFinished = true;
                return;
            }
            if (this.tickNumber == 5) {
                if (this.hardMode) {
                    this.spaunEnemy();
                }
            }
            if (this.tickNumber >= 10) {
                this.leftTime--;
                this.tickNumber = 0;
                this.spaunEnemy();
            }
            
            setTimeout(this.tick, 100);
        },
        spaunEnemy() {
            this.clearField();
            let index = Math.round(Math.random()*8);
            if (this.prevCell == index) {
                this.spaunEnemy();
                return;
            }
            this.prevCell = index;
            this.cells[index] = this.getTypeEnemy();
        },
        getTypeEnemy() {
            let chance = Math.round(Math.random()*3)
            if (chance == 3) {
                return 3;
            }
            return 1;
        },
        onClickCell(index) {
            if (this.cells[index] == 1) {
                this.scores++;
                this.cells[index]++;
            } else if (this.cells[index] == 3) {
                this.scores--;
                this.cells[index]++;
            }
        }
    }
};

const app = Vue.createApp(config);

app.mount("#app");