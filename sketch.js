const length = 10;

const grid = [];

const cell_size = 10;

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
    console.log(`${mouseX} ${mouseY}`);

    let index = 0;

    for (let i = 0; i < length; i++)
        // if (i * cell_size)


        if (mouseY < 10 && mouseX < 10)
            grid[0][0] = !grid[0][0];



}