import "./square.css"

export function Square(props) {
    return (
        <button
            className="square"
            style={{background: props.isSelected ? "palevioletred" : "#fff"}}
            onMouseEnter={props.onMouseEnter}
            onClick={props.onClick}/>
    );
}
