import CustomCheckbox from "../ui/CustomCheckbox.jsx";
import ExclamationMarkIcon from "../../icons/ExclamationMarkIcon.jsx";
import {useState} from "react";
import axios from "../../config/axios.js";

function CardForm(props) {
    const [monthError, setMonthError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [message, setMessage] = useState('');
    const [saveCard, setSaveCard] = useState(false);
    const [formData, setFormData] = useState({
        number: '',
        expiration_month: '',
        expiration_year: '',
        security_code: '',
        is_saved: false,
    });

    const handleChange = (event, maxLength) => {
        const {name, value} = event.target;
        const length = event.target.value.length;
        const trimmedValue = value.slice(0, maxLength);

        setFormData((prev) => ({
            ...prev,
            [name]: trimmedValue,
        }));

        if (length >= maxLength) {
            event.target.value = value.slice(0, maxLength);
        }

        // Simple validation example
        if (name === 'expiration_month') {
            if (trimmedValue > 12) {
                setMonthError(true);
            } else {
                setMonthError(false);
            }
        }

        if (name === 'expiration_year') {
            const year = new Date().getFullYear().toString().slice(-2);

            if (trimmedValue < year) {
                setYearError(true);
            } else {
                setYearError(false);
            }
        }
    };

    const addLeadingZero = (event) => {
        const value = event.target.value;

        if (value && value < 10 && value[0] !== '0') {
            event.target.value = '0' + value;
        }
    };

    const preventMinusPlus = (event) => {
        if (
            event.code === 'Minus' ||
            event.code === 'Equal' ||
            event.code === 'Comma' ||
            event.code === 'Period'
        ) {
            event.preventDefault();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // just example
            const mappedData = {
                ...formData,
                expiration_year: Number(formData.expiration_year) + 2000,
                is_saved: saveCard,
            };

            const response = await axios.post('/cards', mappedData);
            if (response.status === 200) {
                setFormData({
                    number: '',
                    expiration_month: '',
                    expiration_year: '',
                    security_code: '',
                    is_saved: false,
                })
                alert('card added');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <div className={`space-y-7 ${props.visible ? 'block' : 'hidden'}`}>
                <div className="flex items-center justify-center">
                    <div className="card px-5 py-6 pt-14 flex flex-col items-start rounded-lg h-64 space-y-4">
                        <div>
                            <label htmlFor="card_number" className="text-white uppercase ">Номер карты</label>
                            {/*TODO: need to validate card number, and if card is not valid - set red border on input*/}
                            <input
                                value={formData.number}
                                onKeyPress={preventMinusPlus}
                                onChange={(event) => handleChange(event, 16)}
                                name="number"
                                type="number"
                                placeholder="Номер карты"
                                className="bg-white px-2 py-1.5 mt-2 w-full rounded-lg placeholder:text-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="card_number" className="text-white uppercase">Действует до</label>
                            <div className="space-x-3 mt-2">
                                {/*TODO: need to check if month greater than 12*/}
                                <input
                                    value={formData.expiration_month}
                                    onKeyPress={preventMinusPlus}
                                    onChange={(event) => handleChange(event, 2)}
                                    onBlur={(event) => addLeadingZero(event)}
                                    min={0}
                                    name="expiration_month"
                                    type="number"
                                    placeholder="ММ"
                                    className={`bg-white placeholder:text-gray-400 px-2 py-1.5 w-full max-w-16 rounded-lg ${monthError ? 'border-2 border-red-500' : ''}`}
                                />
                                <span className="text-white">/</span>
                                {/*TODO: need to check if year is greater or equal than 'today', else - set red input*/}
                                <input
                                    value={formData.expiration_year}
                                    onKeyPress={preventMinusPlus}
                                    onChange={(event) => handleChange(event, 2)}
                                    name="expiration_year"
                                    type="number"
                                    placeholder="ГГ"
                                    className={`bg-white  placeholder:text-gray-400 px-2 py-1.5 w-full max-w-16 rounded-lg ${yearError ? 'border-2 border-red-500' : ''}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="py-6 pt-5 bg-gray-200 flex flex-col items-center rounded-md w-full max-w-40 h-60">
                        <div className="bg-gray-300 w-full py-5"/>
                        <div className="px-5 flex flex-col items-start space-y-3">
                            <span className="text-gray-600 mt-2">CVV/CVC</span>
                            <input
                                value={formData.security_code}
                                onChange={(event) => handleChange(event, 3)}
                                type="number"
                                name="security_code"
                                placeholder="000"
                                className="bg-white placeholder:text-gray-400 px-4 py-1.5 w-full max-w-20 rounded-lg placeholder:text-lg"
                            />
                            <p className="text-gray-400 text-sm">три цифры с обратной стороны карты</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                    <div>
                        <CustomCheckbox saveCard={() => setSaveCard(!saveCard)}/>
                    </div>
                    <div className="text-sm">
                        <div className="flex items-center space-x-2">
                            <p>Запомнить эту карту. Это безопасно.</p>
                            <ExclamationMarkIcon/>
                        </div>
                        <p>Сохраняя карту, вы соглашаетесь с <a href="#" className="text-blue-400 underline">условиями
                            привязки карты.</a></p>
                    </div>
                </div>
            </div>

            <button type="submit"
                    className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-10 py-3 rounded-full font-bold">
                Оплатит
            </button>
        </form>
    );
}

export default CardForm;