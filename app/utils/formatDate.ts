export const FormatDate = (date:any) => {
    const datejs = new Date(date)
    const year = datejs.getFullYear();
    const month = String(datejs.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datejs.getDate()).padStart(2, '0');
    const time = datejs.getTime();
    if(Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
        return null
    return `${year}-${month}-${day}`;
}