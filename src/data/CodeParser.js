export default function(code, product_list, manufacturer_list) {
  let manufacturer_id, manufacturer_code, manufacturer_name;
  let product_id, product_name, product_code;
  let expiry_start, expiry_end;

  if (code.substring(0, 2) === '01') { // QR코드
    manufacturer_code = code.substring(2,10);
    product_code = code.substring(10,16);
    var cur = 16;
    while(cur < code.length) {
      var contour = code.substring(cur, cur+2);
      cur = cur+2;

      switch (contour) {
        case '10':
          if (manufacturer_code === '07630031') {//티타늄
            cur = cur + 5;
          }
          else { // 메가젠
            cur = cur + 14;
          }
          break;

        case '11':
          expiry_start = code.substring(cur, cur+6);
          expiry_start = `20${expiry_start.substring(0,2)}-${expiry_start.substring(2,4)}-${expiry_start.substring(4,6)}`;
          cur = cur + 6;
          break;

        case '17':
          expiry_end = code.substring(cur, cur+6);
          expiry_end = `20${expiry_end.substring(0,2)}-${expiry_end.substring(2,4)}-${expiry_end.substring(4,6)}`;
          cur = cur + 6;
          break;

        default:
          cur = 100;
          break;
      }
    }
  }
  if (code.length === 13) { // 오스템 1D
    manufacturer_code = code.substring(3, 7);
    product_code = code.substring(7, 12);
  }

  if (code.length === 19) { // 원큐 1D
    manufacturer_code = code.substring(0,4);
    product_code = code.substring(4, 19);
  }

  for (let i=0; i<manufacturer_list.length; i++) {
    if (manufacturer_list[i].code === manufacturer_code) {
      manufacturer_name = manufacturer_list[i].name;
      manufacturer_id = manufacturer_list[i].id;
      break;
    }
  }

  for (let i=0; i<product_list.length; i++) {
    if (product_list[i].code === product_code) {
      product_id = product_list[i].id;
      product_name = product_list[i].name;
      break;
    }
  }

  return {
    manufacturer_id: manufacturer_id,
    manufacturer_name: manufacturer_name,
    manufacturer_code: manufacturer_code,
    product_id: product_id,
    product_name: product_name,
    product_code: product_code,
    expiry_start: expiry_start,
    expiry_end: expiry_end,
  }
}
