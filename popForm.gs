function popFormRandom() {
    var ui = SpreadsheetApp.getUi();
  var folderResult = ui.prompt(
      `Please enter Folder ID:`,
      '',
      ui.ButtonSet.OK_CANCEL);
  var folderId = folderResult.getResponseText();
  const folder = DriveApp.getFolderById(folderId);
  var result = ui.prompt(
      `Please enter sheet name:`,
      '',
      ui.ButtonSet.OK_CANCEL);
  var sheetName = result.getResponseText();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  var numberRows = sheet.getDataRange().getNumRows();
  var myQuestions = sheet.getRange(1,1,numberRows,1).getValues();
  var myAnswers = sheet.getRange(1,2,numberRows,1).getValues();
  var myGuesses = sheet.getRange(1,2,numberRows,4).getValues();
  var myShuffled = myGuesses.map(shuffleEachRow);
  var quizName = sheet.getName();
  var form = FormApp.create(quizName);
  form.setIsQuiz(true);
  form.setShuffleQuestions(true);
  for(var i=0;i<numberRows;i++){
    if (myShuffled[i][0] == myAnswers[i][0]) {
      var addItem = form.addMultipleChoiceItem();
      addItem.setTitle(myQuestions[i][0])
      .setPoints(1)
      .setChoices([
        addItem.createChoice(myShuffled[i][0],true),
        addItem.createChoice(myShuffled[i][1]),
        addItem.createChoice(myShuffled[i][2]),
        addItem.createChoice(myShuffled[i][3])
      ]);
    }

    else if (myShuffled[i][1] == myAnswers[i][0]) {
      var addItem = form.addMultipleChoiceItem();
      addItem.setTitle(myQuestions[i][0])
      .setPoints(1)
      .setChoices([
        addItem.createChoice(myShuffled[i][0]),
        addItem.createChoice(myShuffled[i][1],true),
        addItem.createChoice(myShuffled[i][2]),
        addItem.createChoice(myShuffled[i][3]),
      ]);
    }

    else if (myShuffled[i][2] == myAnswers[i][0]) {
      var addItem = form.addMultipleChoiceItem();
      addItem.setTitle(myQuestions[i][0])
      .setPoints(1)
      .setChoices([
        addItem.createChoice(myShuffled[i][0]),
        addItem.createChoice(myShuffled[i][1]),
        addItem.createChoice(myShuffled[i][2],true),
        addItem.createChoice(myShuffled[i][3]),
      ]);
    }

    else {
      var addItem = form.addMultipleChoiceItem();
      addItem.setTitle(myQuestions[i][0])
      .setPoints(1)
      .setChoices([
        addItem.createChoice(myShuffled[i][0]),
        addItem.createChoice(myShuffled[i][1]),
        addItem.createChoice(myShuffled[i][2]),
        addItem.createChoice(myShuffled[i][3],true),
      ]);
    }
  }
  const formId = form.getId();
  DriveApp.getFileById(formId).moveTo(folder);
}

function shuffleEachRow(array) {
  var i, j, temp;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
