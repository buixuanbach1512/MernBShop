const Pagination = (props) => {
    const { totalItems, itemsPerPage, setCurrentPage, currentPage } = props;
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className="pagination">
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? 'active' : ''}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
