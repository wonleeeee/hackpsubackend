const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = path.resolve(__dirname, "./smallcoursesample.csv");
let results = []

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // console.log(Object.values(row)[0]);
    // console.log(row['General Info']);
    // console.log(row['Main Category']);
    // console.log(row['Sub Category']);
    // console.log(row.Type);
    // console.log(row.Content);
    // let temp = row['General Info'].replace(/\r?\n|\r/g, ", ")
    // temp = temp.replace(", ,", ",")
    let ga = row['General Info'].includes('GA')
    let gn = row['General Info'].includes('GN')
    let gs = row['General Info'].includes('GS')
    let gh = row['General Info'].includes('GH')
    let il = row['General Info'].includes('IL')

    let temp = [];

    if (ga) temp.push('GA')
    if (gn) temp.push('GN')
    if (gs) temp.push('GS')
    if (gh) temp.push('GH')
    if (il) temp.push('IL')


    // console.log(temp)

    results.push([Object.values(row)[0], temp, row['Main Category'], row['Sub Category'], row.Type, row.Content]);

    // console.log(row);

    // results.push(row);
  })
  .on('end', () => {
    console.log(results);
  });

// const reader = require('xlsx');

// let data = [];

// const file = reader.readFile('./test.xlsx');

// const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
// temp.forEach((res) => {
//   data.push(res);
// })