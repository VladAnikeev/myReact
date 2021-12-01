import React from "react";
import PropTypes from "prop-types";

class Burger extends React.Component {

    static propTypes = {
        detalist: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
            desc: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        addToOrder: PropTypes.func,
    };

    render() {
        const {
            name,
            image,
            desc,
            price,
            status
        } = this.props.detalist;

        const isVable = status === "available";
        return (
            <div>
                <li className="menu-burger">
                    <div className="image-container">
                        <img src={image} alt="/" />
                    </div>
                    <div className="burger-details">
                        <h3 className="burger-name">
                            {name}
                            <span className="price">{price}₽</span>
                        </h3>
                        <p>{desc}</p>
                        <button className="buttonOrder"
                            onClick={() => {
                                this.props.addToOrder(this.props.index)
                            }}
                            disabled={!isVable}>
                            {isVable ? "Заказать" : "Временно нет"}
                        </button>
                    </div>
                </li>
            </div>
        );
    };
};



export default Burger;