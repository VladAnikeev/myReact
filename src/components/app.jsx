import React from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Order from "./order";
import MenuAdmin from "./menu-admin";
import sampleBurgers from "../sample-burgers";
import Burger from "./burger";
import base from "./base";
import SignIn from "./auth/SignIn";
import firebase from "firebase/app";

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object,
    };
    state = {
        burgers: {},
        order: {}
    };

    componentDidMount() {
        //url страницы
        const { restaurantId } = this.props.match;
        //получаем из базы данных бургеры
        this.ref = base.syncState(`${restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
        //получаем из локальной базы данных заказы
        const localStorageRef = localStorage.getItem(restaurantId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        };
    };
    //при обновлении страницы, получаем из локальной базы данных заказы
    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId,
            JSON.stringify(this.state.order));
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addBurger = burger => {
        //делаем копию state
        const burgers = { ...this.state.burgers };
        // добавить в массив burger
        burgers[`burger${Date.now()}`] = burger;
        //записать новый обект в state
        this.setState({ burgers: burgers });
    };

    updateBurger = (key, updatedBurger) => {
        //делаем копию state
        const burgers = { ...this.state.burgers };
        //Обновляем бургер
        burgers[key] = updatedBurger;
        //записать новый обект в state
        this.setState({ burgers: burgers });
    }
    deleteBurger = key => {
        const burgers = { ...this.state.burgers };
        burgers[key] = null;
        this.setState({ burgers: burgers });
    }
    loadSampleBurger = () => {
        //делаем копию state
        this.setState({ burgers: sampleBurgers });
    }
    addToOrder = (key) => {
        //делаем копию state
        const order = { ...this.state.order };
        // добавить ключ или обновить текущий
        order[key] = order[key] + 1 || 1
        //записать новый обект в state
        this.setState({ order: order });
    }
    //удаляем заказ
    deleteFromOrder = (key) => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order: order });
    }
    // перезагрузка страницы
    handleLogout = async authData => {
        await firebase.auth().SignIn();
        window.location.reload();
    }

    render() {
        return (
            <SignIn>
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title="New Burger" />
                        <ul className="burgers">
                            {
                                Object.keys(this.state.burgers).map(key => {
                                    return <Burger
                                        key={key}
                                        index={key}
                                        addToOrder={this.addToOrder}
                                        detalist={this.state.burgers[key]}
                                    />;
                                })
                            }
                        </ul>
                    </div>
                    <Order
                        deleteFromOrder={this.deleteFromOrder}
                        burgers={this.state.burgers}
                        order={this.state.order}
                    />
                    <MenuAdmin
                        addBurger={this.addBurger}
                        deleteBurger={this.deleteBurger}
                        loadSampleBurger={this.loadSampleBurger}
                        burgers={this.state.burgers}
                        updateBurger={this.updateBurger}
                        handleLogout={this.handleLogout}
                    />
                </div>
            </SignIn>
        )
    }
}

export default App;