const UserLogin = (props) => {
    const greetings = props.greeting;
    return (
        <div className="user">
            <span className="material-icons user__login">manage_accounts</span>
            <span className="user__name">{greetings}</span>
        </div>
    );
}

export default UserLogin;