export const FormatDate = (date:any) => {
    const datejs = new Date(date)
    const year = datejs.getFullYear();
    const month = String(datejs.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datejs.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}