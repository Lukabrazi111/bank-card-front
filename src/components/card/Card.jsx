import './Card.css';
import AddButtonIcon from "../../icons/AddButtonIcon.jsx";
import DramIcon from "../../icons/DramIcon.jsx";
import RubleIcon from "../../icons/RubleIcon.jsx";
import CardForm from "./CardForm.jsx";
import {useState} from "react";

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

        <div>
            <span className="uppercase text-gray-600">Укажите сумму</span>
            <div className="flex items-center mt-2">
                <div className="relative">
                    <input type="number" name="dram" placeholder="0000.00"
                           className="py-3 px-3 rounded-l-lg bg-[#FAFAFC] border border-gray-200 w-full max-w-38"/>
                    <DramIcon className="absolute top-3.5 right-3"/>
                </div>
                <div className="relative">
                    <input type="number" name="ruble" placeholder="0000.00"
                           className="py-3 px-3 rounded-r-lg bg-[#FAFAFC] border-y border-r border-gray-200 w-full max-w-38"/>
                    <RubleIcon className="absolute top-3.5 right-3"/>
                </div>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <button
                onClick={closeForm}
                className="focus:border-blue-500 border-2 bg-blue-400 font-light text-white px-4 pr-10 pb-2 pt-6 flex flex-col items-start justify-start rounded-lg">
                <p>•••• 3282</p>
                <span>12 / 23</span>
            </button>

            <button
                onClick={handleToggleForm}
                className="bg-gray-200 text-gray-600 font-bold px-4 py-3.5 flex flex-col items-center justify-center focus:border-2 focus:border-blue-500 rounded-lg">
                <AddButtonIcon/>
                <span>Новая карта</span>
            </button>
        </div>

        <CardForm visible={visibleForm}/>
    </section>);
}

export default Card;