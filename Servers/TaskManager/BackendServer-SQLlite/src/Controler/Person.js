import { openDb } from '../configDB.js';


export async function selectPersons(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Persons')
            .then(result => res.json(result))
    });
}

export async function selectPerson(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Persons WHERE id=?', [id])
            .then(result => res.json(result) );
    });
}

export async function insertPerson(req, res){
    let person = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Persons (FirstName,LastName,PositionId) VALUES (?,?,?)', [person.firstname, person.lastname, person.positionid]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updatePerson(req, res){
    let person = req.body;
    openDb().then(db=>{
        db.run('UPDATE Persons SET FirstName=?, LastName=?, PositionId=? WHERE id=?', [person.firstname, person.lastname, person.positionid, person.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deletePerson(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Persons WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}