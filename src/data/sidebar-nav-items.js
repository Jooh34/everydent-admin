export default function() {
  return [
    {
      title: "메인",
      to: "/overview",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "재고 추가",
      htmlBefore: '<i class="material-icons">add</i>',
      to: "/stock/add",
    },
    {
      title: "재고 사용",
      htmlBefore: '<i class="material-icons">remove</i>',
      to: "/stock/use",
    },
    {
      title: "재고 반품",
      htmlBefore: '<i class="material-icons">cached</i>',
      to: "/stock/return",
    },
    {
      title: "제품 목록",
      htmlBefore: '<i class="material-icons">local_shipping</i>',
      to: "/product",
    },
    {
      title: "제조사 목록",
      htmlBefore: '<i class="material-icons">local_shipping</i>',
      to: "/manufacturer",
    },
    // {
    //   title: "Errors",
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: "/errors",
    // }
  ];
}
