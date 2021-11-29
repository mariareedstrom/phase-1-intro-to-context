// function createEmployeeRecord creates an (1!) employee array
// arry contains: [ 0-firstName, 1-familyName, 2-title, 3-payPerHour]
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// function createEmployeeRecords takes an array of employee arrays,
// maps over them calling createEmployeeRecord on each
function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function parseDateTime(dateStamp) {
  // split datestamp into date and hour, set consts for date and hour
  const arrayFromDateStamp = dateStamp.split(" ");
  const date = arrayFromDateStamp[0];
  const hour = parseInt(arrayFromDateStamp[1]);

  //add an object with keys
  return {
    date,
    hour,
  };
}

// function createTimeInEvent takes an (1!) employee record and date/time strg
// returns updated record
function createTimeInEvent(record, dateStamp) {
  const event = { type: "TimeIn" };
  Object.assign(event, parseDateTime(dateStamp));

  //add to record timeInEvent
  record.timeInEvents.push(event);
  return record;
}

// function createTimeInEvent takes an employee record and a datestamp
// returns updated record
function createTimeOutEvent(record, dateStamp) {
  const event = { type: "TimeOut" };
  Object.assign(event, parseDateTime(dateStamp));

  //add to record timeOutEvent
  record.timeOutEvents.push(event);
  return record;
}

// function hoursWorkedOnDate takes a record anda date
// returns hours worked (integer)
function hoursWorkedOnDate(record, date) {
  const inEvent = record.timeInEvents.find((inEvent) => inEvent.date === date);
  const outEvent = record.timeOutEvents.find(
    (outEvent) => outEvent.date === date
  );

  return (outEvent.hour - inEvent.hour) / 100;
}

// function wagesEarnedOnDate takes record and date
// returns pay owed
function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

// functio allWagesFor takes a record
// returns pay owed for all dates
function allWagesFor(record) {
  const reducer = (acc, timeInEvent) => {
    //   get date
    const date = timeInEvent.date;
    //   get wages for date
    const wages = wagesEarnedOnDate(record, date);
    //   add to acc
    return acc + wages;
  };
  return record.timeInEvents.reduce(reducer, 0);
}

// function calculatePayRoll takes an array of records
function calculatePayroll(records) {
  const reducer = (acc, record) => {
    //  get all Wages For record
    const wages = allWagesFor(record);
    // add to total
    return acc + wages;
  };
  return records.reduce(reducer, 0);
}
