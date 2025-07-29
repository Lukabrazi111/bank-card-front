import CheckedIcon from "../../icons/CheckedIcon.jsx";

function CustomCheckbox(props) {
    return (
        <label className="flex items-center cursor-pointer relative mb-5">
            <input
                onClick={props.saveCard}
                type="checkbox"
                   className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:border-blue-500 checked:bg-blue-500"
                   id="check1"/>
            <span
                className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CheckedIcon/>
             </span>
        </label>
    );
}

export default CustomCheckbox;