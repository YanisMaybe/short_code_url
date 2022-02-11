import {Component} from 'react';

class MenuCard extends Component
{
    render(){
        return(
            <div className = "GlobalMenuBar MenuCard none">
                <div className = "ListOfMenuBar">
                    <ul className = "PropositionMenuBar">
                        <button><li>Features</li></button>
                        <button><li>Pricing</li></button>
                        <button><li>Resources</li></button>
                    </ul>
                </div>
                <div className = "SeparatorForGlobalMenuBar"></div>
                <div className = "LoginSignUPZone">
                    <ul className = "ULForLoginSignInUPZone">
                        <button className = "LoginButtonLink"><li>Login</li></button>
                        <button className = "btn SignUpButtonLink"><li>Sign up</li></button>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuCard;