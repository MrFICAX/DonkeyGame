import profile from '../../../src/profile.svg';

const LayedUserView = ({ username, email, loserPlayer, loserPlayerFound }) => {

    var loserPlayerDiv = ""
    if (loserPlayerFound && loserPlayer.user.userName === username){
        loserPlayerDiv = "loserPlayerViewDiv"

    }
    return (


        <div className={`layedProfileViewDiv ${loserPlayerDiv} p-1 m-3`}>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{username}</h4>
            </div>
            <div >
                {email}
            </div>

        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default LayedUserView;
