const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

const readSql =
    'select ga, va, pa, ma, li, digital, drawing, painting, sculpture, cinema, theater, dance, music, architecture, history, '
    + 'p_type.*, p_content.* '
    + 'from user '
    + 'join p_general_info on user.p_general_id = p_general_info.id '
    + 'join p_category on user.p_category_id = p_category.id '
    + 'join p_type on user.p_type_id = p_type.id '
    + 'join p_content on user.p_content_id = p_content.id '

const courseSql =
    'select course.name, user_id, course_type.*, course_content.* '
    + 'from taken_courses '
    + 'join course on course_id = course.id '
    + 'join course_type on course.type_id = course_type.id '
    + 'join course_content on course.content_id = course_content.id '
    + 'where user_id = ? or user_id = ? or user_id = ? or user_id=? or user_id=? or user_id=? or user_id=? or user_id=? or user_id=? '

app.post('/server', (req, res) => {
    // let user_list = Object.keys(req.body).sort().reduce((obj, key) => (obj[key] = req.body[key], obj), {})
    // console.log(Object.values(user_list))
    userData = Object.values(req.body)
    // console.log(userData)
    let simlist = {}
    config.db.query(readSql, (err, result) => {
        if (err) console.log(err);

        for (i in result) {
            let total = 0
            let comm = 0
            temp = Object.keys(result[i]).sort().reduce((obj, key) => (obj[key] = result[i][key], obj), {})
            temp = Object.values(temp)
            for (let j = 0; j<45; j++) {
                if (j==27) continue;
                if (j>10 & j<26) {
                    continue;
                }
                if (userData[j] != temp[j]) {
                    total += 1;
                } else if (userData[j] == temp[j] & userData == null) {
                    continue;
                } else {
                    comm += 1;
                    total += 1;
                }
            }
            simlist[((comm/total)*100).toFixed(2)] = parseInt(i, 10)+12
            console.log(total, comm, ((comm/total)*100).toFixed(2))
        }
        console.log(simlist)
        // retjson = parseFloat(Object.keys(simlist))
        let retjson = Object.keys(simlist).sort((a,b) => b-a).reduce((obj, key) => (obj[key] = simlist[key], obj), {})
        console.log(retjson)
        arr = Object.values(retjson)
        console.log(arr)
        retjson = []
        config.db.query(courseSql, arr, (error, resultb) => {
            if (error) console.log(error);
            console.log(resultb)
            retjson.push(resultb);
        })
        console.log(retjson)
        res.send(retjson)
    })
})

const server = app.listen(config.express.port, () => {
    console.log(`Server running on Port ${config.express.port}`);
});