import DramIcon from "../../icons/DramIcon.jsx";
import RubleIcon from "../../icons/RubleIcon.jsx";
import {useState} from "react";

function CardCurrencyConverter() {
    const [dram, setDram] = useState('');
    const [ruble, setRuble] = useState('');

    const convertDramCurrency = (value) => {
        setDram(value);
        calculateCurrency(value, setRuble);
    };

    const convertRubleCurrency = (value) => {
        setRuble(value);
        calculateCurrency(value, setDram);
    };

    const calculateCurrency = (value, setState) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const result = calculateTotalAmount(numericValue, '*', 15);
            setState(result);
        } else {
            setState('');
        }
    };

    const calculateTotalAmount = (value, operation, factor) => {
        if (operation === '*') {
            return formatNumber(value * factor);
        } else if (operation === '/') {
            return formatNumber(value / factor);
        }

        return '';
    };

    const formatNumber = (value) => {
        if (value === '' || isNaN(value)) return '';
        return value.toLocaleString();
    };

    const checkNumericValue = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <div>
            <span className="uppercase text-gray-600">Укажите сумму</span>
            <div className="flex items-center mt-2">
                <div className="relative">
                    <input
                        value={dram}
                        onChange={(event) => convertDramCurrency(event.target.value)}
                        onKeyPress={(event) => checkNumericValue(event)}
                        type="text"
                        name="dram"
                        placeholder="0000.00"
                        className="py-3 pl-3 pr-9 rounded-l-lg bg-[#FAFAFC] border border-gray-200 w-full max-w-38"/>
                    <DramIcon className="absolute top-3.5 right-3"/>
                </div>
                <div className="relative">
                    <input
                        value={ruble}
                        onChange={(event) => convertRubleCurrency(event.target.value)}
                        onKeyPress={(event) => checkNumericValue(event)}
                        type="text"
                        name="ruble"
                        placeholder="0000.00"
                        className="py-3 pl-3 pr-9 rounded-r-lg bg-[#FAFAFC] border-y border-r border-gray-200 w-full max-w-38"/>
                    <RubleIcon className="absolute top-3.5 right-3"/>
                </div>
            </div>
        </div>
    );
}

export default CardCurrencyConverter;