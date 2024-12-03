import { Router } from "express";

import { insertStatus, updateStatus, selectStatuses, selectStatus, deleteStatus } from './Controler/Status.js';
import { insertPosition, updatePosition, selectPositions, selectPosition, deletePosition } from './Controler/Position.js';
import { insertPerson, updatePerson, selectPersons, selectPerson, deletePerson } from './Controler/Person.js';
import { insertTask, updateTask, selectTasks, selectTask, deleteTask } from './Controler/Task.js';
import { insertProject, updateProject, selectProjects, selectProject, deleteProject } from './Controler/Project.js';
import { insertPersonTask, updatePersonTask, selectPersonTasks, selectPersonTask, deletePersonTask } from './Controler/PersonTask.js';


const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "SqLite Backend"
    })
})

router.get('/statuses', selectStatuses);
router.get('/status', selectStatus);
router.post('/status', insertStatus);
router.put('/status', updateStatus);
router.delete('/status', deleteStatus);

router.get('/positions', selectPositions);
router.get('/position', selectPosition);
router.post('/position', insertPosition);
router.put('/position', updatePosition);
router.delete('/position', deletePosition);

router.get('/persons', selectPersons);
router.get('/person', selectPerson);
router.post('/person', insertPerson);
router.put('/person', updatePerson);
router.delete('/person', deletePerson);

router.get('/tasks', selectTasks);
router.get('/task', selectTask);
router.post('/task', insertTask);
router.put('/task', updateTask);
router.delete('/task', deleteTask);

router.get('/projects', selectProjects);
router.get('/project', selectProject);
router.post('/project', insertProject);
router.put('/project', updateProject);
router.delete('/project', deleteProject);

router.get('/persontasks', selectPersonTasks);
router.get('/persontask', selectPersonTask);
router.post('/persontask', insertPersonTask);
router.put('/persontask', updatePersonTask);
router.delete('/persontask', deletePersonTask);




export default router;