const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const config = require('./config');

const inputFile = path.resolve(__dirname, "./smallcoursesample.csv");
let results = []

const writeCourseSql = 
    "insert into course (name, general_id, category_id, type_id, content_id) values (?, ?, ?, ?, ?)"

const writeTypeSql = 
    "insert into course_general_info (ga, gs, gh, gn, il) values (?)"

const writeCategorySql1 =
    "insert into course_category (main1, sub1) values (?)"
const writeCategorySql2 = 
    "insert into course_category (main1, sub1, main2, sub2) values (?)"

const writeContent1 =
    "insert into course_content (hash1) values (?)"
const writeContent2 =
    "insert into course_content (hash1, hash2) values (?)"
const writeContent3 =
    "insert into course_content (hash1, hash2, hash3) values (?)"
const writeContent4 =
    "insert into course_content (hash1, hash2, hash3, hash4) values (?)"
const writeContent5 =
    "insert into course_content (hash1, hash2, hash3, hash4, hash5) values (?)"
const writeContent6 =
    "insert into course_content (hash1, hash2, hash3, hash4, hash5, hash6) values (?)"
const writeContent7 =
    "insert into course_content (hash1, hash2, hash3, hash4, hash5, hash6, hash7) values (?)"
const writeContent8 =
    "insert into course_content (hash1, hash2, hash3, hash4, hash5, hash6, hash7, hash8) values (?)"
const writeContent9 =
    "insert into course_content (hash1, hash2, hash3, hash4, hash5, hash6, hash7, hash8, hash9) values (?)"
const writeContent10 =
    "insert into course_content (hash1, hash2, hash3, hash4, hash5, hash6, hash7, hash8, hash9, hash10) values (?)"

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

    if (ga) temp.push(1)
    else temp.push(0)
    if (gs) temp.push(1)
    else temp.push(0)
    if (gh) temp.push(1)
    else temp.push(0)
    if (gn) temp.push(1)
    else temp.push(0)
    if (il) temp.push(1)
    else temp.push(0)

    // console.log(temp)

    results.push([Object.values(row)[0], temp, row['Main Category'], row['Sub Category'], row.Type, row.Content]);

    // console.log(row);

    // results.push(row);
  })
  .on('end', () => {
    // console.log(results);
    for (row in results) {
        // Course name
        console.log(results[row][0]);
        console.log(parseInt(row, 10)+1)
        config.db.query(writeCourseSql, [results[row][0], parseInt(row, 10)+1, parseInt(row, 10)+1, parseInt(row, 10)+1, parseInt(row, 10)+1], (err, result) => {
            if (err) console.log(err)
        })

        // Course general info

        // console.log(results[row][1])
        // config.db.query(writeTypeSql, [results[row][1]], (err, result) => {
        //     if (err) console.log(err);
        // })

        // Course category
        // let temp = []
        // console.log(results[row][2])
        // console.log(results[row][3])
        // if (results[row][2].includes('Visual Art')) {
        //     temp.push(0)
        //     if (results[row][3].includes('Digital') | results[row][3].includes('digital')){
        //         temp.push(0)
        //     } else if (results[row][3].includes('Drawing') | results[row][3].includes('drawing')){
        //         temp.push(1)
        //     } else if (results[row][3].includes('Painting') | results[row][3].includes('painting')){
        //         temp.push(2)
        //     } else if (results[row][3].includes('Sculpture') | results[row][3].includes('sculpture')){
        //         temp.push(3);
        //     } else {
        //         temp.push(4);
        //     }
        // }
        // if (results[row][2].includes('Media Art')) {
        //     temp.push(2)
        //     if (results[row][3].includes('Digital') | results[row][3].includes('digital')){
        //         temp.push(0)
        //     } else {
        //         temp.push(1)
        //     }
        // }
        // if (results[row][2].includes('Literature')) {
        //     temp.push(3)
        //     if (results[row][3].includes('Architecture') | results[row][3].includes('architecture')){
        //         temp.push(0)
        //     } else {
        //         temp.push(1)
        //     }
        // }
        // if (temp.length == 2) {
        //     config.db.query(writeCategorySql1, [temp], (err, result) => {
        //         if (err) console.log(err)
        //     })
        // }
        // else {
        //     config.db.query(writeCategorySql2, [temp], (err, result) => {
        //         if (err) console.log(err)
        //     })
        // }

        // Course Contents
 
        // if (results[row][5].substr(results[row][5].length-1, 1) == ",") {
        //     results[row][5] = results[row][5].slice(0, results[row][5].length-1)
        //     console.log(results[row][5])
        // }
        // if (results[row][5].split(",").length == 1) {
        //     config.db.query(writeContent1, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 2){
        //     config.db.query(writeContent2, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 3){
        //     config.db.query(writeContent3, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 4){
        //     config.db.query(writeContent4, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 5){
        //     config.db.query(writeContent5, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 6){
        //     config.db.query(writeContent6, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 7){
        //     config.db.query(writeContent7, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 8){
        //     config.db.query(writeContent8, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 9){
        //     config.db.query(writeContent9, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } else if (results[row][5].split(",").length == 10){
        //     config.db.query(writeContent10, [results[row][5].split(",")], (err, result) => {
        //         if (err) console.log(err);
        //     })
        // } 


        // console.log(results[row][5])

    }
  });