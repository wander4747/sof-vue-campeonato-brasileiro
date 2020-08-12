class Team {
    constructor(name, shield) {
        this.name = name
        this.shield = shield
        this.points = 0;
        this.goalsScored = 0;
        this.goalsConceded = 0;
        this.balance = 0;
    }

    endGame(visitingTeam, goalsScored, goalsConceded) {
        if (this.wasATie(goalsScored, goalsConceded)) {
            this.aTie(goalsScored, goalsConceded);
            visitingTeam.aTie(goalsScored, goalsConceded);
            return;
        }

        if (this.wasVictory(goalsScored, goalsConceded)) {
            this.victory(goalsScored, goalsConceded);
            visitingTeam.defeat(goalsConceded, goalsScored);
        } else {
            this.defeat(goalsScored, goalsConceded);
            visitingTeam.victory(goalsConceded, goalsScored);
        }
    }

    //FOI EMPATE
    wasATie(goalsScored, goalsConceded) {
        return goalsScored === goalsConceded;
    }

    //FOI VITORIA
    wasVictory(goalsScored, goalsConceded) {
        return goalsScored > goalsConceded;
    }

    //EMPATE
    aTie(goalsScored, goalsConceded) {
        this.updateInfo(1, goalsScored, goalsConceded)
    }

    victory(goalsScored, goalsConceded) {
        this.updateInfo(3, goalsScored, goalsConceded)
    }

    defeat(goalsScored, goalsConceded) {
        this.updateInfo(0, goalsScored, goalsConceded)
    }

    updateInfo(points, goalsScored, goalsConceded) {
        this.points += points;
        this.goalsScored += goalsScored;
        this.goalsConceded += goalsConceded;
        this.balance = this.goalsConceded - this.goalsConceded;
    }
}

new Vue({
    el: "#app",
    data: {
        search: '',
        gols: '0',
        order: {
            labels: ['Pontos', 'Gols feitos', 'Gols sofridos', 'Saldo de gols'],
            columns: ['points', 'goalsScored', 'goalsConceded', 'balance'],
            sorts: ['desc', 'desc', 'asc', 'desc']
        },
        teams: [
            new Team('palmeiras', 'assets/img/palmeiras_60x60.png'),
            new Team('Internacional', 'assets/img/internacional_60x60.png'),
            new Team('Flamengo', 'assets/img/flamengo_60x60.png'),
            new Team('Atlético-MG', 'assets/img/atletico_mg_60x60.png'),
            new Team('Santos', 'assets/img/santos_60x60.png'),
            new Team('Botafogo', 'assets/img/botafogo_60x60.png'),
            new Team('Atlético-PR', 'assets/img/atletico-pr_60x60.png'),
            new Team('Corinthians', 'assets/img/corinthians_60x60.png'),
            new Team('Grêmio', 'assets/img/gremio_60x60.png'),
            new Team('Fluminense', 'assets/img/fluminense_60x60.png'),
            new Team('Bahia', 'assets/img/bahia_60x60.png'),
            new Team('Chapecoense', 'assets/img/chapecoense_60x60.png'),
            new Team('São Paulo', 'assets/img/sao_paulo_60x60.png'),
            new Team('Cruzeiro', 'assets/img/cruzeiro_60x60.png'),
            new Team('Sport', 'assets/img/sport_60x60.png'),
            new Team('Ceará', 'assets/img/ceara_60x60.png'),
            new Team('Vitória', 'assets/img/vitoria_60x60.png'),
            new Team('Vasco', 'assets/img/vasco_60x60.png'),
            new Team('América-MG', 'assets/img/america_mg_60x60.png'),
            new Team('Paraná', 'assets/img/parana_60x60.png'),
        ],
        vision: 'table',
        newGame: {
            home: {
                team: null,
                goals: 0
            },
            out: {
                team: null,
                goals: 0
            },
        },
    },
    computed: {
        liberatorsTeam(teams) {
            return this.teams.slice(0, 6);
        },
        demotedTeam(teams) {
            return this.teams.slice(16, 20);
        },
        sortTeam() {
            let teams = _.orderBy(this.teams, this.order.columns, this.order.sorts);
            let self = this;

            return _.filter(teams, function(team) {
                let search = self.search.toLowerCase();
                return team.name.toLowerCase().indexOf(search) >= 0;
            });
        }
    },
    methods: {
        showAlert() {
            alert("Fim de jogo");
        },
        getValue(event) {
            this.gols = event.data;
        },
        createNewGame() {
            let indexHome = Math.floor(Math.random() * 20),
                indexOut = Math.floor(Math.random() * 20);

            this.newGame.home.team = this.teams[indexHome];
            this.newGame.home.goals = 0;
            this.newGame.out.team = this.teams[indexOut];
            this.newGame.out.goals = 0;

            this.vision = 'scoreboard';
        },
        endGame() {
            let goalsScored = parseInt(this.newGame.home.goals);
            let goalsConceded = parseInt(this.newGame.out.goals);
            let opposingTeam = this.newGame.out.team;
            let homeTeam = this.newGame.home.team;

            homeTeam.endGame(opposingTeam, goalsScored, goalsConceded);
            this.vision = 'table';
        },
        orderSortDesc(index) {
            this.$set(this.order.sorts, index, this.order.sorts[index] == 'desc' ? 'asc' : 'desc')
        }
    },
    filters: {
        balance(team) {
            return team.goalsScored - team.goalsConceded;
        },
        ucwords(value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})