import { Link } from 'react-router-dom';

const BreadCrumb = (props) => {
    const { title } = props;
    return (
        <div className="breadcrumb py-4 mb-0">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center mb-0">
                            <Link to="/" className="text-dark">
                                Trang chủ &nbsp;
                            </Link>
                            / {title}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumb;
