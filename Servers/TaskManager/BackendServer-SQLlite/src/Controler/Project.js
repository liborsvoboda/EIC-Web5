import { openDb } from '../configDB.js';


export async function selectProjects(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Projects')
            .then(result => res.json(result))
    });
}

export async function selectProject(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Projects WHERE id=?', [id])
            .then(result => res.json(result) );
    });
}

export async function insertProject(req, res){
    let project = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Projects (name, desc) VALUES (?,?)', [project.name, project.desc]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updateProject(req, res){
    let project = req.body;
    openDb().then(db=>{
        db.run('UPDATE Projects SET Name=?, Desc=? WHERE id=?', [project.name, project.desc, project.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deleteProject(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Projects WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}