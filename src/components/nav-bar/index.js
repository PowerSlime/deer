import React from "react";
import FontAwesome from "react-fontawesome";
import {
    Collapse, Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink} from "reactstrap";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="container-fluid bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Navbar color="dark" dark expand="md">
                                <NavbarBrand href={this.state.baseUrl}>{this.state.siteName}</NavbarBrand>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="mr-auto" navbar>
                                        {this.state.menu.map((item, index) =>
                                            <NavItem key={`navbar-menu-index-${index}`}>
                                                <NavLink href={item.link}>{item.title}</NavLink>
                                            </NavItem>
                                        )}
                                    </Nav>
                                    <Nav navbar>
                                        {this.state.socials.map((item, index) =>
                                            <NavItem key={`navbar-social-index-${index}`}>
                                                <NavLink
                                                    href={item.link}
                                                    target="_blank"
                                                >
                                                    <FontAwesome name={item.className}/>
                                                </NavLink>
                                            </NavItem>
                                        )}
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default NavigationBar;
