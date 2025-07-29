import './Card.css';
import AddButtonIcon from "../../icons/AddButtonIcon.jsx";
import CardForm from "./CardForm.jsx";
import {useState} from "react";
import CardList from "./CardList.jsx";
import CardCurrencyConverter from "./CardCurrencyConverter.jsx";

function Card() {
    const [visibleForm, setVisibleForm] = useState(false);

    const handleToggleForm = () => {
        setVisibleForm(!visibleForm);
    };

    const closeForm = () => {
        setVisibleForm(false);
    };

    return (<section className="shadow-2xl rounded-lg px-10 py-12 w-full max-w-xl space-y-8">
        <header>
            <h1 className="text-2xl">Пополнить банковской картой</h1>
        </header>

        <CardCurrencyConverter/>

        <form action="#" className="space-y-7">
            <div className="flex items-center space-x-4">
                <CardList closeForm={closeForm}/>

                <button
                    type="button"
                    onClick={handleToggleForm}
                    className="bg-gray-200 text-gray-600 font-bold px-4 py-3.5 flex flex-col items-center justify-center focus:border-2 focus:border-blue-500 rounded-lg">
                    <AddButtonIcon/>
                    <span>Новая карта</span>
                </button>
            </div>

            <CardForm visible={visibleForm}/>
        </form>
    </section>);
}

export default Card;