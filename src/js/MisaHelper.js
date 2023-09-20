const MisaHelper = {
  /*
    Date format funciton
    @param{date}
    CreatedBy:dvphu 24/8/2023
    Modify:null
    */
  formatDate(date) {
    try {
      date = new Date(date);
      let dateValue = date.getDate();
      let monthValue = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${dateValue}${monthValue}/${year}`;
    } catch (error) {
      console.error(error);
      return "error";
    }
  },
  /*
    format Number With Dots funciton
    @param{number}
    CreatedBy:dvphu 25/8/2023
    Modify:null
    */
  formatNumberWithDots(number) {
    const numberString = String(number);
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  /*
    check leng input value
    @param{inputValue}
    CreatedBy:dvphu 31/8/2023
    Modify:null
    */
  validationLengthInput(inputValue, min_length, max_length) {
    if (inputValue.length < min_length) return false;
    else if (inputValue.length > max_length) return false;
    else return true;
  },
  /*
    to fixed value
    @param{number}
    CreatedBy:dvphu 31/8/2023
    Modify:null
    */
  toFixed(number) {
    let arr = String(number).split(".");
    let s;
    if(arr.length>1){
      if (arr[1].length > 3) {
        s = arr[0] + "." + arr[1].substring(0, 3);
      } else s = arr[0] + "." + arr[1];
    }else s=arr[0]
    
    let kq = Number(s);
    return kq;
  },
};
export default MisaHelper;
