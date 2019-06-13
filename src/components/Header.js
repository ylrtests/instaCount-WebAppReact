import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

import {Link} from "react-router-dom"

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        this.isLinkActive = this.isLinkActive.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    isLinkActive(linkText){
        return this.props.pathname.startsWith(linkText)
    }


    render() {
        console.log(this.props)
        console.log(this.isLinkActive("/posts"))
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">instaCount</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className={this.isLinkActive("/fans") ? "active" : ""}>
                                <Link className="nav-link" to="/fans">Fans</Link>
                            </NavItem>
                            <NavItem className={this.isLinkActive("/posts") ? "active" : ""}>
                                <Link className="nav-link" to="/posts">Posts</Link>
                            </NavItem>
                            <UncontrolledDropdown  nav inNavbar>
                                <DropdownToggle nav caret>
                                    Opciones
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link  to="/logout">Cerrar sesión</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;