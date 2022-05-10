const length = 10;

const grid = [];

const cell_size = 30;

function setup()
{
    createCanvas(400, 400);

    for (let r = 0; r < length; r++) {
        grid.push([]);

        for (let c = 0; c < length; c++)
            grid[r].push(false);
    }

    grid[0][0] = 1;

    grid[3][3] = 1;
}

function draw()
{
    background(220);

    for (let r = 0; r < length; r++)
        for (let c = 0; c < length; c++) {
            if (grid[r][c])
                fill("green");
            else
                fill("black");

            rect(r * cell_size, c * cell_size, cell_size, cell_size);
        }
}

function mousePressed()
{
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

    grid[c][r] = !grid[c][r];
}