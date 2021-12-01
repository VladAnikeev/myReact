import React from "react";
import PropTypes from "prop-types";

class EditBurgerForm extends React.Component {


    static propTypes = {
        burger: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
            desc: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        updateBurger: PropTypes.func,
        deleteBurger: PropTypes.func
    };
    handlechenge = event => {
        const updatedBurger = {
            ...this.props.burger,
            [event.currentTarget.name]:
                event.currentTarget.name === "price" ?
                    parseFloat(event.currentTarget.value) || 0 :
                    event.currentTarget.value,
        };
        this.props.updateBurger(this.props.index, updatedBurger)
    };

    render() {
        return (
            <form className="burger-edit" onSubmit={this.createBurger}>
                <input
                    onChange={this.handlechenge}
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoCapitalize="off"
                    value={this.props.burger.name}
                />
                <input
                    onChange={this.handlechenge}
                    name="price"
                    type="text"
                    placeholder="Price"
                    autoCapitalize="off"
                    value={this.props.burger.price}
                />
                <select
                    onChange={this.handlechenge}
                    name="status"
                    className="status"
                    value={this.props.burger.status}>
                    <option value="available">
                        Доступно
                    </option>
                    <option value="unavailable">
                        Убрать из меню
                    </option>
                </select>
                <textarea
                    onChange={this.handlechenge}
                    name="desc"
                    type="text"
                    placeholder="Desc"
                    value={this.props.burger.desc}
                />
                <input
                    onChange={this.handlechenge}
                    name="image"
                    type="text"
                    placeholder="Image"
                    autoCapitalize="off"
                    value={this.props.burger.image}
                />
                <button onClick={() => {
                    this.props.deleteBurger(
                        this.props.index
                    );
                }}>
                    Удалить
                </button>
            </form>
        );
    };
};

export default EditBurgerForm;

