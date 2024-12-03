import { openDb } from '../configDB.js';


export async function selectPositions(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Positions')
            .then(result => res.json(result))
    });
}

export async function selectPosition(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Positions WHERE id=?', [id])
            .then(result => res.json(result) );
    });
}

export async function insertPosition(req, res){
    let position = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Positions (name) VALUES (?)', [position.name]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updatePosition(req, res){
    let position = req.body;
    openDb().then(db=>{
        db.run('UPDATE Positions SET name=? WHERE id=?', [position.name, position.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deletePosition(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Positions WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}