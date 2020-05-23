export default function(code, product_list, manufacturer_list) {
  let manufacturer_id, manufacturer_code, manufacturer_name;
  let product_id, product_name, product_code;
  let expiry_start, expiry_end;

  code = code.replace("(", "");
  code = code.replace(")", "");

  if (code.substring(0, 2) === '01') { // QR코드
    manufacturer_code = code.substring(2,10);
    if (manufacturer_code === '08800053') { // another dentis.....
      manufacturer_code = '08806169'
    }
    product_code = code.substring(10,16);

    var cur = 16;
    while(cur < code.length) {
      var contour = code.substring(cur, cur+2);
      cur = cur+2;

      switch (contour) {
        case '01':
          cur = cur - 1;
          break;

        case '10':
          if (manufacturer_code === '07630031') {//스트라우만
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
  if (code.substring(0, 3) === '111') { // 디오 옛날 꺼
    manufacturer_code = 'DIO-OLD'
    product_code = code.substring(7, 15)
  }
  if (code.length === 9) { // 제노스
    manufacturer_code = code.substring(0, 2);
    product_code = code.substring(2, 9);
  }
  if (code.length === 13) { // 오스템 1D
    manufacturer_code = 'OSSTEM';
    product_code = code.substring(0, 9);
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
