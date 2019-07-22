import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from "jquery";

let items = GetItems();

function GetRandomDate() {

    let from = new Date(2019, 0, 1, 0,0).getTime();
    let to = new Date(2019,11,30,23,59).getTime();
    return new Date(from + Math.random() * (to - from));

}

function GetItems() {

    let result = [];

    $.ajax({
        url: "https://avito.dump.academy/products",
        type: "get",
        data: "",
        async: false,
        success: function (data) {

            result = data.data;

            for (let i = 0;i<result.length; ++i){
                result[i].date = GetRandomDate();
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
        }
    });

    return result;
}

function FilterItems(){

    let sort = document.getElementById("sort_selector").value;

    var filters = Array.from(document.querySelectorAll("input.checkbox:checked")).map(check => check.value);

    let filterItems = [];

    if (filters !== null) {
        items.forEach(item => {

            if (!filters.indexOf(item.category)) {
                filterItems.push(item);
            }
        });
    }
    else{
        filterItems = items.slice();
    }

    console.log(filterItems);


    ReactDOM.render(<App items = {filterItems} filter = {FilterItems}/>, document.getElementById('root'));
}


ReactDOM.render(<App items = {items} filter = {FilterItems}/>, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
