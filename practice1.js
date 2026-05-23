const config = {
    data() {
        return {
            cells: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
    },
    methods: {
        onClickCell(idx) {
            this.cells[idx]++;
            if (this.cells[idx] >= 3)
                this.cells[idx] = 0;
        },
        clearGame() {
            this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
};

const app = Vue.createApp(config);

app.mount("#app");