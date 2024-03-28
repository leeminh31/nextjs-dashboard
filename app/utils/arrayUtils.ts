/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMaxValue = (array: Array<any>, key: string) => {
  return array?.reduce(
    (max, obj) => (obj[key] > max ? obj[key] : max),
    array[0][key],
  );
};

// Hàm lấy giá trị nhỏ nhất của thuộc tính trong mảng các đối tượng
export const getMinValue = (array: Array<any>, key: string) => {
  return array?.reduce(
    (min, obj) => (obj[key] < min ? obj[key] : min),
    array[0][key],
  );
};
