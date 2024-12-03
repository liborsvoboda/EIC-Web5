import { openDb } from '../configDB.js';


export async function selectTasks(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Tasks')
            .then(result => res.json(result))
    });
}

export async function selectTask(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Tasks WHERE id=?', [id])
            .then(result => res.json(result) );
    });
}

export async function insertTask(req, res){
    let task = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Tasks (Name,EndDate,StatusId,ProjectId,Priority,File,FileName) VALUES (?,?,?,?,?,?,?)', [task.name, task.enddate, task.statusid, task.projectid, task.priority, task.file, task.filename]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updateTask(req, res){
    let task = req.body;
    openDb().then(db=>{
        db.run('UPDATE Tasks SET Name=?, EndDate=?, StatusId=?, ProjectId=?, Priority=?, File=?, FileName=? WHERE id=?', [task.name, task.enddate, task.statusid, task.projectid, task.priority, task.file, task.filename, task.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deleteTask(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Tasks WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}