const length = 9;

const grid = [];

let currentCandidate = 1;

const cell_size = 80;

const solve = true;

const circle_size = 20;

let checkBox;

let boxIsChecked = false;

// 282, one up or one down

const rowOperations = [
    [0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 2, 0, 1, 0],
    [1, 0, 1, 0, 0, 2, 0, 0],
]

const colOperations = [
    [1, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 2, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 2, 0, 1, 0, 2, 2],
    [0, 1, 0, 0, 0, 0, 2, 0, 0],
]



function setup() {
    createCanvas(750, 750);

    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let r = 0; r < length; r++) {
        grid.push([]);

        for (let c = 0; c < length; c++)
            grid[r].push([...candidates]);
    }

    checkbox = createCheckbox('Show highlights', boxIsChecked);

    checkbox.changed(myCheckedEvent);

}

function myCheckedEvent() {

    boxIsChecked = checkbox.checked();
}

function draw() {
    background(220);

    if (solve)
        solveGrid();

    for (let r = 0; r < length; r++)
        for (let c = 0; c < length; c++) {

            let str = "";

            let index = 0;

            for (let r1 = 0; r1 < 3; r1++) {
                for (let c1 = 0; c1 < 3; c1++) {
                    index++;

                    if (grid[r][c].indexOf(index) > -1)
                        str += `${index}`;
                    else
                        str += `_`;
                }

                str += '\n';
            }

            stroke('grey');

            strokeWeight(4);

            fill("white");

            if (boxIsChecked && grid[r][c].indexOf(currentCandidate) > -1)
                fill("red");

            rect(c * cell_size, r * cell_size, cell_size, cell_size);

            textSize(10);

            text(str, c * cell_size + 20, r * cell_size + 20);
        }

    textSize(10);

    text(`${currentCandidate}`, 32, 740);

    for (let r = 0; r < length; r++)
        for (let c = 0; c < length - 1; c++) {
            if (rowOperations[r][c] == 1) {
                noStroke();
                fill("black");

                const x = 70 + cell_size * c;

                const y = 30 + cell_size * r;

                rect(x, y, circle_size, circle_size);
            }

            if (rowOperations[r][c] == 2) {
                noStroke();
                fill("gray");

                const x = 70 + cell_size * c;

                const y = 30 + cell_size * r;

                rect(x, y, circle_size, circle_size);
            }
        }

    for (let r = 0; r < length - 1; r++)
        for (let c = 0; c < length; c++) {
            if (colOperations[r][c] == 1) {
                noStroke();
                fill("black");

                const x = 30 + cell_size * c;

                const y = 70 + cell_size * r;

                rect(x, y, circle_size, circle_size);
            }

            if (colOperations[r][c] == 2) {
                noStroke();
                fill("gray");

                const x = 30 + cell_size * c;

                const y = 70 + cell_size * r;

                rect(x, y, circle_size, circle_size);
            }
        }
}

function keyPressed() {
    switch (keyCode) {
        case 49:
            currentCandidate = 1;
            break;
        case 50:
            currentCandidate = 2;
            break;
        case 51:
            currentCandidate = 3;
            break;
        case 52:
            currentCandidate = 4;
            break;
        case 53:
            currentCandidate = 5;
            break;
        case 54:
            currentCandidate = 6;
            break;
        case 55:
            currentCandidate = 7;
            break;
        case 56:
            currentCandidate = 8;
            break;
        case 57:
            currentCandidate = 9;
            break;

    }
}

function mousePressed() {
    const clickedRow = mouseY;

    const clickedCol = mouseX;

    let r = -1;

    let c = -1;

    if (clickedRow < 0) return;

    for (let i = 1; i < length * cell_size; i += cell_size) {
        if (clickedRow < i)
            break;

        r++;
    }

    if (clickedCol < 0) return;

    for (let i = 1; i < length * cell_size; i += cell_size) {
        if (clickedCol < i)
            break;

        c++;
    }

    const index = grid[r][c].indexOf(currentCandidate);

    if (index > -1)
        grid[r][c].splice(index, 1);
}

function solveGrid() {
    for (let r = 0; r < length; r++)
        for (let c = 0; c < length; c++) {
            if (grid[r][c].length != 1) continue;

            for (let r1 = 0; r1 < length; r1++) {
                if (r1 == r) continue;

                const index = grid[r1][c].indexOf(grid[r][c][0]);

                if (index < 0) continue;

                grid[r1][c].splice(index, 1);
            }

            for (let c1 = 0; c1 < length; c1++) {
                if (c1 == c) continue;

                const index = grid[r][c1].indexOf(grid[r][c][0]);

                if (index < 0) continue;

                grid[r][c1].splice(index, 1);
            }
        }

    for (let r = 0; r < length; r++)
        for (let c = 0; c < length - 1; c++) {

            if (rowOperations[r][c] == 1) {
                const loc0 = [r, c];

                const loc1 = [r, c + 1];
                for (let candidate0 of[...grid[loc0[0]][loc0[1]]]) {

                    const candidateMinus = candidate0 - 1;

                    let index = grid[loc1[0]][loc1[1]].indexOf(candidateMinus);

                    if (index > -1) continue;

                    index = grid[loc0[0]][loc0[1]].indexOf(candidate0);

                    grid[loc0[0]][loc0[1]].splice(index, 1);
                }

                for (let candidate0 of[...grid[loc1[0]][loc1[1]]]) {

                    const candidatePlus = candidate0 + 1;

                    let index = grid[loc0[0]][loc0[1]].indexOf(candidatePlus);

                    if (index > -1) continue;

                    index = grid[loc1[0]][loc1[1]].indexOf(candidate0);

                    grid[loc1[0]][loc1[1]].splice(index, 1);
                }
            }

            if (rowOperations[r][c] == 2) {
                const loc0 = [r, c];

                const loc1 = [r, c + 1];
                for (let candidate0 of[...grid[loc0[0]][loc0[1]]]) {

                    const candidateMinus = candidate0 + 1;

                    let index = grid[loc1[0]][loc1[1]].indexOf(candidateMinus);

                    if (index > -1) continue;

                    index = grid[loc0[0]][loc0[1]].indexOf(candidate0);

                    grid[loc0[0]][loc0[1]].splice(index, 1);
                }

                for (let candidate0 of[...grid[loc1[0]][loc1[1]]]) {

                    const candidatePlus = candidate0 - 1;

                    let index = grid[loc0[0]][loc0[1]].indexOf(candidatePlus);

                    if (index > -1) continue;

                    index = grid[loc1[0]][loc1[1]].indexOf(candidate0);

                    grid[loc1[0]][loc1[1]].splice(index, 1);
                }
            }


        }

    for (let r = 0; r < length - 1; r++)
        for (let c = 0; c < length; c++) {

            if (colOperations[r][c] == 1) {
                const loc0 = [r, c];

                const loc1 = [r + 1, c];
                for (let candidate0 of[...grid[loc0[0]][loc0[1]]]) {

                    const candidateMinus = candidate0 - 1;

                    let index = grid[loc1[0]][loc1[1]].indexOf(candidateMinus);

                    if (index > -1) continue;

                    index = grid[loc0[0]][loc0[1]].indexOf(candidate0);

                    grid[loc0[0]][loc0[1]].splice(index, 1);
                }

                for (let candidate0 of[...grid[loc1[0]][loc1[1]]]) {

                    const candidatePlus = candidate0 + 1;

                    let index = grid[loc0[0]][loc0[1]].indexOf(candidatePlus);

                    if (index > -1) continue;

                    index = grid[loc1[0]][loc1[1]].indexOf(candidate0);

                    grid[loc1[0]][loc1[1]].splice(index, 1);
                }
            }

            if (colOperations[r][c] == 2) {
                const loc0 = [r, c];

                const loc1 = [r + 1, c];
                for (let candidate0 of[...grid[loc0[0]][loc0[1]]]) {

                    const candidateMinus = candidate0 + 1;

                    let index = grid[loc1[0]][loc1[1]].indexOf(candidateMinus);

                    if (index > -1) continue;

                    index = grid[loc0[0]][loc0[1]].indexOf(candidate0);

                    grid[loc0[0]][loc0[1]].splice(index, 1);
                }

                for (let candidate0 of[...grid[loc1[0]][loc1[1]]]) {

                    const candidatePlus = candidate0 - 1;

                    let index = grid[loc0[0]][loc0[1]].indexOf(candidatePlus);

                    if (index > -1) continue;

                    index = grid[loc1[0]][loc1[1]].indexOf(candidate0);

                    grid[loc1[0]][loc1[1]].splice(index, 1);
                }
            }


        }
}