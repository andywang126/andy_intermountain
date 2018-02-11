var boxes = [],
    turn = 'X',
    score,
    moves;

/**
 * Initialization.
 */
function init() {
    var board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    var identifier = 1;
    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == 3 - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.identifier = identifier;
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    $("#player1").css("color", "red");
    $("#player1Score").css("color", "red");

    startNewGame();
}

/**
 * New game
 */
function startNewGame() {
    score = {
        'X': 0,
        'O': 0
    };
    moves = 0;
    turn = 'X';
    boxes.forEach(function(square) {
        square.innerHTML = '&nbsp;';
    });
    $("#player1").css("color", "red");
    $("#player1Score").css("color", "red");
    $("#player2").css("color", "black");
    $("#player2Score").css("color", "black");
}

/**
 * return X or O for selected block.
 */
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element) {
        return RegExp(text).test(element.textContent);
    });
}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
    if (this.innerHTML !== '&nbsp;') {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    if (win(this)) {
        num = turn === 'X' ? '1' : '2';
        var curScore = $("#player" + num + 'Score');
        curScore.text(parseInt(curScore.text(), 10) + 1);
        startNewGame();
    } else if (moves === 9) {
        var curScore = $("#tieScore");
        curScore.text(parseInt(curScore.text(), 10) + 1);
        startNewGame();
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        num1 = turn === 'X' ? '1' : '2';
        num2 = turn === 'X' ? '2' : '1';
        $("#player" + num1).css("color", "red");
        $("#player" + num2).css("color", "grey");
        $("#player" + num1 + "Score").css("color", "red");
        $("#player" + num2 + "Score").css("color", "grey");
    }
}

/**
 * Check winning condition.
 */
function win(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        var items = contains('#tictactoe ' + testClass, turn);
        if (items.length == 3) {
            return true;
        }
    }
    return false;
}

init();