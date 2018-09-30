import React from "react";
import FontAwesome from "react-fontawesome";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            baseUrl: "#",
            siteName: "DeerIO Enchanted",
            menu: [
                // {link: "#", title: "Home"},
                // {link: "#", title: "Contacts"},
            ],

            socials: [
                {link: "//vk.com/powerslime", className: "vk"},
                {link: "//github.com/powerslime", className: "github"},
            ]
        };
    }


    render() {
        return (
            <div className="container-fluid bg-dark">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-xl-12">
                            <a className="navbar-brand" href={this.state.baseUrl}>{this.state.siteName}</a>

                            <div className="collapse navbar-collapse mr-auto" id="navbarNavDropdown-6">
                                {/* Menu links */}
                                <ul className="navbar-nav mr-auto">
                                    {this.state.menu.map((item, index) =>
                                        <li
                                            className="nav-item"
                                            key={`navbar-menu-index-${index}`}
                                        >
                                            <a className="nav-link" href={item.link}>{item.title}</a>
                                        </li>
                                    )}
                                </ul>

                                {/* Socials */}
                                <ul className="navbar-nav">
                                    {this.state.socials.map((item, index) =>
                                        <li
                                            className="nav-item"
                                            key={`navbar-social-index-${index}`}
                                        >
                                            <a className="nav-link" href={item.link} target="_blank">
                                                <FontAwesome name={item.className}/>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}


export default Navbar;