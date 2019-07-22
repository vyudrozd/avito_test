import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import Item from './components/Item'
import ReactDOM from "react-dom";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {items: this.GetItems()};

        this.state.filterItems = this.state.items.slice();

        this.filterItems = () => {

            this.setState((prev => {

                let sort = document.getElementById("sort_selector").value;

                var filters = Array.from(document.querySelectorAll("input.checkbox:checked")).map(check => check.value);

                let from = document.getElementById("price_from").value;
                let to = document.getElementById("price_to").value;

                from = Number(from);
                to = Number(to);

                if (Math.abs(from) > Math.abs(to)) {
                    document.getElementById("price_from").value = Math.abs(to);
                    document.getElementById("price_to").value = Math.abs(from);
                    from = document.getElementById("price_from").value;
                    to = document.getElementById("price_to").value;
                }

                if (from < 0) {
                    document.getElementById("price_from").value = Math.abs(from);
                    from = Math.abs(from);
                }
                if (to < 0) {
                    document.getElementById("price_to").value = Math.abs(to);
                    to = Math.abs(to);
                }

                if (isNaN(from)){
                    document.getElementById("price_from").value = 0;
                    from = 0;
                }

                if ((isNaN(to))||(to === 0)){
                    document.getElementById("price_to").value = Infinity;
                    to = Infinity;
                }

                let filterItems = [];

                if (filters.length !== 0) {
                    prev.items.forEach(item => {

                        if ((filters.indexOf(item.category) !== -1) && ((item.price >= from)&&(item.price <= to))) {
                            filterItems.push(item);
                        }
                    });
                } else {
                    filterItems = this.state.items.slice();
                }

                switch (sort) {
                    case("price"):
                        filterItems.sort(function (i1, i2) {
                            return i1.price - i2.price;
                        });
                        break;
                    case("date"):
                        filterItems.sort(function (i1, i2) {
                            return i1.date.getTime() - i2.date.getTime();
                        });
                }

                return {
                    items: prev.items,
                    filterItems: filterItems
                };

            }))

        }

    }


    getSellers() {

        let result = null;

        $.ajax({
            url: "http://avito.dump.academy/sellers",
            type: "get",
            data: "",
            async: false,
            success: function (data) {
                result = data.data;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                result = null;
            }
        });

        return result;
    }


    GetRandomDate() {

        let from = new Date(2019, 0, 1, 0, 0).getTime();
        let to = new Date(2019, 11, 30, 23, 59).getTime();
        return new Date(from + Math.random() * (to - from));

    }

    GetItems() {

        let result = [];
        let func = this.GetRandomDate;

        $.ajax({
            url: "https://avito.dump.academy/products",
            type: "get",
            data: "",
            async: false,
            success: function (data) {

                result = data.data;

                for (let i = 0; i < result.length; ++i) {
                    result[i].date = func();
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
            }
        });

        return result;
    }

    render() {

        let sellers = this.getSellers();
        return (
            <div className="App">
                <div className="filter_container">
                    <div className="sort_area">
                        <span>Фильтровать</span>
                        <input className="checkbox" type="checkbox" id="immovable" name="immovable"
                               value="immovable"/>
                        <label htmlFor="immovable">Недвижимость</label>
                        <input className="checkbox" type="checkbox" id="cameras" name="cameras" value="cameras"/>
                        <label htmlFor="cameras">Камеры</label>
                        <input className="checkbox" type="checkbox" id="auto" name="auto" value="auto"/>
                        <label htmlFor="auto">Автомобили</label>
                        <input className="checkbox" type="checkbox" id="laptops" name="laptops" value="laptops"/>
                        <label htmlFor="laptops">Ноутбуки</label>
                        <input className="checkbox" type="checkbox" id="chosen" name="chosen" value="chosen"/>
                        <label htmlFor="chosen">Избранное</label>
                        <div>
                            <span>Сортировать</span>
                            <select id="sort_selector">
                                <option value="popularity">По популярности</option>
                                <option value="price">По цене</option>
                                <option value="date">По дате размещения</option>
                            </select>
                            <span>Цена:</span>
                            <input type="text" placeholder="от" id="price_from"/>
                            <input type="text" placeholder="до" id="price_to"/>
                            <button onClick={this.filterItems}>Найти</button>
                        </div>
                    </div>
                </div>
                <div className="items_wrap">
                    <div className="items_container">
                        {
                            this.state.filterItems.map(function (item) {
                                return (
                                    <Item item={item} seller={sellers[item.relationships.seller]}/>
                                )
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
