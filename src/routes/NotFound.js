// Not Found component is catch all in case someone goes to url that does not exist
import React from "react";
//Import Link so that users can access the Snacks and Drinks' pages. 
import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from "reactstrap";

function NotFound() {
    return (
        <section className="col-md-8">
            <Card>
                <CardBody className="text-center">
                    <CardTitle>
                        <h3 className="font-weight-bold">
                            Sorry, but this page doesn't exist.
                        </h3>
                    </CardTitle>
                    <CardText>
                        <Link to={`/`}>
                            Click here to get back home.
                        </Link>
                    </CardText>
                </CardBody>
            </Card>
        </section >
    );
}

export default NotFound;