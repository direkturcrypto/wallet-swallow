function formatCurrency(number){
  return 'Rp. '+new Intl.NumberFormat('id-ID').format(number)
}

function fnumber(number, format, options){
  return new Intl.NumberFormat(format, {...options}).format(number)
}

function getDateFormat(date){
  var mydate = new Date(date);
  var dd = mydate.getDate();
  var mm = mydate.getMonth() + 1; //January is 0!

  var yyyy = mydate.getFullYear();
  if (dd < 10) {
  dd = '0' + dd;
  } 
  if (mm < 10) {
  mm = '0' + mm;
  } 
  mydate = yyyy + mm + dd;
  return mydate;
}

function getToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
  dd = '0' + dd;
  } 
  if (mm < 10) {
  mm = '0' + mm;
  } 
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

function getLastDateOfMonth(year,month){
  if(year%4===0 && month===2){
    return 29
  }
  else if( year%4!==0 && month===2){
    return 28
  }
  else if(month===1 || month===3 || month===5 || month===7 || month===8 || month===10 || month===12){
    return 31
  }
  else{
    return 30
  }
}

export {formatCurrency,fnumber,getDateFormat,getToday,getLastDateOfMonth}