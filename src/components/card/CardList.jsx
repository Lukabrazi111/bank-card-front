function CardList(props) {
    return (
        <div>
            <button
                type="button"
                onClick={props.closeForm}
                className="focus:border-blue-500 border-2 bg-blue-400 font-light text-white px-4 pr-10 pb-2 pt-6 flex flex-col items-start justify-start rounded-lg">
                <p>•••• 3282</p>
                <span>12 / 23</span>
            </button>
        </div>
    );
}

export default CardList;