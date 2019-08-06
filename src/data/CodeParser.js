export default function(code, product_list, manufacturer_list) {
  let manufacturer_id, manufacturer_code;
  let product_id, product_name, product_code;
  let expiry_start, expiry_end;

  if (code.substring(0,6) === '010880') { // QR코드
    manufacturer_code = code.substring(6,11);
    product_code = code.substring(11,18);
  }

  if (code.length === 13) { // 오스템
    manufacturer_code = code.substring(3, 7);
    product_code = code.substring(7, 12);
  }

  if (code.length === 19) { // 원큐
    manufacturer_code = code.substring(0,4);
    product_code = code.substring(4, 19);
  }

  for (let i=0; i<manufacturer_list.length; i++) {
    if (manufacturer_list[i].code === manufacturer_code) {
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
    manufacturer_code: manufacturer_code,
    product_id: product_id,
    product_name: product_name,
    product_code: product_code,
  }
}
