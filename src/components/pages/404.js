import { Helmet } from "react-helmet";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <Helmet>
                <meta
                name="description"
                content="This page is not found, 404"
                />
                <title>This page is not found</title>
            </Helmet>
            <ErrorMessage/>
            <p>Page doesnt exist</p>
            <Link to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;