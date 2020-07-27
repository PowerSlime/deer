import { mdiGithub, mdiVk } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useCallback, useState } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

const siteName = "DeerIO Enchanted";
const socials = [
    { link: "https://vk.com/powerslime", icon: mdiVk },
    { link: "https://github.com/powerslime", icon: mdiGithub },
];

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    return (
        <div className="bg-dark">
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>{siteName}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="ml-auto">
                        {socials.map((item, index) => (
                            <NavItem key={`navbar-social-index-${index}`}>
                                <NavLink href={item.link} target="_blank">
                                    <Icon path={item.icon} size={1} />
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavigationBar;
