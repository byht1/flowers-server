const express = require("express");
const { basedir } = global;

const {
  getAll,
  getById,
  filterAll,
  searchChange,
} = require(`${basedir}/controllers/flower`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.get("/", ctrlWrapper(filterAll));

router.get("/all/", ctrlWrapper(getAll));
router.get("/all/:id", ctrlWrapper(getById));

router.get("/search/:name", ctrlWrapper(searchChange));

module.exports = router;

// 2)  фільтр
// 2.1 категорія - всі  об'єкти відповідної категорієї ["Троянди", "Букети", "Монобукети"];
// 2.2 вид - аналогічно п.2.1
// 2.3 колір - аналогічно п.2.1 ["Червоний", "Жовтий"];
// 2.4 кількість - аналогічно п.2.1 amount;
// 2.5 розмір -аналогічно п.2.1 size
// 2.6 ціна
//    -  price < Х
//    -  Х <= price < У
//    -  У <= price
// 3) сортування (збільшення / зменшення):
//   - рейтинг rating
//   - ціна prise
// 4) фільтр масив id - повертає масив карток з переданими id
// 5) пагінація - page / offset

// при комбінації п.2 - 5 повинні отримувати об'єкт який  має масив карток, які задовільняють всім умовам переданого запиту, довжину масиву/кількість карток, може ще щось на твій розсуд
