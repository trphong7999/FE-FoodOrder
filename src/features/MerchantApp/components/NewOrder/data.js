let validatePrice = function (price) {
  return price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

const newListOrders = [
  {
    id: 1,
    customer: { name: "Tran Phong", quantityOrdered: "0" },
    time: { limit: "20", startOrder: "16:55" },
    space: "0.4",
    note: "Lấy dụng cụ ăn uống, bỏ đá riêng giúp mình Lấy dụng cụ ăn uống",
    listFood: [
      { quantiy: "1", name: "Bún bò", total: "50000" },
      { quantiy: "1", name: "Trà đào cam sả", total: "49000" },
      { quantiy: "1", name: "Trà sen vàng", total: "30000" },
    ],
  },
  {
    id: 2,
    customer: { name: "Hieu L", quantityOrdered: "0" },
    time: { limit: "25", start: "17:40" },
    space: "1",
    note: "Lấy dụng cụ ăn uống",
    listFood: [
      { quantiy: "1", name: "Bún bò", total: "50000" },
      { quantiy: "1", name: "Trà đào cam sả", total: "49000" },
      { quantiy: "3", name: "Trà sen vàng", total: "90000" },
    ],
  },
];

export default newListOrders;
