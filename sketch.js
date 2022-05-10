const length = 9;

const grid = [];



const cell_size = 60;

function setup()
{
    createCanvas(600, 600);


    const candidates = [1, 2, 3, 5, 6, 7, 8, 9];


    for (let r = 0; r < length; r++) {
        grid.push([]);

        for (let c = 0; c < length; c++)
            grid[r].push([...candidates]);
    }

    // grid[0][0] = 1;

    // grid[3][3] = 1;
}

function draw()
{
    background(220);

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
                        str += `${0}`;



                }

                str += '\n';
            }

            // for (const t of grid[r][c]) {
            //     str += t + '\n';
            // }


            stroke('grey');

            strokeWeight(4);

            fill("white");

            rect(r * cell_size, c * cell_size, cell_size, cell_size);
            textSize(10);
            // text(str, r * cell_size, c * cell_size);
            text(str, r * cell_size + 20, c * cell_size + 20);

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