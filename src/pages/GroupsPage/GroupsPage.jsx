import "./GroupsPage.scss";
import Navigation from "../../components/Navigation/Navigation";

function GroupsPage() {

    return (
        <div className="groups-main">
            <Navigation />
            <h1>Groups</h1>
            <div className="project-groups">
                <div className="group">
                    <h2>Group 1</h2>
                    <p>Members: 1, 2, 3</p>
                    <p>Project: Project 1</p>
                </div>
                <div className="group">
                    <h2>Group 2</h2>
                    <p>Members: 4, 5, 6</p>
                    <p>Project: Project 2</p>
                </div>
                <div className="group">
                    <h2>Group 3</h2>
                    <p>Members: 7, 8, 9</p>
                    <p>Project: Project 3</p>
                </div>
            </div>

        </div>
    );
}
export default GroupsPage;