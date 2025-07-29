import {useEffect, useState} from "react";
import axios from "../../config/axios.js";

function CardList(props) {
    const [cards, setCards] = useState([]);

    const leadingZero = (value) => {
        if (value < 10) {
            return value.toString().padStart(2, '0');
        }
    };

    useEffect(() => {
        const getCards = async () => {
            try {
                const response = await axios.get('/cards');
                if (response.status === 200) {
                    const cards = response.data?.data || [];
                    const mappedCards = cards.map((card) => {
                        const expirationMonth = leadingZero(card.expiration_month);
                        const expirationYear = card.expiration_year.toString().slice(-2);
                        return {
                            ...card,
                            expiration_month: expirationMonth,
                            expiration_year: expirationYear,
                        };
                    });

                    setCards(mappedCards);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCards();
    }, []);

    return (
        <>
            {cards.map((card) => (
                <div key={card.id}>
                    <button
                        type="button"
                        onClick={props.closeForm}
                        className="focus:border-blue-500 border-2 bg-blue-400 font-light text-white px-4 pr-10 pb-2 pt-6 flex flex-col items-start justify-start rounded-lg">
                        <p>•••• {card.number}</p>
                        <span>{card.expiration_month} / {card.expiration_year}</span>
                    </button>
                </div>
            ))}
        </>

    );
}

export default CardList;