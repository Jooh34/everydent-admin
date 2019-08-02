export default function(code, product_list, manufacturer_list) {
  let manufacturer_id, manufacturer_code;
  let product_id, product_name, product_code;

  if (code.length === 13) { // 오스템
    manufacturer_code = code.substring(3, 7);
    product_code = code.substring(7, 12);
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
    }
  }

  return {
    manufacturer_id: manufacturer_id,
    product_id: product_id,
    product_name: product_name,
    product_code: product_code,
  }
}
