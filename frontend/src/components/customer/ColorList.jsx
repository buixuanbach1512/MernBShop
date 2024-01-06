const Color = (props) => {
    const { colorData, setColor, setBorder, border } = props;
    return (
        <ul className="colors ps-0">
            {colorData &&
                colorData?.map((item, index) => (
                    <li
                        onClick={() => {
                            setColor && setColor(item._id);
                            setBorder && setBorder(item._id);
                        }}
                        key={index}
                        style={{
                            background: item.code,
                            border: border === item._id ? '3px solid #1e90ff' : '1px solid #777',
                        }}
                    ></li>
                ))}
        </ul>
    );
};

export default Color;
