exports.nextDay = (dateString)=>{
    let day = new Date(dateString);
    const nDay = day.setDate(day.getDate()+1);
    return nDay;
}
