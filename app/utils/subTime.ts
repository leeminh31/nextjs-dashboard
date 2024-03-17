export const subTime = (time1:string | undefined, time2:string | undefined) => {
        if( time1 && time2) {
            // Chuyển đổi thời gian thành giây
        var time1Array = time1.split(":");
        var time2Array = time2.split(":");
        
        var seconds1 = parseInt(time1Array[0]) * 3600 + parseInt(time1Array[1]) * 60 + parseInt(time1Array[2]);
        var seconds2 = parseInt(time2Array[0]) * 3600 + parseInt(time2Array[1]) * 60 + parseInt(time2Array[2]);
        
        // Tính hiệu của hai thời điểm
        var differenceSeconds = Math.abs(seconds1 - seconds2);
        
        // Chuyển đổi giây thành phút
        var differenceMinutes = Math.floor(differenceSeconds / 60);
        
        return differenceMinutes;
        }
}