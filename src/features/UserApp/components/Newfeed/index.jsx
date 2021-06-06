import React, { useEffect, useState } from "react";
import Card from "features/UserApp/components/Card";
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import merchantApi from "api/merchantApi";
import { computeDistant } from "func";
import area from "assets/data/districtName";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",

    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Newfeed({ keyFind, refreshNewFeed }) {
  const [merchant, setMerchant] = useState([]);
  const [merchantFiltered, setMerchantFiltered] = useState([]);
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [page, setPage] = useState(1);
  const [checkDistrict, setCheckDistrict] = useState([]);
  const [checkTypeFood, setCheckTypeFood] = useState([]);
  const user = useSelector((state) => state.loginUserApp.profile);
  const numPerPage = 20;
  let pageCount = Math.ceil(merchantFiltered.length / numPerPage);
  if (pageCount == 0) pageCount = 1;
  if (page > pageCount) setPage(pageCount);
  function removeAccents(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeOpenDrop1 = () => {
    setOpenDrop1(!openDrop1);
    if (openDrop2) setOpenDrop2(!openDrop2);
  };

  const handleChangeOpenDrop2 = () => {
    setOpenDrop2(!openDrop2);
    if (openDrop1) setOpenDrop1(!openDrop1);
  };

  const handleSetCheckBox = (e, value, setValue) => {
    if (e.target.checked) {
      value.push(e.target.value);
      setValue([...value]);
    } else {
      const idx = value.findIndex((item) => item == e.target.value);
      if (idx > -1) {
        value.splice(idx, 1);
        setValue([...value]);
      }
    }
  };

  useEffect(() => {
    const fetchMerchantsList = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        let res = await merchantApi.getAll();
        var userLat, userLng;
        if (localStorage.getItem("lat") && localStorage.getItem("lng")) {
          userLat = localStorage.getItem("lat");
          userLng = localStorage.getItem("lng");
        } else {
          userLat = user.info.location.lat;
          userLng = user.info.location.lng;
        }
        res = res.map((merchant) => ({
          ...merchant,
          distance: computeDistant(
            userLat,
            userLng,
            merchant.location.lat,
            merchant.location.lng
          ),
        }));
        res = res
          .filter((mer) => mer.status != "suspend")
          .sort(
            (pre, next) =>
              ("" + next.status).localeCompare(pre.status) ||
              pre.distance - next.distance
          );
        setMerchant(res);
        setMerchantFiltered(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchMerchantsList();
  }, [refreshNewFeed]);

  useEffect(() => {
    let filteredMerchant = merchant.filter((mc) => {
      let arrFoods = mc.category.map((cat) =>
        cat.foods.map((food) => food.name)
      );
      arrFoods = [].concat.apply([], arrFoods);
      let rs = false;
      for (let food of arrFoods) {
        if (
          removeAccents(food)
            .toLowerCase()
            .match(removeAccents(keyFind).toLowerCase())
        )
          rs = true;
      }
      return (
        (removeAccents(mc.name)
          .toLowerCase()
          .match(removeAccents(keyFind).toLowerCase()) ||
          rs) &&
        (checkDistrict.length > 0
          ? checkDistrict.includes(String(mc.location.district))
          : true) &&
        (checkTypeFood > 0 ? checkTypeFood.includes(String(mc.typeFood)) : true)
      );
    });
    filteredMerchant = filteredMerchant.sort(
      (pre, next) =>
        ("" + next.status).localeCompare(pre.status) ||
        pre.distance - next.distance
    );
    setMerchantFiltered(filteredMerchant);
  }, [keyFind, checkDistrict, refreshNewFeed]);

  const classes = useStyles();

  return (
    <div className="newfeed-wrap">
      <section className="grid wide">
        <div className="filter">
          <div className="filter-cat">
            <div
              className={
                openDrop1
                  ? "filter-cat--item filter-cat--item--open"
                  : "filter-cat--item"
              }
            >
              <div
                className="filter-cat--item-label"
                onClick={(e) => {
                  handleChangeOpenDrop1(e);
                }}
              >
                Khu vực
              </div>
              <div
                className={
                  openDrop1
                    ? "filter-dropdown filter-dropdown--open"
                    : "filter-dropdown filter-dropdown--close"
                }
              >
                {area.map((district, idx) => (
                  <div className="filter-dropdown__item" key={idx}>
                    <input
                      type="checkbox"
                      value={district.key}
                      className="filter-dropdown__input"
                      onChange={(e) =>
                        handleSetCheckBox(e, checkDistrict, setCheckDistrict)
                      }
                    />
                    <label>{district.value}</label>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={
                openDrop2
                  ? "filter-cat--item filter-cat--item--open"
                  : "filter-cat--item"
              }
            >
              <div
                className="filter-cat--item-label"
                onClick={(e) => {
                  handleChangeOpenDrop2(e);
                }}
              >
                Phân loại
              </div>
              <div
                className={
                  openDrop2
                    ? "filter-dropdown filter-dropdown--open align-left"
                    : "filter-dropdown filter-dropdown--close align-left"
                }
              >
                <div className="filter-dropdown__item">
                  <input
                    type="checkbox"
                    value={0}
                    onChange={(e) =>
                      handleSetCheckBox(e, checkTypeFood, setCheckTypeFood)
                    }
                    className="filter-dropdown__input"
                  />
                  <label>Đồ ăn</label>
                </div>
                <div className="filter-dropdown__item">
                  <input
                    type="checkbox"
                    value={1}
                    onChange={(e) =>
                      handleSetCheckBox(e, checkTypeFood, setCheckTypeFood)
                    }
                    className="filter-dropdown__input"
                  />
                  <label>Đồ uống</label>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-sort">
            {merchantFiltered.length} kết quả
            <select className="filter-sort--item">
              <option value="">Gần tôi</option>
              <option value="">Đánh giá</option>
              <option value="">Bán chạy</option>
            </select>
          </div>
        </div>

        <div className="content">
          <div className="list-view row sm-gutter">
            {merchantFiltered
              .slice((page - 1) * numPerPage, page * numPerPage)
              .map((mer, index) => (
                <Card merchant={mer} key={index} index={index} />
              ))}
          </div>
          <div className={classes.root}>
            <Pagination
              count={pageCount}
              color="secondary"
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
