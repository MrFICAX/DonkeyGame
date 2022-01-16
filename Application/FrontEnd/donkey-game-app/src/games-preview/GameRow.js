const GameRow = ({ OwnerName, description, gameCode }) => {
    return (
        <div className="row product">
            <div className="col-md-2">
            </div>
            <div className="col-md-8 product-detail">
                <h4>{OwnerName}</h4>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
            <div className="col-md-2 product-price">
                {gameCode}
            </div>
        </div>
    );
}

export default GameRow;
