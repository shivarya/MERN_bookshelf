import React from 'react';
import  { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'


const SideNavItems = ({user}) => {
    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Admins',
            link:'/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Reviews',
            link:'/user/user-reviews',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Reviews',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Logout',
            link:'/logout',
            restricted:true
        }        
    ]

    const elements = (item,i) => {
        return (
            <div key={i} className={item.type}>
                <Link to={item.link}>
                    <FontAwesome name={item.icon} />
                    {item.text}
                </Link>
            </div>
        )
    }

    const showItems = () => {
        return user.login ?
            items.map((item,i) => {
                if(user.login.isAuth){
                    return !item.exclude ? elements(item, i) : null;
                }else{
                    return !item.restricted ? elements(item, i) : null;
                }                
            }) : null;
    }
    return (
        <div>
            {showItems()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(SideNavItems);
