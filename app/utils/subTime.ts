export const subTime = (
  time1: string | undefined,
  time2: string | undefined,
) => {
  if (time1 && time2) {
    // Chuyển đổi thời gian thành giây
    const time1Array = time1.split(":");
    const time2Array = time2.split(":");

    const seconds1 =
      parseInt(time1Array[0]) * 3600 +
      parseInt(time1Array[1]) * 60 +
      parseInt(time1Array[2]);
    const seconds2 =
      parseInt(time2Array[0]) * 3600 +
      parseInt(time2Array[1]) * 60 +
      parseInt(time2Array[2]);

    // Tính hiệu của hai thời điểm
    const differenceSeconds = Math.abs(seconds1 - seconds2);

    // Chuyển đổi giây thành phút
    const differenceMinutes = Math.floor(differenceSeconds / 60);

    return differenceMinutes;
  }
  return 0;
};
