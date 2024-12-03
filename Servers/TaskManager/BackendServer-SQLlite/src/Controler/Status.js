import { openDb } from '../configDB.js';


export async function selectStatuses(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Statuses')
            .then(result => res.json(result))
    });
}

export async function selectStatus(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Statuses WHERE id=?', [id])
            .then(result => res.json(result) );
    });
}

export async function insertStatus(req, res){
    let status = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Statuses (name) VALUES (?)', [status.name]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updateStatus(req, res){
    let status = req.body;
    openDb().then(db=>{
        db.run('UPDATE Statuses SET name=? WHERE id=?', [status.name, status.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deleteStatus(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Statuses WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}