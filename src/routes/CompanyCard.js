//Company card is a child component for companies list. This will show individual
//companies. If they have a logo, it will be displayed.

import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "../styling/CompanyCard.css";

const CompanyCard = ({ handle, name, description, logoSrc }) => {

    return (
        <div>
            <Card className="company-card">
                <CardBody>
                    {logoSrc
                        ? <img className="card-img" alt="logo" src={logoSrc}></img>
                        : <p></p>
                    }
                    <CardTitle>
                        <span className="card-name">{name}</span>
                    </CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </div>
    )

}

export default CompanyCard;