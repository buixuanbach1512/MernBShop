const Size = (props) => {
    const { sizeData, setSize, setSizeStyle, sizeStyle } = props;
    return (
        <div className="d-flex flex-wrap gap-10">
            {sizeData &&
                sizeData?.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            background: sizeStyle === item._id ? '#1e90ff' : '#ededed',
                            color: sizeStyle === item._id ? '#fff' : '#333',
                        }}
                        className="span-size"
                    >
                        <p
                            onClick={() => {
                                setSize && setSize(item._id);
                                setSizeStyle && setSizeStyle(item._id);
                            }}
                            className="mb-0 text-center"
                        >
                            {item.name}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default Size;
