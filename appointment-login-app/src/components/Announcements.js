import { Card, Tab, Tabs } from "react-bootstrap";

function Announcements() {
    return (
        <Card className="cardAnnouncement">
            <Tabs defaultActiveKey="mask">
                <Tab eventKey="mask" title="Mask">
                    <br></br>
                    <p>Mask Announcements</p>
                </Tab>
                <Tab eventKey="token" title="TT Token">
                    <br></br>
                    <p>Token Announcements</p>
                </Tab>
                <Tab eventKey="vaccine" title="Vaccine">
                    <br></br>
                    <p>Vaccine Announcements</p>
                </Tab>
            </Tabs>
        </Card>
    )
}

export default Announcements;