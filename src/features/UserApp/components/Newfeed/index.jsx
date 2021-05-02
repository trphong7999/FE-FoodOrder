import React, { useEffect, useState } from "react";
import Card from "features/UserApp/components/Card";
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import merchantApi from "api/merchantApi";
import { computeDistant, getLocationUser } from "func";
import area from "assets/data/districtName";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",

    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Newfeed() {
  const [merchant, setMerchant] = useState([]);
  const [merchantRender, setMerchantRender] = useState([]);
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [page, setPage] = useState(1);

  const numPerPage = 20;
  let pageCount = parseInt(merchant.length / numPerPage);

  const handleChangePage = (event, value) => {
    setMerchantRender(
      merchant.slice((page - 1) * numPerPage, page * numPerPage)
    );
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

  useEffect(() => {
    handleChangePage("a", 1);
  }, [merchant]);

  useEffect(() => {
    const fetchMerchantsList = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        let res = await merchantApi.getAll();
        let userLat = sessionStorage.getItem("lat") || 20.8351;
        let userLng = sessionStorage.getItem("lng") || 106.7071;
        console.log(userLat, userLng);
        res = res.map((merchant) => ({
          ...merchant,
          distance: computeDistant(
            userLat,
            userLng,
            merchant.location.lat,
            merchant.location.lng
          ),
        }));
        res = res.sort((pre, next) => pre.distance - next.distance);
        setMerchant(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchMerchantsList();
  }, []);

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
                    ? "filter-dropdown filter-dropdown--open"
                    : "filter-dropdown filter-dropdown--close"
                }
              >
                <div className="filter-dropdown__item">
                  <input
                    type="checkbox"
                    value={0}
                    className="filter-dropdown__input"
                  />
                  <label>Đồ ăn</label>
                </div>
                <div className="filter-dropdown__item">
                  <input
                    type="checkbox"
                    value={1}
                    className="filter-dropdown__input"
                  />
                  <label>Đồ uống</label>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-sort">
            200 kết quả
            <select className="filter-sort--item">
              <option value="">Gần tôi</option>
              <option value="">Đánh giá</option>
              <option value="">Bán chạy</option>
            </select>
          </div>
        </div>

        <div className="content">
          <div className="list-view row sm-gutter">
            {merchantRender.map((mer, index) => (
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
