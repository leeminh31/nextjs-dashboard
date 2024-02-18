export const specialCharactersRegex = (value:string) => {
    const specialCharsRegex = /[!@#$%^&*()\-_=+{};:'",.<>?/\\|\[\]`~]/;
    if (specialCharsRegex.test(value)) {
        return Promise.reject('Vui lòng không nhập ký tự đặc biệt.');
    } else {
        return Promise.resolve();
    }
}