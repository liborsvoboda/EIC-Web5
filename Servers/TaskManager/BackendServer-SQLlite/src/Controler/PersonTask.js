import { openDb } from '../configDB.js';


export async function selectPersonTasks(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM PersonTasks')
            .then(result => res.json(result))
    });
}

export async function selectPersonTask(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM PersonTasks WHERE id=?', [id])
            .then(result => res.json(result) );
    });
}

export async function insertPersonTask(req, res){
    let persontask = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO PersonTasks (PersonId,TaskId) VALUES (?,?)', [persontask.personid, persontask.taskid]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updatePersonTask(req, res){
    let persontask = req.body;
    openDb().then(db=>{
        db.run('UPDATE PersonTasks SET PersonId=?, TaskId=? WHERE id=?', [persontask.personid, persontask.taskid, persontask.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deletePersonTask(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM PersonTasks WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}