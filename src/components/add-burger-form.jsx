import react from "react";
import React from "react";
import PropTypes from "prop-types";


class AddBurgerForm extends React.Component {

    static propTypes = {
        addBurger: PropTypes.func,
    };

    //ссылки для получения 
    NameRef = react.createRef();
    PriceRef = react.createRef();
    StatusRef = react.createRef();
    DescRef = react.createRef();
    ImageRef = react.createRef();

    //создание бургера
    createBurger = event => {
        event.preventDefault();
        //получаем значение
        const burger = {
            name: this.NameRef.current.value,
            price: Number(this.PriceRef.current.value) || 0,
            status: this.StatusRef.current.value,
            desc: this.DescRef.current.value,
            image: this.ImageRef.current.value,
        };
        this.props.addBurger(burger);
        event.currentTarget.reset();
    };


    render() {
        return (
            <form className="burger-edit"
                onSubmit={this.createBurger}>
                <input
                    ref={this.NameRef}
                    name="name" type="text"
                    placeholder="Name"
                    autoCapitalize="off"
                />
                <input
                    ref={this.PriceRef}
                    name="price"
                    type="text"
                    placeholder="Price"
                    autoCapitalize="off"
                />
                <select
                    ref={this.StatusRef}
                    name="status"
                    className="status"
                >
                    <option value="available">
                        Доступно
                    </option>
                    <option value="unavailable">
                        Убрать из меню
                    </option>
                </select>
                <textarea
                    ref={this.DescRef}
                    name="desc"
                    type="text"
                    placeholder="Desc"
                />
                <input
                    ref={this.ImageRef}
                    name="image"
                    type="text"
                    placeholder="Image"
                    autoCapitalize="off"
                />
                <button type="submit">
                    + Добавить в меня
                </button>
            </form>
        );
    };
};

export default AddBurgerForm;