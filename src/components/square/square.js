import "./square.css"

export function Square(props) {
    return (
        <button
            className="square"
            style={{background: props.isSelected ? "hsl(" + Math.random() * 360 + ", 100%, 75%)" : "#fff"}}
            onMouseEnter={props.onMouseEnter}
            onClick={props.onClick}/>
    );
}
