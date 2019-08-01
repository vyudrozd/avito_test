import React from 'react'

function Item(props) {

    let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    return (
        <div className="item_holder">
            <div className="prevent_moving_h2">
                <div className="image_holder">
                    <img src={props.item.pictures[0]}/>
                    <div className="photos">
                        <span>{"+ " + (props.item.pictures.length - 1)}</span>
                    </div>
                    <div className="star" onClick={() => {
                        props.btn(props.item);
                    }}>
                        <i className={"material-icons chosen" + (props.favorites === null ? "" : props.favorites.indexOf(props.item.id) === -1 ? "" : " yellow")}>star_rate</i>
                    </div>
                </div>
            </div>
            <div className="prevent_relative">
                <h2>{props.item.title.toUpperCase()}</h2>
                <span className="price">{getCorrectPrice(props.item.price)}</span>
                <span
                    className="date">{props.item.date.getDate() + " " + months[props.item.date.getMonth()] + " " + props.item.date.getHours() + ":" + (String(props.item.date.getMinutes()).length === 1 ? "0" + props.item.date.getMinutes() : props.item.date.getMinutes())}</span>
                <span>{(props.seller.isCompany ? "Компания " : "") + props.seller.name}</span>
                <span
                    className={props.seller.rating > 3.5 ? "green" : "red"}>{"Рейтинг продавца: " + props.seller.rating + "/5"}</span>
            </div>
        </div>
    )
}

function getCorrectPrice(price) {

    if (price === undefined)
        return "Цена договорная";

    let result = "";

    parseInt(price);

    while (price !== 0) {
        let _temp = price % 1000;
        price = parseInt(price / 1000);
        if (price !== 0) {
            while (String(_temp).length < 3) {
                _temp = "0" + _temp;
            }
        }
        result = (_temp + " " + result);
    }

    return (result + " ₽");
}

export default Item;