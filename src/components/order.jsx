import React from "react"
import PropTypes from "prop-types";
import Shipment from "./shipmet";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {

    static propTypes = {
        burgers: PropTypes.object,
        order: PropTypes.object,
    };

    renderOrder = (key) => {
        const burger = this.props.burgers[key];
        const count = this.props.order[key];
        const isVable = burger && burger.status === "available"

        if (!burger) {
            return null;
        }
        if (!isVable) {
            return (
                <CSSTransition
                    classNames="order" key={key}
                    timeout={{
                        enter: 500,
                        exit: 500
                    }}>
                    <li
                        className="unavailable"
                        key={key}
                    >
                        Извините, {burger ? burger.name : "burger"} временно не доступен
                    </li>
                </CSSTransition>
            );
        };
        return (
            <CSSTransition
                classNames="order"
                key={key}
                timeout={{
                    enter: 500,
                    exit: 500
                }}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{
                                    enter: 500,
                                    exit: 500,
                                }}>
                                <span>{count} </span>
                            </CSSTransition>
                        </TransitionGroup>
                        шт. {burger.name}
                        <span> {count * burger.price}₽</span>
                        <button
                            className="canselItem"
                            onClick={() => {
                                this.props.deleteFromOrder(key);
                            }}>
                            &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
        );
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const burger = this.props.burgers[key];
            const count = this.props.order[key];
            const isVable = burger && burger.status === "available"
            if (isVable) {
                return prevTotal + count * burger.price;
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap" >
                <h2>Ваш заказ</h2>
                <TransitionGroup
                    component="ul"
                    className="order"
                >
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                {total > 0 ? (
                    <Shipment total={total} />
                ) : (
                    <div className="nothingSelected">
                        Выберите блюдо и добавте к заказу
                    </div>
                )}
            </div>
        );
    };
};

export default Order;