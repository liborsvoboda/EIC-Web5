//JAVASCRIPT VARIABLE DECLARATIONS 
let selection = ""; //Selected View in JAVASCRIPT
let personTasksReloadRequest = false;
const tableHeaders = [
	[
		{ "type": "data", "title": "Id", "name": "Id", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Názov", "name": "Názov", "sortable": true, "format": "string", "show": true, }
	],
	[
		{ "type": "data", "title": "Id", "name": "Id", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Meno", "name": "Meno", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Priezvisko", "name": "Priezvisko", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Pozícia", "name": "Pozícia", "sortable": true, "format": "string", "show": true, }
	],
	[
		{ "type": "data", "title": "Id", "name": "Id", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Názov", "name": "Názov", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Popis", "name": "Popis", "sortable": true, "format": "string", "show": true, }
	],
	[
		{ "type": "data", "title": "Id", "name": "Id", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Názov", "name": "Názov", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "DeadLine", "name": "DeadLine", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Status", "name": "Status", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Projekt", "name": "Projekt", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Priorita", "name": "Priorita", "sortable": true, "format": "string", "show": true, },
		{ "type": "data", "title": "Súbor", "name": "Súbor", "sortable": true, "format": "string", "show": true, }
	]
];

//DATABASE DATA SETS
let statuses = [];
let positions = [];
let persons = [];
let projects = [];
let tasks = [];
let persontasks = [];

//UPLOADED ONE FILE FOR MANIPULATE
let uploadedFileName = "";
let uploadedFileContent = "";





// Javascript Functions FOR using BY static METRO Framework 


//SET FORMS FIELDS BY SELECTED RECORD
function EditRecord() {
	var table = Metro.getPlugin("#DataTable", "table");

	switch (selection) {
		case "statuses":
			//Get Selected record From Table
			let selectedStatus = statuses.filter(menu => { return menu.Id == table.getSelectedItems()[0][0]; })[0];

			//Set Form Inputs FROM selected TABLE RECORD
			$("#FormId").val(selectedStatus.Id);
			$("#FormName").val(selectedStatus.Name);

			break;
		case "positions":
			let selectedPosition = positions.filter(menu => { return menu.Id == table.getSelectedItems()[0][0]; })[0];

			//Set Form Inputs FROM selected TABLE RECORD
			$("#FormId").val(selectedPosition.Id);
			$("#FormName").val(selectedPosition.Name);

			break;
		case "persons":
			//Get Selected record From Table
			let selectedPerson = persons.filter(menu => { return menu.Id == table.getSelectedItems()[0][0]; })[0];

			//Set Form Inputs FROM selected TABLE RECORD
			$("#FormId").val(selectedPerson.Id);
			$("#FormFirstName").val(selectedPerson.FirstName);
			$("#FormLastName").val(selectedPerson.LastName);

			//SET SELECTED RECORD OPTION
			try { document.getElementById('FormPosition').options.item(positions.findIndex(obj => { return obj.Id == selectedPerson.PositionId })).selected = true; } catch { }

			break;
		case "projects":
			//Get Selected record From Table
			let selectedProject = projects.filter(menu => { return menu.Id == table.getSelectedItems()[0][0]; })[0];

			//Set Form Inputs FROM selected TABLE RECORD
			$("#FormId").val(selectedProject.Id);
			$("#FormName").val(selectedProject.Name);
			document.getElementById('FormDesc').value = selectedProject.Desc;

			break;
		case "tasks":
			//Get Selected record From Table
			let selectedTask = tasks.filter(menu => { return menu.Id == table.getSelectedItems()[0][0]; })[0];

			//Set Form Inputs FROM selected TABLE RECORD
			$("#FormId").val(selectedTask.Id);
			$("#FormName").val(selectedTask.Name);
			$("#FormEndDate").val(selectedTask.EndDate);
			$("#FormPriority").val(selectedTask.Priority);

			//SET SELECTED RECORD OPTION
			try { document.getElementById('FormStatus').options.item(statuses.findIndex(obj => { return obj.Id == selectedTask.StatusId })).selected = true; } catch { }
			try { document.getElementById('FormProject').options.item(projects.findIndex(obj => { return obj.Id == selectedTask.ProjectId })).selected = true; } catch { }

			//Set File Area + Download Existing
			uploadedFileContent = selectedTask.File; uploadedFileName = selectedTask.FileName;
			if (uploadedFileName != null && uploadedFileName.length > 0) {
				$("#ButtonDownloadFile").show(); $("#ButtonRemoveFile").show();
			} else { $("#ButtonDownloadFile").hide(); $("#ButtonRemoveFile").hide(); }

			//Show PersonTask Area
			$("#FormPersonTask").show();
			GeneratePersonAccordion();$("#FormPersonsAccordion").show();
			
			break;
		default:
		// code block
	}

}

//DELETE PERSON from TASK
function DeletePersonTask(recId) {
	showPageLoading();
	$.ajax({
		url: app.apiUrl + "/persontask", dataType: 'json',
		type: "DELETE", headers: { 'Content-type': 'application/json' },
		data: JSON.stringify({ id: recId })
	}).done(function (data) {
		setTimeout(() => { app.GetData("persontasks", null); }, 500);
	});
}

//GENERATE PERSONS TASK ACCORDIONS
function GeneratePersonAccordion() {
	let html = '<div data-role="accordion" data-one-frame="true" data-show-active="true">';
	persontasks.forEach(item => {
		if (item.TaskId == $("#FormId").val()) {
			html += '<div class="frame"><div class="heading"><div class="d-inline-flex w-25"><span class="mif-cancel mif-2x fg-red mr-2 c-pointer" onclick=DeletePersonTask(' + item.Id + '); title="Odobrať Osobu"></span></div><div class="d-inline-flex text-bold w-25" style="font-size:20px;" >'
				+ persons.filter(obj => { return obj.Id == item.PersonId })[0].FirstName
				+ ' '
				+ persons.filter(obj => { return obj.Id == item.PersonId })[0].LastName
				+ '</div></div><div class="content"><div class="p-2">Pozícia: ';
			html += positions.filter(obj1 => { return obj1.Id == persons.filter(obj => { return obj.Id == item.PersonId })[0].PositionId })[0].Name
				+ '</div></div></div>';
		}
	});
	html += "</div>";
	$("#FormPersonsAccordion").html(html);
	hidePageLoading();
}

//UPLOAD File to MEMORY After Selected
async function UploadFile(files) {
	if (files.length > 0) {
		$("#ButtonDownloadFile").show(); $("#ButtonRemoveFile").show();

		const reader = new FileReader();
		uploadedFileContent = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(files[0]);
		});
		uploadedFileName = files[0].name;
	} else { ClearFile(); }

	/*
	HELP Available FILE Processing Types

	uploadedFileContent = await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(files[0]);
	});

	file = input.files[0];
	fr = new FileReader();
	fr.onload = receivedText;
	fr.readAsText(file);

	fr = new FileReader();
	fr.onload = receivedBinary;
	fr.readAsBinaryString(file);
	*/
}

//DOWNLOAD Uploaded/Task Selected FILE
function DownloadFile() {
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = uploadedFileContent;
	a.download = uploadedFileName;
	document.body.appendChild(a);
	a.click();
}

// Clear UPLOADED or SELECTED File
function ClearFile() {
	try { Metro.getPlugin("#FormFile", 'file').clear(); } catch { }
	uploadedFileName = uploadedFileContent = "";
	$("#ButtonDownloadFile").hide();
	$("#ButtonRemoveFile").hide();
}


