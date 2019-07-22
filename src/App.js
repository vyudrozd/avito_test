import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import Item from './components/Item'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {items: this.props.items};

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


    componentWillMount() {
        const {data} = this.props;
        this.setState({data})
    }

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        this.setState({data})
    }

    render() {

        let sellers = this.getSellers();
        return (
            <div className="App">
                <div className="filter_container">
                    <div className="sort_area">
                        <span>Сортировать</span>
                        <select id="sort_selector">
                            <option value="popularity">По популярности</option>
                            <option value="price">По цене</option>
                            <option value="date">По дате размещения</option>
                        </select>
                        <div className="checkboxes">
                            <span>Фильтровать</span>
                            <input className="checkbox" type="checkbox" id="immovable" name="immovable" value="immovable"/>
                            <label htmlFor="immovable">Недвижимость</label>
                            <input className="checkbox" type="checkbox" id="cameras" name="cameras" value="cameras"/>
                            <label htmlFor="cameras">Камеры</label>
                            <input className="checkbox" type="checkbox" id="auto" name="auto" value="auto"/>
                            <label htmlFor="auto">Автомобили</label>
                            <input className="checkbox" type="checkbox" id="laptops" name="laptops" value="laptops"/>
                            <label htmlFor="laptops">Ноутбуки</label>
                            <input className="checkbox" type="checkbox" id="chosen" name="chosen" value="chosen"/>
                            <label htmlFor="chosen">Избранное</label>
                        </div>
                        <div>
                            <button onClick={this.props.filter}>Найти</button>
                        </div>
                    </div>
                </div>
                <div className="items_wrap">
                    <div className="items_container">
                        {
                            this.state.items.map(function (item) {
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
