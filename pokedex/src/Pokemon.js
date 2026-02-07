import Card from "react-bootstrap/Card";



const Pokemon = ({name, image, type, exp}) => {
    console.log (exp);
    return (
        <Card className="p-3 my-3 rounded w-100" style={{maxWidth:"12rem"}}>
            <Card.Body>
                <Card.Title className="text-primary"> {name} </Card.Title>
                    <Card.Img variant="top" src={image}  />
                        <Card.Text>
                            {type} <br />
                            {exp}
                        </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Pokemon;